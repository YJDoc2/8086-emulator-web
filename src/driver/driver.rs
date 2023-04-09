use super::error_helper::get_err_pos;
use super::util::{get_flags, get_reg, JSFlags, JSReg};
use lib8086::util::data_util::{get_byte_reg, set_byte_reg, ByteReg};
use lib8086::InterpreterContext;
use lib8086::LexerHelper;
use lib8086::PreprocessorOutput;
use lib8086::VM;
use lib8086::{Interpreter, State};
use std::collections::HashMap;
use std::fmt::Write;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct WebDriver {
    pub line: usize,
    idx: usize,
    source_map: HashMap<usize, usize>,
    input: String,
    lh: LexerHelper,
    interpreter: Interpreter,
    processed_code: PreprocessorOutput,
    context: InterpreterContext,
    vm: VM,
}

#[wasm_bindgen]
pub struct InterpreterResult {
    pub halt: Option<bool>,
    pub int: Option<u8>,
    pub ah: Option<u8>,
}

impl InterpreterResult {
    pub fn new() -> Self {
        return InterpreterResult {
            halt: None,
            int: None,
            ah: None,
        };
    }
}

pub fn new_webdriver(
    idx: usize,
    line: usize,
    vm: VM,
    input: String,
    sm: HashMap<usize, usize>,
    lh: LexerHelper,
    out: PreprocessorOutput,
    ctx: InterpreterContext,
) -> WebDriver {
    return WebDriver {
        line: line,
        idx: idx,
        input: input,
        lh: lh,
        processed_code: out,
        context: ctx,
        vm: vm,
        source_map: sm,
        interpreter: Interpreter::new(),
    };
}

#[wasm_bindgen]
impl WebDriver {
    pub fn next(&mut self) -> Result<InterpreterResult, JsValue> {
        match self.interpreter.parse(
            self.idx,
            &mut self.vm,
            &mut self.context,
            &self.processed_code.code[self.idx],
        ) {
            Err(e) => {
                // should not reach here, as all error of syntax should have checked in preprocessor
                return Err(JsValue::from(
                    format!("Internal Error : Should not have reached here in interpreter parser\nError : {}",
                    e)
                ));
            }
            Ok(s) => match s {
                State::HALT => {
                    // stop and return
                    let res = InterpreterResult {
                        halt: Some(true),
                        int: None,
                        ah: None,
                    };
                    return Ok(res);
                }
                State::PRINT => {
                    self.idx += 1;
                    self.set_line();
                    return Ok(InterpreterResult::new());
                }
                State::JMP(next) => {
                    // jump to next commnand
                    self.idx = next;
                    self.set_line();
                    return Ok(InterpreterResult::new());
                }
                State::NEXT => {
                    // we can do this without check, as we have inserted a 'hlt' in the code at end
                    self.idx += 1;
                    self.set_line();
                    return Ok(InterpreterResult::new());
                }
                State::INT(int) => {
                    match int {
                        0 => {
                            // divide by 0 error
                            let pos = self.source_map.get(&self.idx).unwrap();
                            let (line, start, end) = get_err_pos(&self.lh, *pos);
                            self.idx += 1;
                            self.set_line();
                            return Err(JsValue::from(format!(
                                "Attempt to divide by 0 : int 0 at line {} : {}",
                                line,
                                &self.input[start..end]
                            )));
                        }
                        0x3 => {
                            self.idx += 1;
                            self.set_line();
                            return Ok(InterpreterResult {
                                halt: None,
                                int: Some(3),
                                ah: None,
                            });
                        }
                        0x10 => {
                            // BIOS interrupt
                            let ah = get_byte_reg(&self.vm, ByteReg::AH);
                            if ah != 0xA && ah != 0x13 {
                                let pos = self.source_map.get(&self.idx).unwrap();
                                let (line, start, end) = get_err_pos(&self.lh, *pos);
                                return Err(JsValue::from(format!(
                                    "Error at line {} : {}, value of AH = {} is not supported for int 0x10",
                                    line,
                                    &self.input[start..end],
                                    ah
                                )));
                            }
                            self.idx += 1;
                            self.set_line();
                            return Ok(InterpreterResult {
                                halt: None,
                                int: Some(10),
                                ah: Some(ah),
                            });
                        }
                        0x21 => {
                            // DOS interrupts
                            let ah = get_byte_reg(&self.vm, ByteReg::AH);
                            if ah != 0x1 && ah != 0x2 && ah != 0xA {
                                let pos = self.source_map.get(&self.idx).unwrap();
                                let (line, start, end) = get_err_pos(&self.lh, *pos);
                                return Err(JsValue::from(format!(
                                    "Error at line {} : {}, value of AH = {} is not supported for int 0x21",
                                    line,
                                    &self.input[start..end],
                                    ah
                                )));
                            }
                            self.idx += 1;
                            self.set_line();
                            return Ok(InterpreterResult {
                                halt: None,
                                int: Some(21),
                                ah: Some(ah),
                            });
                        }
                        _ => {
                            return Err(JsValue::from(format!("Internal Error : Should not have reached here in interrupt parser\nError : int {} not supported",int)));
                        }
                    }
                }
                State::REPEAT => {
                    return Ok(InterpreterResult::new());
                }
            },
        }
    }

