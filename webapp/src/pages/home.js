import React from "react";
import HomeImage from "../images/home.jpg";
//Material UI Imports
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
//Tilt
import Tilty from "react-tilty";

const useStyles = makeStyles((theme) => ({
  btnDiv: {
    marginTop: "5vh",
  },
  topCard: {
    marginBottom: "5vh",
  },
  noPadd: {
    marginBottom: -5,
  },
  headerText: {
    padding: 30,
    transform: "translateZ(30px)",
    fontWeight: "800",
  },
  cardLeft: {
    padding: 30,
    borderRadius: "0px 30px 30px 0px",
    height: "100%",
  },
  cardRight: {
    padding: 30,
    borderRadius: "30px 0px 0px 30px",
    height: "100%",
  },
  cardCenter: {
    padding: 30,
    borderRadius: "30px 30px 30px 30px",
    height: "100%",
  },
  heading: {
    fontWeight: "800",
    transform: "translateZ(30px)",
  },
  content: {
    fontWeight: "300",
    marginTop: 30,
    transform: "translateZ(30px)",
    textAlign: "justify",
  },
  bottomBtn: {
    minWidth: 200,
    margin: 5,
    transform: "translateZ(30px)",
  },
  link: {
    textDecoration: "underline",
    color: theme.palette.secondary.contrastText,
    textDecorationThickness: 1,
  },
  btnLink: {
    textDecoration: "none",
    transform: "translateZ(30px)",
  },
  img: {
    minHeight: 300,
    transform: "translateZ(30px)",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div>
      <Tilty max={10} scale={1.05}>
        <Paper elevation={7} className={classes.topCard}>
          <Grid container>
            <Grid item md={4} className={classes.noPadd}>
              <img
                src={HomeImage}
                width="100%"
                alt="laptop mobile compatible"
                className={classes.img}
              />
            </Grid>
            <Grid item md={6} className={classes.headerText}>
              <Typography
                variant="h4"
                component="h1"
                className={classes.heading}
                gutterBottom
              >
                Online 8086 EMULATOR
              </Typography>
              <Typography variant="body1" className={classes.content}>
                Platform and Device Independent!
                <br /> Now run 8086 based assembly programs right in browser.
                <br />
                Open Source :{" "}
                <a
                  href="https://github.com/YJDoc2/8086-Emulator-Web/"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  Github Repository
                </a>
                <br />
                Also in{" "}
                <a
                  href="https://github.com/YJDoc2/8086-Emulator/"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  Command line version
                </a>
                <br />
                Made Using React, WASM and Rust.
              </Typography>
              <div className={classes.btnDiv}>
                <Link
                  to="/8086-emulator-web/compile"
                  className={classes.btnLink}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.bottomBtn}
                    style={{ boxShadow: "#F4C430 0px 2px 2px -2px" }}
                  >
                    Try Online 8086 Compiler
                  </Button>
                </Link>
                <Link to="/8086-emulator-web/help" className={classes.btnLink}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.bottomBtn}
                  >
                    Instruction Set
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Tilty>
      <Grid container spacing={5}>
        <Grid item md={4}>
          <Tilty
            className="tilty"
            max={30}
            scale={1.05}
            style={{ height: "100%" }}
          >
            <Paper className={classes.cardLeft} elevation={7} tabIndex="0">
              <Typography variant="h5" className={classes.heading} gutterBottom>
                Multiple Themes
              </Typography>
              <Typography variant="body1" className={classes.content}>
                We know that programmers love the dark theme. Toggle between
                Bright and Dark Theme using the theme button in Navbar.
              </Typography>
            </Paper>
          </Tilty>
        </Grid>
        <Grid item md={4}>
          <Tilty
            className="tilty"
            max={30}
            scale={1.05}
            style={{ height: "100%" }}
          >
            <Paper className={classes.cardCenter} elevation={7} tabIndex="0">
              <Typography variant="h5" className={classes.heading} gutterBottom>
                Access To 1 MB Memory
              </Typography>
              <Typography variant="body1" className={classes.content}>
                The Emulator supports complete 1 MB Memory, which can be
                accessed from the memory table.
              </Typography>
            </Paper>
          </Tilty>
        </Grid>
        <Grid item md={4}>
          <Tilty
            className="tilty"
            max={30}
            scale={1.05}
            style={{ height: "100%" }}
          >
            <Paper className={classes.cardRight} elevation={7} tabIndex="0">
              <Typography variant="h5" className={classes.heading} gutterBottom>
                Validated Jump and Call using Labels
              </Typography>
              <Typography variant="body1" className={classes.content}>
                As Jumps and calls only allows valid labels, it does not permit
                any jumps to incorrect position.
              </Typography>
            </Paper>
          </Tilty>
        </Grid>
        <Grid item md={4}>
          <Tilty
            className="tilty"
            max={30}
            scale={1.05}
            style={{ height: "100%" }}
          >
            <Paper className={classes.cardLeft} elevation={7} tabIndex="0">
              <Typography variant="h5" className={classes.heading} gutterBottom>
                Selected Interrupts
              </Typography>
              <Typography variant="body1" className={classes.content}>
                Being an Emulator, this does not have 'true' memory (See Github
                Repository) so it supports select few interrupts.
              </Typography>
            </Paper>
          </Tilty>
        </Grid>
        <Grid item md={4}>
          <Tilty
            className="tilty"
            max={30}
            scale={1.05}
            style={{ height: "100%" }}
          >
            <Paper className={classes.cardCenter} elevation={7} tabIndex="0">
              <Typography variant="h5" className={classes.heading} gutterBottom>
                Line by Line Execution
              </Typography>
              <Typography variant="body1" className={classes.content}>
                Supports running all instructions automatically, or manual line
                by line execution. You can also stop the automatic execution
                with a simple button click.
              </Typography>
            </Paper>
          </Tilty>
        </Grid>
        <Grid item md={4}>
          <Tilty
            className="tilty"
            max={30}
            scale={1.05}
            style={{ height: "100%" }}
          >
            <Paper className={classes.cardRight} elevation={7} tabIndex="0">
              <Typography variant="h5" className={classes.heading} gutterBottom>
                Check Registers and Flags in Real Time
              </Typography>
              <Typography variant="body1" className={classes.content}>
                Updates Flags and registers along with the execution, so can
                check the state of Emulator easily, all in a single view.
              </Typography>
            </Paper>
          </Tilty>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
