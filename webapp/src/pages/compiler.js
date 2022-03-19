import React, { useState, useContext, useRef, useEffect } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";
// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-assembly_x86";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-twilight";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Textfield from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
// Images
import help from "../images/help.png";
import { ReactComponent as DownloadButton } from "../images/download.svg";

const MEM_MAX = 16 * 8;
const MB = 1024 * 1024;
const ALLOWED_ADDRESS_MAX = MB - MEM_MAX - 1; // -1 for zero based

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: -20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 3,
    color: "#fff",
  },
  tutorialBackdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  tooltips: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  loadingText: {
    paddingLeft: 20,
  },
  flex: {
    display: "flex",
  },
  registerTable: {
    maxWidth: 175,
  },
  segmentTable: {
    minWidth: 125,
  },
  flagTable: {
    marginTop: 20,
  },
  ramTable: {
    marginTop: 30,
  },
  error: {
    color: "red",
    marginTop: 10,
    padding: 10,
  },
  textF: {
    marginRight: 20,
  },
  runBtn: {
    border: " 1px solid #0f0 !important",
    color: "#0f0 !important",
    marginRight: 10,
  },
  nextBtn: {
    border: " 1px solid #77f !important",
    color: "#77f !important",
    marginRight: 10,
  },
  stopBtn: {
    border: " 1px solid red !important",
    color: "red !important",
    marginRight: 10,
  },
  compileButton: {
    minWidth: 120,
    marginRight: 10,
  },
  topBtn: {
    marginRight: 10,
  },
  spaceBelow: {
    marginBottom: 5,
  },
  snackbar: {
    fontWeight: "bold",
  },
  tutorialIcon: {
    position: "absolute",
    right: 110,
    top: 10,
  },
  hidden: {
    display: "none",
  },
}));

