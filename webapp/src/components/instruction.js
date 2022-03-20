import React, { useContext } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";
// MuI Components
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { ReactComponent as ExpandMoreIcon } from "../images/ExpandIcon.svg";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Code Highlighting
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import x86asm from "react-syntax-highlighter/dist/esm/languages/hljs/x86asm";
import lightEditorTheme from "react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-light";
import darkEditorTheme from "react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-dark";

SyntaxHighlighter.registerLanguage("x86asm", x86asm);

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 5,
    marginBottom: 10,
  },
  opcode: {
    flexBasis: "20%",
    flexShrink: 0,
    fontSize: 20,
    fontWeight: "700",
  },
  name: {
    flexBasis: "50%",
    flexShrink: 0,
    fontSize: 20,
  },
  nameBig: {
    flexBasis: "80%",
    flexShrink: 0,
    fontSize: 20,
  },
  example: {
    color: theme.palette.text.secondary,
    fontSize: 20,
    paddingLeft: 20,
  },
  expandIcon: {
    paddingRight: 30,
  },
  description: {
    fontWeight: 300,
    fontSize: 14,
  },
}));

function Instruction(props) {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:500px)");
  const { currentTheme } = useContext(CustomThemeContext);
  return (
    <Accordion className={classes.main}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            style={currentTheme === "dark" ? { filter: "invert(1)" } : null}
          />
        }
        aria-controls={props.name}
        id={props.name}
        className={classes.expandIcon}
        aria-label={props.name}
        aria-labelledby={`${props.name.replace(/ /g, "")}-title`}
      >
        {props.opcode && (
          <Typography className={classes.opcode}>{props.opcode}</Typography>
        )}
        <Typography
          className={props.example ? classes.name : classes.nameBig}
          style={
            matches && !!props.opcode
              ? { display: "none" }
              : !props.opcode
              ? { fontWeight: "700" }
              : null
          }
          id={`${props.name.replace(/ /g, "")}-title`}
        >
          {props.name}
        </Typography>
        {!props.opcode && (
          <Typography className={classes.opcode}>{props.opcode}</Typography>
        )}
        <Typography className={classes.example}>{props.example}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block" }}>
        <Typography
          className={classes.description}
          style={{ whiteSpace: "pre-line" }}
          component="div"
        >
          {props.description}
          <br />
          <br />
          {props.usage.length > 0 && (
            <div>
              <span style={{ fontWeight: "500" }}>Usage:</span>
              <SyntaxHighlighter
                language="x86asm"
                style={
                  currentTheme === "dark" ? darkEditorTheme : lightEditorTheme
                }
                customStyle={{
                  width: "100%",
                }}
                lineProps={{
                  style: { whiteSpace: "pre-wrap" },
                }}
                lineNumberStyle={{
                  opacity: 0.5,
                }}
                wrapLines
                showLineNumbers
              >
                {props.usage.join("\n")}
              </SyntaxHighlighter>
            </div>
          )}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default Instruction;
