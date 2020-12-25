use super::driver::new_webdriver;
use super::driver::WebDriver;
use super::error_helper::get_err_pos;
use crate::DataParser;
use crate::InterpreterContext;
use crate::LabelType;
use crate::LexerHelper;
use crate::VM;
use crate::{Preprocessor, PreprocessorContext, PreprocessorOutput};
use lalrpop_util::ParseError;

use regex::Regex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn preprocess(input: &str) -> Result<WebDriver, JsValue> {
    let r = Regex::new(r";.*\n?").unwrap();
    let uncommented = r.replace_all(input, "\n").to_string();
    // create parameters
    let mut ctx = PreprocessorContext::default();
    let mut out = PreprocessorOutput::default();
    // create preprocessor
    let preprocessor = Preprocessor::new();
    let helper = LexerHelper::new(&uncommented);

    // parse
    match preprocessor.parse(&mut ctx, &mut out, &uncommented) {
        Err(e) => {
            // if error type is UnrecognizedToken,
            // it can be actual unknown token, or the piggybacked custom error
            if let ParseError::UnrecognizedToken {
                token: (ref start, ref token, _),
                ref expected,
            } = e
            {
                // get error position
                let (line, lstart, lend) = get_err_pos(&helper, *start);
                let pos_str = format!("{}:{} : {}", line, lend - start, &uncommented[lstart..lend]);

                if token.1 == "" {
                    // error is custom, piggybacked on UnrecognizedToken type
                    return Err(JsValue::from(format!(
                        "Syntax Error at {} :\n{}",
                        pos_str, expected[0]
                    )));
                } else {
                    // actual unrecognized token
                    return Err(JsValue::from(format!(
                        "Syntax Error at {} :\nUnexpected Token : {}",
                        pos_str, token
                    )));
                }
            } else {
                // some other type of error
                return Err(JsValue::from(format!("Syntax Error :\n{}", e)));
            };
        }
        Ok(_) => {
            let PreprocessorContext {
                macro_nesting_counter: _,
                data_counter: _,
                label_map: lmap,
                macro_map: _,
                mapper,
                fn_map,
                undefined_labels,
            } = ctx;

            for (pos, l) in undefined_labels.iter() {
                match lmap.get(l) {
                    Some(_) => {}
                    None => {
                        let (line, start, end) = get_err_pos(&helper, *pos);
                        return Err(JsValue::from(format!(
                            "Label {} used but not defined at {} :{} : {}",
                            l,
                            line,
                            start - pos,
                            &uncommented[start..end]
                        )));
                    }
                }
            }

            let idx; // for iterating through code

            match lmap.get("start") {
                Some(l) => match l.get_type() {
                    LabelType::DATA => {
                        return Err(JsValue::from(
                            "Error : necessary label 'start' is not found in code",
                        ));
                    }
                    LabelType::CODE => idx = l.map,
                },
                None => {
                    return Err(JsValue::from(
                        "Error : necessary label 'start' is not found in code",
                    ));
                }
            }
            let source_map = mapper.get_source_map();
            let ictx = InterpreterContext {
                fn_map: fn_map,
                label_map: lmap,
                call_stack: Vec::new(),
            };
            let data_parser = DataParser::new();
            // this is for the data counter required by data parser
            let mut ctr = 0;
            out.code.push("hlt".to_owned());

            let mut vm = VM::new();
            for i in out.data.iter() {
                match data_parser.parse(&mut vm, &mut ctr, i) {
                    Ok(_) => {}
                    Err(e) => {
                        // should not reach here, as all error of syntax should have checked in preprocessor
                        return Err(JsValue::from(format!("Internal Error : Should not have reached here in data parser\nError : {}",
                            e)));
                    }
                }
            }
            let wd = new_webdriver(idx, vm, uncommented, source_map, helper, out, ictx);
            return Ok(wd);
        }
    }
}