    pub fn get_flags(&self) -> JSFlags {
        return get_flags(&self.vm);
    }

    pub fn get_reg(&self) -> JSReg {
        return get_reg(&self.vm);
    }

    pub fn get_mem(&self, start: usize, end: usize) -> Vec<u8> {
        return self.vm.mem[start..=end].iter().map(|v| *v).collect();
    }

    pub fn int_10(&self) -> JsValue {
        let ah = get_byte_reg(&self.vm, ByteReg::AH);
        let mut ret = String::new();
        if ah == 0xA {
            let al = get_byte_reg(&self.vm, ByteReg::AL);
            for _ in 0..self.vm.arch.cx {
                let _ = write!(&mut ret, "{}", al as char);
            }
        }
        if ah == 0x13 {
            // print a string
            let l = self.vm.arch.cx as usize; // length
            let dl = get_byte_reg(&self.vm, ByteReg::DL); // start col
            let start = self.vm.arch.es as usize * 0x10 + self.vm.arch.bp as usize;
            // pad till start col
            for _ in 0..dl {
                let _ = write!(&mut ret, " ");
            }
            // print actual string
            for i in 0..l {
                let _ = write!(&mut ret, "{}", self.vm.mem[start + i] as char);
            }
        }
        return JsValue::from(ret);
    }
    pub fn get_int_21(&mut self) -> JsValue {
        let ah = get_byte_reg(&self.vm, ByteReg::AH);
        // to print a single char
        let mut ret = String::new();
        if ah == 0x2 {
            let dl = get_byte_reg(&self.vm, ByteReg::DL);
            let _ = write!(&mut ret, "{}", dl as char);
            set_byte_reg(&mut self.vm, ByteReg::AL, dl);
        }
        return JsValue::from(ret);
    }

    pub fn set_int_21(&mut self, ip: String) {
        let ah = get_byte_reg(&self.vm, ByteReg::AH);
        if ah == 0x1 {
            // read the whole line
            // take the first byte, if nothing read, default to 0
            let byte = match ip.bytes().nth(0) {
                Some(a) => a,
                None => 0,
            };
            set_byte_reg(&mut self.vm, ByteReg::AL, byte);
        }

        if ah == 0xA {
            // read line
            // storage address
            let start = self.vm.arch.ds as usize * 0x10 + self.vm.arch.dx as usize;
            // how many are actually supposed to read
            let required = self.vm.mem[start] as usize;
            let max: u8;
            if ip.len() < required {
                max = ip.len() as u8;
                // store how many are read, skipping newline char
                self.vm.mem[start + 1] = max - 1;
            } else {
                max = required as u8;
                self.vm.mem[start + 1] = max;
            }
            // store the characters
            let mut ctr = 0;
            for i in ip.bytes() {
                self.vm.mem[start + 2 + ctr] = i;
                ctr += 1;
                if ctr == required {
                    break;
                }
            }
        }
    }

    fn set_line(&mut self) {
        match self.source_map.get(&(self.idx)) {
            Some(pos) => {
                let (line, _, _) = get_err_pos(&self.lh, *pos);
                self.line = line;
            }
            None => {}
        }
    }
}
