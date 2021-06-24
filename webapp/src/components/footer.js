import React, { useContext } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";
// MuI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  footer: {
    zIndex: 0,
    position: "relative",
  },
  footeras: {
    textDecoration: "none",
    flexGrow: 1,
    fontSize: 19,
  },
  footerToolbar: {
    padding: 7,
    minHeight: 20,
    fontSize: 16,
    backgroundColor: "#0f0f0f",
    color: "#f0f0f0",
  },
  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  const { currentTheme } = useContext(CustomThemeContext);
  return (
    <div className={classes.root} id="footer-small">
      <AppBar
        color="secondary"
        className={classes.footer}
        style={
          currentTheme === "dark"
            ? {
                boxShadow:
                  "0px -2px 6px -1px rgba(255,255,255,0.3), 0px -2px 5px 0px rgba(255,255,255,0.24), 0px -1px 10px 0px rgba(255,255,255,0.22)",
              }
            : {
                boxShadow:
                  "0px -2px 6px -1px rgba(0,0,0,0.3), 0px -2px 5px 0px rgba(0,0,0,0.24), 0px -1px 10px 0px rgba(0,0,0,0.22)",
              }
        }
      >
        <Toolbar className={classes.footerToolbar}>
          <div align="center" className={classes.root}>
            &#169; Reserved | Developed by • 
            <a
              href="https://github.com/YJDoc2"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              Yashodhan Joshi
            </a>{" "}
            • 
            <a
              href="https://github.com/YatharthVyas"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              Yatharth Vyas
            </a>{" "}
            • 
            <a
              href="https://github.com/Tejas988"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              Tejas Ghone
            </a>{" "}
            • 
            <a
              href="https://github.com/Vatsalsoni13"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              Vatsal Soni
            </a>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
