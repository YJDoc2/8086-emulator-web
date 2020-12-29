import React from 'react';
import HomeImage from '../images/home.jpg';
//Material UI Imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
//Tilt
import Tilt from 'react-tilt';

const useStyles = makeStyles((theme) => ({
  btnDiv: {
    marginTop: '5vh',
  },
  topCard: {
    marginBottom: '5vh',
  },
  noPadd: {
    marginBottom: -5,
  },
  headerText: {
    padding: 30,
  },
  cardLeft: {
    padding: 30,
    borderRadius: '0px 30px 30px 0px',
  },
  cardRight: {
    padding: 30,
    borderRadius: '30px 0px 0px 30px',
  },
  cardCenter: {
    padding: 30,
    borderRadius: '30px 30px 30px 30px',
  },
  heading: {
    fontWeight: 500,
  },
  content: {
    fontWeight: 300,
    marginTop: 30,
  },
  bottomBtn: {
    minWidth: 200,
    margin: 5,
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.secondary.contrastText,
  }
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <Tilt className='Tilt' options={{ max: 10, scale: 1.05 }}>
        <Paper elevation={7} className={classes.topCard}>
          <Grid container>
            <Grid item md={4} className={classes.noPadd}>
              <img
                src={HomeImage}
                width='100%'
                alt='laptop mobile compatible'
              />
            </Grid>
            <Grid item md={6} className={classes.headerText}>
              <Typography variant='h5' className={classes.heading} gutterBottom>
                {' '}
                8086 EMULATOR{' '}
              </Typography>
              <Typography variant='body1' className={classes.content}>
                Platform and Device Independent!
                <br /> Now run 8086 based assembly programs right in browser.
                <br />
                Open Source :{' '}
                <a
                  href='https://github.com/YJDoc2/8086-Emulator-Web/'
                  target='_blank'
                  rel='noreferrer'
                  className={classes.link}
                >
                  Github Repository
                </a>
                <br />
                Also in{' '}
                <a
                  href='https://github.com/YJDoc2/8086-Emulator/'
                  target='_blank'
                  rel='noreferrer'
                  className={classes.link}
                >
                  Command line version
                </a>
                <br />
                Made Using React , WASM and Rust.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Tilt>
      <Grid container spacing={5}>
        <Grid item md={4}>
          <Tilt className='Tilt' options={{ max: 30, scale: 1.05 }}>
            <Paper className={classes.cardLeft} elevation={7}>
              <Typography variant='h5' className={classes.heading} gutterBottom>
                {' '}
                Feature Name{' '}
              </Typography>
              <Typography variant='body1' className={classes.content}>
                Pariatur qui voluptate incididunt amet dolore quis pariatur ut
                eu incididunt id eiusmod sit culpa laborum tempor nulla in in
                aliquip in ad ex nulla deserunt do pariatur est laborum ut
                dolore elit exercitation.
              </Typography>
            </Paper>
          </Tilt>
        </Grid>
        <Grid item md={4}>
          <Tilt className='Tilt' options={{ max: 30, scale: 1.05 }}>
            <Paper className={classes.cardCenter} elevation={7}>
              <Typography variant='h5' className={classes.heading} gutterBottom>
                {' '}
                Feature Name{' '}
              </Typography>
              <Typography variant='body1' className={classes.content}>
                Pariatur qui voluptate incididunt amet dolore quis pariatur ut
                eu incididunt id eiusmod sit culpa laborum tempor nulla in in
                aliquip in ad ex nulla deserunt do pariatur est laborum ut
                dolore elit exercitation.
              </Typography>
            </Paper>
          </Tilt>
        </Grid>
        <Grid item md={4}>
          <Tilt className='Tilt' options={{ max: 30, scale: 1.05 }}>
            <Paper className={classes.cardRight} elevation={7}>
              <Typography variant='h5' className={classes.heading} gutterBottom>
                {' '}
                Feature Name{' '}
              </Typography>
              <Typography variant='body1' className={classes.content}>
                Pariatur qui voluptate incididunt amet dolore quis pariatur ut
                eu incididunt id eiusmod sit culpa laborum tempor nulla in in
                aliquip in ad ex nulla deserunt do pariatur est laborum ut
                dolore elit exercitation.
              </Typography>
            </Paper>
          </Tilt>
        </Grid>
        <Grid item md={4}>
          <Tilt className='Tilt' options={{ max: 30, scale: 1.05 }}>
            <Paper className={classes.cardLeft} elevation={7}>
              <Typography variant='h5' className={classes.heading} gutterBottom>
                {' '}
                Feature Name{' '}
              </Typography>
              <Typography variant='body1' className={classes.content}>
                Pariatur qui voluptate incididunt amet dolore quis pariatur ut
                eu incididunt id eiusmod sit culpa laborum tempor nulla in in
                aliquip in ad ex nulla deserunt do pariatur est laborum ut
                dolore elit exercitation.
              </Typography>
            </Paper>
          </Tilt>
        </Grid>
        <Grid item md={4}>
          <Tilt className='Tilt' options={{ max: 30, scale: 1.05 }}>
            <Paper className={classes.cardCenter} elevation={7}>
              <Typography variant='h5' className={classes.heading} gutterBottom>
                {' '}
                Feature Name{' '}
              </Typography>
              <Typography variant='body1' className={classes.content}>
                Pariatur qui voluptate incididunt amet dolore quis pariatur ut
                eu incididunt id eiusmod sit culpa laborum tempor nulla in in
                aliquip in ad ex nulla deserunt do pariatur est laborum ut
                dolore elit exercitation.
              </Typography>
            </Paper>
          </Tilt>
        </Grid>
        <Grid item md={4}>
          <Tilt className='Tilt' options={{ max: 30, scale: 1.05 }}>
            <Paper className={classes.cardRight} elevation={7}>
              <Typography variant='h5' className={classes.heading} gutterBottom>
                {' '}
                Feature Name{' '}
              </Typography>
              <Typography variant='body1' className={classes.content}>
                Pariatur qui voluptate incididunt amet dolore quis pariatur ut
                eu incididunt id eiusmod sit culpa laborum tempor nulla in in
                aliquip in ad ex nulla deserunt do pariatur est laborum ut
                dolore elit exercitation.
              </Typography>
            </Paper>
          </Tilt>
        </Grid>
      </Grid>
      <div align='center' className={classes.btnDiv}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.bottomBtn}
          onClick={() => history.push('/help')}
        >
          Instruction Set
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.bottomBtn}
          onClick={() => history.push('/compile')}
        >
          8086 Compiler
        </Button>
      </div>
    </div>
  );
}

export default Home;