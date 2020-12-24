//To DO:
// Add a global const for max value of input for Start Address

import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Fragment,
} from 'react';
import { CustomThemeContext } from '../themes/CustomThemeProvider';
// Ace Editor
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'ace-builds/src-noconflict/theme-twilight';
//Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Textfield from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: -20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loadingText: {
    paddingLeft: 20,
  },
  flex: {
    display: 'flex',
  },
  compileBtnDiv: {
    paddingRight: '1vw',
    display: 'inline',
    flexGrow: 1,
  },
  registerTable: {
    maxWidth: 175,
  },
  segmentTable: {
    minWidth: 125,
  },
  flagTable: {
    marginTop: 20,
    minWidth: 505,
  },
  ramTable: {
    marginTop: 30,
  },
  error: {
    color: 'red',
    marginTop: 10,
    padding: 10,
  },
  textF: {
    marginRight: 20,
  },
  runBtn: {
    border: ' 1px solid #0f0 !important',
    color: '#0f0 !important',
    marginRight: 10,
  },
  nextBtn: {
    border: ' 1px solid #77f !important',
    color: '#77f !important',
    marginRight: 10,
  },
  stopBtn: {
    border: ' 1px solid red !important',
    color: 'red !important',
    marginRight: 10,
  },
  compileButton: {
    minWidth: 120,
    marginRight: 10,
  },
  topBtn: {
    marginRight: 10,
  },
}));

