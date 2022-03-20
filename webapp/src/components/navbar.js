import React, { useContext } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";
// Assets
import cpu from "../images/chip-memory.svg";
import { ReactComponent as Terminal } from "../images/terminal.svg";
// MuI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Routing
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleBar: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 800,
    cursor: "pointer",
  },
  navbar: {
    padding: 5,
  },
  info: {
    marginTop: 2,
  },
}));

function Navbar() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:1024px)");
  const history = useHistory();
  const loc = useLocation();
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const handleThemeChange = (event) => {
    if (currentTheme === "normal") {
      setTheme("dark");
    } else {
      setTheme("normal");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        color="secondary"
        position="static"
        id="navbarCustomId"
        className={classes.navbar}
        style={
          currentTheme === "dark"
            ? {
                boxShadow:
                  "0px 4px 6px -1px rgba(255,255,255,0.3), 0px 4px 5px 0px rgba(255,255,255,0.24), 0px 1px 10px 0px rgba(255,255,255,0.22)",
              }
            : null
        }
      >
        <Toolbar>
          <div className={classes.titleBar}>
            <Typography
              color="primary"
              component="span"
              onClick={() => history.push("/8086-emulator-web/")}
              className={classes.title}
              style={{ fontSize: matches ? 30 : 24 }}
              tabIndex="0"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  history.push("/8086-emulator-web/");
                }
              }}
              aria-label="Visit the Home Page"
              role="link"
            >
              8086 Compiler
            </Typography>
          </div>
          {matches && (
            <Tooltip title="Explore Command Line Version" arrow>
              <a
                style={{ padding: 5, marginTop: 8, marginRight: 5 }}
                href="https://github.com/YJDoc2/8086-Emulator/"
                target="_blank"
                rel="noreferrer"
              >
                <Terminal
                  style={{
                    width: 32,
                    // filter: currentTheme === "dark" ? "invert(1)" : "none",
                    fill: currentTheme === "dark" ? "#ccc" : "#111",
                  }}
                />
              </a>
            </Tooltip>
          )}
          {loc.pathname !== "/8086-emulator-web/help" && (
            <Tooltip title="Instructions Page" arrow>
              <IconButton
                aria-label="Visit the Instructions Page"
                role="link"
                onClick={() => history.push("/8086-emulator-web/help")}
              >
                <span
                  style={
                    currentTheme === "normal"
                      ? { fontWeight: "bold" }
                      : { color: currentTheme === "dark" ? "#ccc" : "#111" }
                  }
                  className={classes.info}
                >
                  &#9432;
                </span>
              </IconButton>
            </Tooltip>
          )}
          {loc.pathname !== "/8086-emulator-web/compile" && (
            <Tooltip title="Compiler Page" arrow>
              <IconButton
                onClick={() => history.push("/8086-emulator-web/compile")}
                aria-label="Visit the Compiler Page"
                role="link"
              >
                <img
                  style={
                    currentTheme === "dark"
                      ? {
                          filter: "invert(0.7)",
                          height: "2rem",
                          rotate: "90deg",
                        }
                      : { height: "2rem", rotate: "90deg" }
                  }
                  src={cpu}
                  alt="compiler"
                />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip
            title={`Switch to ${
              currentTheme === "dark" ? "light" : "dark"
            } theme`}
            arrow
          >
            <IconButton
              onClick={handleThemeChange}
              id="themeBtn"
              style={{ marginRight: -20 }}
              aria-label="Change Color Theme"
            >
              <img
                style={currentTheme === "dark" ? { filter: "invert(1)" } : null}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3WvUodQRQH8J969YIiBlIJPoEPoA8gWAliYgLiLbXyo/Gjip0vYGGRh0hhSBVI0kUuhiRdqkQtRFBQxMpbpdgRr+Dunf0AQfzDYWd35/z/M2fOmRmeEY+JYIVQKyH8Njy/FHHuLiFcClnCPRXwp3KkCddwjkYGaStYGho4U2A5G7jJEB8KVsQ3Wnw2h8+bsqLtRPOhXcMivknCeIavWHAX0vmYgXblGMAwPuIldnEQvo9hSZIT0zjNwdkRdfzEHvof+N8fBvUDfVUKr+Bfimi7+JFk9pWhibWIfhvYjyFsr7FJvG57b+EdrjDqbk2zcICt0B7Ctvuh/4DP5Nsy8yRiZWhiPaLfpshQx2IVh7KTawDHWK5SuI7fkpJ5SHwAn/BLZDnlWbeRQP5CsoE0g/+4pIQuMIWTHJyZeIW50K5Lanof18G+S8J7O9M5zJQVLXJIzKroZEojGAxWxDcVvbjs4LgTLA2NwNGbV7xTdr4PVogja+fKutbEIpXj0W6ZZW6SLfzB34rG8sTxHxQCSoItZf48AAAAAElFTkSuQmCC"
                alt="change theme icon"
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