// These are used as global state holders for interval value and output values, as when running
// in interval Task, the interval Handler value is set to null when re rendering is done,
// and it does not get latest value of output either.
let intervalHandler = null;
let outputHolder = "";
//Compiler Page
function Compiler(props) {
  const matches = useMediaQuery("(max-width:1024px)");
  const startIntervalTask = () => {
    if (intervalHandler !== null) {
      return;
    }
    intervalHandler = setInterval(async () => {
      try {
        let res = driver.next();
        setLine(driver.line);
        if (res.halt) {
          setCompiled(false);
          setHalted(true);
          showSnackbar("Execution Halted!");
          stopIntervalTask();
        }
        if (res.int) {
          if (res.int === 3) {
            // don't do anything here
            stopIntervalTask();
          }
          if (res.int === 10) {
            let out = outputHolder + "\n" + driver.int_10();
            outputHolder = out;
            setOutput(out);
          }
          if (res.int === 21) {
            if (res.ah === 2) {
              let out = outputHolder + "\n" + driver.get_int_21();
              outputHolder = out;
              setOutput(out);
            } else {
              stopIntervalTask();
              setHalted(true);
              showSnackbar("Please Give input for INT 21");
            }
          }
        }
        set8086State(driver);
      } catch (e) {
        console.log(e);
        setCompiled(false);
        setHalted(true);
        setErrors(e);
        stopIntervalTask();
      }
    }, 500);
  };

  const stopIntervalTask = () => {
    clearInterval(intervalHandler);
    intervalHandler = null;
  };
  //Auto Saving
  const resetTimeout = (id, newID) => {
    clearTimeout(id);
    return newID;
  };
  const [timeout, settimeout] = useState(null);
  const [saved, setSaved] = useState(false);

  let codeEditor = useRef(null);
  let compileRef = useRef(null);
  let runRef = useRef(null);
  let ramRef = useRef(null);
  let flagRef = useRef(null);
  let registerRef = useRef(null);
  let singleStepRef = useRef(null);
  let stopRef = useRef(null);
  let editorContainer = useRef(null);
  let downloadRef = useRef(null);

  const { currentTheme } = useContext(CustomThemeContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const showSnackbar = (text) => {
    setSnackbarText(text);
    setOpenSnackbar(true);
    setTimeout(function () {
      setOpenSnackbar(false);
    }, 2000);
  };

  const classes = useStyles();
  const [halted, setHalted] = useState(false); // To check if compilation is halted, if this is true all buttons except compile are disabled
  const [memory, setMemory] = useState([
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
    [
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
      "00",
    ],
  ]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tutorial, setTutorial] = useState(false); // To show backdrop for tutorial
  const [tutorialStep, setTutorialStep] = useState(-1); // To show backdrop for tutorial
  const [driver, setDriver] = useState(null); //To set driver
  const [startAddress, setStartAddress] = useState("00000"); //Start address of memory
  const [compiled, setCompiled] = useState(false); // To enable/disable Run, next and stop button
  const [loading, setLoading] = useState(false); //Backdrop
  const [errors, setErrors] = useState(""); // Post compilation errors are stored here
  const [addressError, setAddressError] = useState(""); // Stores error in address start format
  const [errorAnnotations, setErrorAnnotations] = useState([]); //For Error Annotations
  const [register, setRegister] = useState({
    ah: "00",
    al: "00",
    bh: "00",
    bl: "00",
    ch: "00",
    cl: "00",
    dh: "00",
    dl: "00",
    si: "0000",
    di: "0000",
    bp: "0000",
    sp: "0000",
    ss: "0000",
    ds: "0000",
    es: "0000",
  });
  const [flags, setFlags] = useState({
    of: 0,
    df: 0,
    if: 0,
    tf: 0,
    sf: 0,
    zf: 0,
    af: 0,
    pf: 0,
    cf: 0,
  });
  const [code, setCode] = useState(
    localStorage.getItem("x86code") ||
      `; Program to show use of interrupts
; Also, Hello World program !
hello: DB "Hello World" ; store string

; actual entry point of the program, must be present
start:
MOV AH, 0x13            ; move BIOS interrupt number in AH
MOV CX, 11              ; move length of string in cx
MOV BX, 0               ; mov 0 to bx, so we can move it to es
MOV ES, BX              ; move segment start of string to es, 0
MOV BP, OFFSET hello    ; move start offset of string in bp
MOV DL, 0               ; start writing from col 0
int 0x10                ; BIOS interrupt`
  ); //State to maintain the code string
  //To add an error annotation, call this function and pas row number (starts with 0), column number (starts with 0) and error text
  const addAnnotation = (errorText) => {
    if (errorText === "") {
      setErrorAnnotations([]);
      return;
    }
    if (errorText.length > 30) {
      errorText = errorText.slice(0, errorText.indexOf(" ", 30)) + "...";
    }
    var re = /(?=(\d+))/; //to find digit
    let rowNumber =
      re.exec(errorText.slice(errorText.indexOf("at line ")))[1] - 1; //subtract 1 as index starts from 0
    setErrorAnnotations((errorAnnotations) => [
      ...errorAnnotations,
      { row: rowNumber, column: 0, type: "error", text: errorText },
    ]);
  };

  //Uncomment below lines for Marker
  // const [markers, setMarkers] = useState([])
  // const addMarker = (startRowNumber, startColumnNumber, endRowNumber, endColumnNumber) => {
  // 	setMarkers(markers => [...markers, { startRow: startRowNumber, startCol: startColumnNumber, endRow: endRowNumber, endCol: endColumnNumber, className: 'error-marker', type: 'background' }])
  // }

  const set8086State = (driver) => {
    let reg = driver.get_reg();
    let flags = driver.get_flags();
    let start = parseInt("0x" + startAddress);
    let mem = driver.get_mem(start, start + MEM_MAX - 1);
    setFlags({
      of: flags.of,
      df: flags.df,
      if: flags.iflag,
      tf: flags.tf,
      sf: flags.sf,
      zf: flags.zf,
      af: flags.af,
      pf: flags.pf,
      cf: flags.cf,
    });
    setMemory(convertArray(mem));
    setRegister({
      ah: reg.ah.toString(16).padStart(2, 0),
      al: reg.al.toString(16).padStart(2, 0),
      bh: reg.bh.toString(16).padStart(2, 0),
      bl: reg.bl.toString(16).padStart(2, 0),
      ch: reg.ch.toString(16).padStart(2, 0),
      cl: reg.cl.toString(16).padStart(2, 0),
      dh: reg.dh.toString(16).padStart(2, 0),
      dl: reg.dl.toString(16).padStart(2, 0),
      si: reg.si.toString(16).padStart(4, 0),
      di: reg.di.toString(16).padStart(4, 0),
      bp: reg.bp.toString(16).padStart(4, 0),
      sp: reg.sp.toString(16).padStart(4, 0),
      ss: reg.ss.toString(16).padStart(4, 0),
      ds: reg.ds.toString(16).padStart(4, 0),
      es: reg.es.toString(16).padStart(4, 0),
    });
  };
  // Call when compiling the code
  const compile = () => {
    setInput("");
    setOutput("");
    clearTimeout();
    outputHolder = "";
    if (props.wasm) {
      try {
        let driver = props.wasm.preprocess(code);
        setDriver(driver);
        setLine(driver.line);
        //	Compile code here
        setCompiled(true);
        setHalted(false);
        set8086State(driver);
        setErrors("");
        addAnnotation("");
      } catch (e) {
        // e is going to be of string type, if it is one returned from rust
        // if it is an object, or unknown type error,
        // it may be stack size issue, read README for more info
        console.log(e);
        setCompiled(false);
        setHalted(true);
        showSnackbar("Error Occured!");
        setErrors(e);
        addAnnotation(e);
      }

      localStorage.setItem("x86code", code);
    } else {
      setLoading(true);
    }
  };

  // To set editor to highlight a line
  const setLine = (line) => {
    codeEditor.current.editor.gotoLine(line);
  };

  // Validate start address
  const validateAndSetAddress = (address) => {
    if (!driver) {
      setAddressError("Compile Program Before Setting Memory");
      return;
    }
    if (address === "") {
      setStartAddress("");
      return;
    }
    if (/^[0-9A-F]{0,5}$/.test(address)) {
      let start = parseInt("0x" + address);

      if (start > ALLOWED_ADDRESS_MAX) {
        setAddressError(
          "Must be between 00000 to " +
            ALLOWED_ADDRESS_MAX.toString(16).toUpperCase()
        );
        return;
      }
      setAddressError("");
      setStartAddress(address);
    } else {
      setStartAddress(startAddress);
      setAddressError("Must be between 00000 to FFF7F");
    }
  };

  // On change handler for set code editor
  const onChange = (newValue) => {
    setCode(newValue);
    localStorage.setItem("x86code", newValue);

    settimeout(resetTimeout(timeout, setTimeout(saveValue(), 400)));
  };
  //Auto Save
  const saveValue = () => {
    setSaved(true);

    setTimeout(() => setSaved(false), 1000);
  };

  //called when you enter a start address and press set
  const saveAddress = () => {
    if (!addressError) {
      let start = parseInt("0x" + startAddress);
      let mem = driver.get_mem(start, start + MEM_MAX - 1);
      setMemory(convertArray(mem));
    }
  };

  //runs when you press RUN button
  const runCode = () => {
    startIntervalTask();
  };

  //runs when you press NEXT button
  const executeNext = () => {
    try {
      let res = driver.next();
      setLine(driver.line);
      if (res.halt) {
        setCompiled(false);
        setHalted(true);
        showSnackbar("Execution Halted!");
      }
      if (res.int) {
        if (res.int === 3) {
          // don't do anything here
        }
        if (res.int === 10) {
          let out = outputHolder + "\n" + driver.int_10();
          outputHolder = out;
          setOutput(out);
        }
        if (res.int === 21) {
          if (res.ah === 2) {
            let out = outputHolder + "\n" + driver.get_int_21();
            outputHolder = out;
            setOutput(out);
          } else {
            setHalted(true);
            showSnackbar("Execution Halted!");
          }
        }
      }
      set8086State(driver);
    } catch (e) {
      console.log(e);
      setCompiled(false);
      setHalted(true);
      showSnackbar("Error Occured!");
      setErrors(e);
      addAnnotation(e);
    }
  };

  //runs when you press STOP button
  const stopCode = () => {
    stopIntervalTask();
  };

  //To set an input
  const handleInput = () => {
    if (halted && driver) {
      driver.set_int_21(input.slice(0));
      setHalted(false);
      showSnackbar("Click Run or Next to continue Execution");
    }
  };

  const convertArray = (arr) => {
    let temp = [];
    let temp2d = [];
    arr.forEach((item, index) => {
      temp.push(item);
      if (index % 16 === 15) {
        temp2d.push(temp);
        temp = [];
      }
    });
    return temp2d;
  };

  const startTutorial = () => {
    setTutorial(true);
    setTutorialStep(0);
  };

  const nextTutorial = () => {
    if (tutorialStep === 8) {
      setTutorial(false);
      localStorage.setItem("tutorial", "done");
    }
    setTutorialStep(tutorialStep + 1);
  };

  //Function for downloading the code
  const downloadCode = (text) => {
    const element = document.createElement("a");
    const file = new Blob([code], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "MyAssemblyCode.s";
    document.body.appendChild(element);
    element.click();
  };

  useEffect(() => {
    if (localStorage.getItem("tutorial") !== "done") {
      startTutorial();
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.chatbot}>
        <df-messenger
          intent="WELCOME"
          chat-title="8086-FAQ"
          agent-id="e8ee4339-e450-41f5-9715-d8f8b2aa45a1"
          language-code="en"
        ></df-messenger>
      </div>

      <Tooltip title="Tutorial" arrow>
        <IconButton
          onClick={() => startTutorial()}
          className={matches ? classes.hidden : classes.tutorialIcon}
        >
          <img
            style={
              currentTheme === "dark"
                ? { filter: "invert(0.7)", height: "2rem" }
                : { height: "2rem", opacity: 0.4 }
            }
            src={help}
            alt="start tutorial"
          />
        </IconButton>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        message={snackbarText}
        className={classes.snackbar}
      />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        <h3 className={classes.loadingText}>Compiling</h3>
      </Backdrop>
      <Backdrop className={classes.tutorialBackdrop} open={tutorial}></Backdrop>
      <Grid container spacing={2}>
        <Grid item lg={7}>
          <Grid container spacing={2} className={classes.spaceBelow}>
            <Grid item lg={4}>
              <Typography variant="h5">Code Editor</Typography>
            </Grid>
            <Grid item lg={8} align="right">
              <Button
                aria-describedby={tutorialStep === 1 ? "compile" : ""}
                variant="contained"
                color="primary"
                size="small"
                ref={compileRef}
                onClick={compile}
                disabled={!props.wasm}
                className={classes.compileButton}
              >
                {" "}
                COMPILE{" "}
              </Button>
              <Popover
                id={"compile"}
                open={tutorialStep === 1}
                anchorEl={compileRef.current}
                onClose={() => nextTutorial()}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.tooltips} component="div">
                  <b>Step 2</b>
                  <hr />
                  Next, Compile the code.
                </Typography>
              </Popover>
              <Button
                variant="outlined"
                aria-describedby={tutorialStep === 2 ? "run" : ""}
                size="small"
                onClick={runCode}
                ref={runRef}
                disabled={!compiled || halted}
                className={
                  compiled && !halted ? classes.runBtn : classes.topBtn
                }
              >
                {" "}
                Run{" "}
              </Button>
              <Popover
                id={"run"}
                open={tutorialStep === 2}
                anchorEl={runRef.current}
                onClose={() => nextTutorial()}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.tooltips} component="div">
                  <b>Step 3</b>
                  <hr />
                  Run the compiled code.
                </Typography>
              </Popover>
              <Button
                variant="outlined"
                size="small"
                ref={singleStepRef}
                aria-describedby={tutorialStep === 3 ? "single_step" : ""}
                onClick={executeNext}
                disabled={!compiled || halted}
                className={
                  compiled && !halted ? classes.nextBtn : classes.topBtn
                }
              >
                {" "}
                Next{" "}
              </Button>
              <Popover
                id={"single_step"}
                open={tutorialStep === 3}
                anchorEl={singleStepRef.current}
                onClose={() => nextTutorial()}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.tooltips} component="div">
                  <b>Step 4</b>
                  <hr />
                  Execute the next line of the instruction.
                </Typography>
              </Popover>
              <Button
                variant="outlined"
                size="small"
                ref={stopRef}
                aria-describedby={tutorialStep === 4 ? "stop" : ""}
                onClick={stopCode}
                disabled={!compiled || halted}
                className={
                  compiled && !halted ? classes.stopBtn : classes.topBtn
                }
              >
                {" "}
                Stop{" "}
              </Button>
              <Popover
                id={"stop"}
                open={tutorialStep === 4}
                anchorEl={stopRef.current}
                onClose={() => nextTutorial()}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.tooltips} component="div">
                  <b>Step 5</b>
                  <hr />
                  Halt the execution.
                </Typography>
              </Popover>
            </Grid>
          </Grid>
          <Paper ref={editorContainer}>
            <div style={{ flex: 1, flexDirection: "row" }}>
              <div
                onClick={() => {
                  console.log("hhh");
                  downloadCode(code);
                }}
                ref={downloadRef}
                aria-describedby={tutorialStep === 8 ? "download_code" : ""}
                style={{
                  flex: 1,
                  fontSize: 18,
                  paddingRight: 10,
                  paddingLeft: 10,
                  marginTop: 10,
                  color: "red",
                  float: "right",
                  cursor: "pointer",
                }}
              >
                <Tooltip title="Download Code" arrow>
                  <DownloadButton />
                </Tooltip>
              </div>
              <Popover
                id={"downloadCode"}
                open={tutorialStep === 8}
                anchorEl={downloadRef.current}
                onClose={() => nextTutorial()}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.tooltips} component="div">
                  <b>Step 9</b>
                  <hr />
                  Download Code from here
                </Typography>
              </Popover>
              <div
                style={{
                  clear: "both",
                  fontSize: 18,
                  paddingRight: 10,
                  paddingLeft: 10,
                  color: "red",
                  float: "right",
                }}
              >
                <p>{saved ? "Saved" : ""}</p>
              </div>
            </div>
            <AceEditor
              ref={codeEditor}
              aria-describedby={tutorialStep === 0 ? "editor" : ""}
              mode="assembly_x86"
              height="60vh"
              width="match-parent"
              value={code}
              fontSize={14}
              showPrintMargin={false}
              theme={currentTheme === "normal" ? "dreamweaver" : "twilight"}
              onChange={onChange}
              name="CODE_EDITOR"
              editorProps={{ $blockScrolling: false }}
              annotations={errorAnnotations}
            />
          </Paper>
          <Popover
            id={"editor"}
            open={tutorialStep === 0}
            anchorEl={editorContainer.current}
            onClose={() => nextTutorial()}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.tooltips} component="div">
              <b>Step 1</b>
              <hr />
              Write your Code in the editor.
            </Typography>
          </Popover>
          {errors ? (
            <Paper className={classes.error} elevation={4}>
              Errors: <br />
              {errors}
            </Paper>
          ) : (
            <div>
              <Textfield
                label="Input"
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Use this to submit your input on runtime"
                        arrow
                        placement="right"
                      >
                        <IconButton onClick={handleInput}>&#10003;</IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <Textfield
                label="Output"
                value={output}
                multiline
                fullWidth
                disabled
              />
            </div>
          )}
        </Grid>
        <Grid item lg={5} style={matches ? { maxWidth: "100vw" } : null}>
          <Popover
            id={"register"}
            open={tutorialStep === 5}
            anchorEl={registerRef.current}
            onClose={() => nextTutorial()}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.tooltips} component="div">
              <b>Step 6</b>
              <hr />
              Check Registers values here.
            </Typography>
          </Popover>
          <Grid
            container
            spacing={3}
            ref={registerRef}
            aria-describedby={tutorialStep === 5 ? "register" : ""}
          >
            <Grid item lg={5}>
              <TableContainer
                className={classes.registerTable}
                component={Paper}
              >
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Reg</TableCell>
                      <TableCell align="right">H</TableCell>
                      <TableCell align="right">L</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        A
                      </TableCell>
                      <TableCell align="right">{register.ah}</TableCell>
                      <TableCell align="right">{register.al}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        B
                      </TableCell>
                      <TableCell align="right">{register.bh}</TableCell>
                      <TableCell align="right">{register.bl}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        C
                      </TableCell>
                      <TableCell align="right">{register.ch}</TableCell>
                      <TableCell align="right">{register.cl}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        D
                      </TableCell>
                      <TableCell align="right">{register.dh}</TableCell>
                      <TableCell align="right">{register.dl}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <TableContainer
                className={classes.segmentTable}
                component={Paper}
              >
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Segments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SS
                      </TableCell>
                      <TableCell align="right">{register.ss}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        DS
                      </TableCell>
                      <TableCell align="right">{register.ds}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        ES
                      </TableCell>
                      <TableCell align="right">{register.es}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <TableContainer
                className={classes.segmentTable}
                component={Paper}
              >
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Pointers</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SP
                      </TableCell>
                      <TableCell align="right">{register.sp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        BP
                      </TableCell>
                      <TableCell align="right">{register.bp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SI
                      </TableCell>
                      <TableCell align="right">{register.si}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        DI
                      </TableCell>
                      <TableCell align="right">{register.di}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <TableContainer
            className={classes.flagTable}
            aria-describedby={tutorialStep === 6 ? "flags" : ""}
            ref={flagRef}
            component={Paper}
            style={matches ? null : { minWidth: 505 }}
          >
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" colSpan="9">
                    Flags:
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="column">
                    OF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    DF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    IF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    TF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    SF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    ZF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    AF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    PF
                  </TableCell>
                  <TableCell component="th" scope="column">
                    CF
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    {flags.of}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.df}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.if}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.tf}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.sf}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.zf}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.af}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.pf}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {flags.cf}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Popover
            id={"flags"}
            open={tutorialStep === 6}
            anchorEl={flagRef.current}
            onClose={() => nextTutorial()}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.tooltips} component="div">
              <b>Step 7</b>
              <hr />
              Check flags here
            </Typography>
          </Popover>
          <br />
          <Grid container>
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <Typography variant="h5"> Memory </Typography>
            </Grid>
            <Grid item lg={5} md={8}>
              <Textfield
                style={matches ? { marginTop: 20 } : { top: -4 }}
                error={!!addressError}
                size="small"
                value={startAddress}
                label="Start Address"
                onChange={(e) => {
                  validateAndSetAddress(e.target.value.toUpperCase());
                }}
                helperText={addressError}
                className={classes.textF}
                placeholder="Start Address"
              />
            </Grid>
            <Grid item lg={2} md={4} style={matches ? { marginTop: 20 } : null}>
              <Button variant="outlined" size="large" onClick={saveAddress}>
                {" "}
                Set{" "}
              </Button>
            </Grid>
          </Grid>
          <TableContainer
            className={classes.ramTable}
            ref={ramRef}
            aria-describedby={tutorialStep === 7 ? "ram" : ""}
            component={Paper}
          >
            <Table padding="none" size="small" aria-label="simple table">
              <TableBody>
                {memory.map((row, index1) => (
                  <TableRow key={index1}>
                    {row.map((item, index2) => (
                      <TableCell align="center" key={index2}>
                        {item.toString(16).length === 1 ? "0" : ""}
                        {item.toString(16)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Popover
            id={"ram"}
            open={tutorialStep === 7}
            anchorEl={ramRef.current}
            onClose={() => nextTutorial()}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.tooltips} component="div">
              <b>Step 8</b>
              <hr />
              Check RAM Memory here. You can also adjust the memory locations
              with the text field
            </Typography>
          </Popover>
        </Grid>
      </Grid>
    </div>
  );
}

export default Compiler;