//Compiler Page
function Compiler(props) {
  let codeEditor = useRef(null);
  const { currentTheme } = useContext(CustomThemeContext);
  const classes = useStyles();
  const [halted, setHalted] = useState(false); // To check if compilation is halted, if this is true all buttons except compile are disabled
  const [memory, setMemory] = useState([
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
    [
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
      '00',
    ],
  ]);
  const [wasmModule, setWasmModule] = useState(null); //To set warm module
  const [startAddress, setStartAddress] = useState('00000'); //Start address of memory
  const [compiled, setCompiled] = useState(false); // To enable/disable Run, next and stop button
  const [loading, setLoading] = useState(false); //Backdrop
  const [errors, setErrors] = useState(''); // Post compilation errors are stored here
  const [addressError, setAddressError] = useState(''); // Stores error in address start format
  const [errorAnnotations, setErrorAnnotations] = useState([]); //For Error Annotations
  const [register, setRegister] = useState({
    ah: '00',
    al: '00',
    bh: '00',
    bl: '00',
    ch: '00',
    cl: '00',
    dh: '00',
    dl: '00',
    si: '0000',
    di: '0000',
    bp: '0000',
    sp: '0000',
    ss: '0000',
    ds: '0000',
    es: '0000',
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
    localStorage.getItem('x86code') ||
      `; Compiled using 8086 Online Compiler
data segment
    ; add your data segment code here!
ends

stack segment
   ; add your stack segment code here!
ends

code segment
start:
; set segment registers:
    mov ax, data
    mov ds, ax
    mov es, ax
    ; add your code here 

ends

end start ; set entry point and stop the assembler.`
  ); //State to maintain the code string
  //To add an error annotation, call this function and pas row number (starts with 0), column number (starts with 0) and error text
  const addAnnotation = (rowNumber, columnNumber, errorText) => {
    if (errorText.length > 30) {
      errorText = errorText.slice(0, errorText.indexOf(' ', 30)) + '...';
    }
    setErrorAnnotations((errorAnnotations) => [
      ...errorAnnotations,
      { row: rowNumber, column: columnNumber, type: 'error', text: errorText },
    ]);
  };

  //Uncomment below lines for Marker
  // const [markers, setMarkers] = useState([])
  // const addMarker = (startRowNumber, startColumnNumber, endRowNumber, endColumnNumber) => {
  // 	setMarkers(markers => [...markers, { startRow: startRowNumber, startCol: startColumnNumber, endRow: endRowNumber, endCol: endColumnNumber, className: 'error-marker', type: 'background' }])
  // }

  // Call when compiling the code
  const compile = () => {
    if (props.wasm) {
      //	Compile code here
      setCompiled(true);
      setHalted(false);
      localStorage.setItem('x86code', code);
    } else {
      setLoading(true);
    }
  };

  // To set editor to highlight a line
  const setLine = (line) => {
    codeEditor.current.editor.gotoLine(line);
  };

  // Validate start address
  const validateAddress = (address) => {
    if (/^[0-9A-F]{5}$/.test(address)) {
      if (
        address.slice(0, 3) === 'FFF' &&
        (parseInt(address[3]) > 7 || address[3].match(/[A-F]/i))
      ) {
        setAddressError('Must be between 00000 to FFF7F');
      } else {
        setAddressError('');
      }
    } else {
      setAddressError('Must be between 00000 to FFF7F');
    }
  };

  // On change handler for set code editor
  const onChange = (newValue) => {
    setCode(newValue);
  };

  //called when you enter a start address and press set
  const saveAddress = () => {
    if (!addressError) {
      console.log(startAddress);
    }
  };

  //runs when you press RUN button
  const runCode = () => {
    console.log('Running Code');
  };

  //runs when you press NEXT button
  const executeNext = () => {
    console.log('Executing Next Line');
  };

  //runs when you press STOP button
  const stopCode = () => {
    console.log('Execution Stopped');
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

  //Runs once on mount
  useEffect(() => {
    addAnnotation(
      3,
      1,
      'Syntax Error Long random text is here ok yes test 123'
    ); //Annotation goes away when u press enter
    //setErrors("Syntax Error Long random text is here ok yes test 123")
    setLine(4);
    //addMarker(1, 1, 1, 5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
        <h3 className={classes.loadingText}>Compiling</h3>
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item md={7}>
          <Typography variant='h5' gutterBottom className={classes.flex}>
            Code Editor
            <div align='right' className={classes.compileBtnDiv}>
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={compile}
                disabled={!props.wasm}
                className={classes.compileButton}
              >
                {' '}
                COMPILE{' '}
              </Button>
              <Button
                variant='outlined'
                size='small'
                onClick={runCode}
                disabled={!compiled || halted}
                className={compiled ? classes.runBtn : classes.topBtn}
              >
                {' '}
                Run{' '}
              </Button>
              <Button
                variant='outlined'
                size='small'
                onClick={executeNext}
                disabled={!compiled || halted}
                className={compiled ? classes.nextBtn : classes.topBtn}
              >
                {' '}
                Next{' '}
              </Button>
              <Button
                variant='outlined'
                size='small'
                onClick={stopCode}
                disabled={!compiled || halted}
                className={compiled ? classes.stopBtn : classes.topBtn}
              >
                {' '}
                Stop{' '}
              </Button>
            </div>
          </Typography>
          {
            // To Do:
            // Add media query here to check for width < 500 if so, keep width= window.innerwidth-20
            // add table for flags, registers and memory values
            // correct function of error add
            // add space for basic site info on homepg
          }
          <Paper>
            <AceEditor
              ref={codeEditor}
              mode='assembly_x86'
              height='420px'
              width='match-parent'
              value={code}
              fontSize={14}
              showPrintMargin={false}
              theme={currentTheme === 'normal' ? 'dreamweaver' : 'twilight'}
              onChange={onChange}
              name='CODE_EDITOR'
              editorProps={{ $blockScrolling: false }}
              annotations={errorAnnotations}
            />
          </Paper>
          {errors ? (
            <Paper className={classes.error} elevation={4}>
              Errors: <br />
              {errors}
            </Paper>
          ) : (
            <div>
              <Textfield label='Input' fullWidth />
              <Textfield label='Output' fullWidth disabled />
            </div>
          )}
        </Grid>
        <Grid item md={5}>
          <Grid container>
            <Grid item md={5}>
              <TableContainer
                className={classes.registerTable}
                component={Paper}
              >
                <Table size='small' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reg</TableCell>
                      <TableCell align='right'>H</TableCell>
                      <TableCell align='right'>L</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        A
                      </TableCell>
                      <TableCell align='right'>{register.ah}</TableCell>
                      <TableCell align='right'>{register.al}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        B
                      </TableCell>
                      <TableCell align='right'>{register.bh}</TableCell>
                      <TableCell align='right'>{register.bl}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        C
                      </TableCell>
                      <TableCell align='right'>{register.ch}</TableCell>
                      <TableCell align='right'>{register.cl}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        D
                      </TableCell>
                      <TableCell align='right'>{register.dh}</TableCell>
                      <TableCell align='right'>{register.dl}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3}>
              <TableContainer
                className={classes.segmentTable}
                component={Paper}
              >
                <Table size='small' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Segments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        SS
                      </TableCell>
                      <TableCell align='right'>{register.ss}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        DS
                      </TableCell>
                      <TableCell align='right'>{register.ds}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        ES
                      </TableCell>
                      <TableCell align='right'>{register.es}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={1}></Grid>
            <Grid item md={3}>
              <TableContainer
                className={classes.segmentTable}
                component={Paper}
              >
                <Table size='small' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Pointers</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        SP
                      </TableCell>
                      <TableCell align='right'>{register.sp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        BP
                      </TableCell>
                      <TableCell align='right'>{register.bp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        SI
                      </TableCell>
                      <TableCell align='right'>{register.si}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        DI
                      </TableCell>
                      <TableCell align='right'>{register.di}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <TableContainer className={classes.flagTable} component={Paper}>
            <Table size='small' aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th' colSpan='9'>
                    Flags:
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='column'>
                    OF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    DF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    IF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    TF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    SF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    ZF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    AF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    PF
                  </TableCell>
                  <TableCell component='th' scope='column'>
                    CF
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.of}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.df}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.if}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.tf}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.sf}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.zf}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.af}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.pf}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {flags.cf}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Grid container>
            <Grid item xs={5}>
              <Typography variant='h5'> Memory </Typography>
            </Grid>
            <Grid item xs={5}>
              <Textfield
                style={{ top: -4 }}
                error={!!addressError}
                size='small'
                value={startAddress}
                label='Start Address'
                onChange={(e) => {
                  setStartAddress(e.target.value.toUpperCase());
                  validateAddress(e.target.value.toUpperCase());
                }}
                helperText={addressError}
                className={classes.textF}
                placeholder='Start Address'
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant='outlined' size='large' onClick={saveAddress}>
                {' '}
                Set{' '}
              </Button>
            </Grid>
          </Grid>
          <TableContainer className={classes.ramTable} component={Paper}>
            <Table padding='none' size='small' aria-label='simple table'>
              <TableBody>
                {memory.map((row, index) => (
                  <TableRow key={index}>
                    {row.map((item, index) => (
                      <TableCell align='center'>{item}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Compiler;
