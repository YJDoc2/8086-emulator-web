import React from "react";
import Instruction from "../components/instruction";
import { instruction_set } from "../components/instructionSet";
// Material UI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  navLink: {
    cursor: "pointer",
    paddingLeft: 15,
    marginBottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    "&:hover": {
      color: "#F4C430",
    },
  },
  instructions: {
    borderLeft: "1px solid silver",
    paddingLeft: 20,
    marginLeft: 250,
  },
  instructionName: {
    marginBottom: 25,
    fontWeight: "700",
  },
  marginBottom30: {
    marginBottom: 30,
  },
}));

function InstructionSet() {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:1324px)");

  return (
    <div>
      <Typography variant="h4" style={{ fontWeight: "800" }}>
        Instruction Set:
      </Typography>
      <br />
      <div id="sidebar">
        {instruction_set.map((instructiongroup) => (
          <Typography
            onClick={() =>
              window.scrollTo({
                top:
                  document.getElementById(
                    `instruction-${instructiongroup.name}`
                  ).offsetTop - 50,
                behavior: "smooth",
              })
            }
            variant="h6"
            key={`nav-${instructiongroup.name}`}
            gutterBottom
            className={classes.navLink}
          >
            {instructiongroup.name}
          </Typography>
        ))}
      </div>
      <div style={matches ? { display: "none" } : null}></div>
      <div className={!matches ? classes.instructions : null}>
        {instruction_set.map((instructiongroup) => (
          <div
            key={`instruction-${instructiongroup.name}`}
            id={`instruction-${instructiongroup.name}`}
          >
            <Typography variant="h5" className={classes.instructionName}>
              {instructiongroup.name}
            </Typography>
            <div className={classes.marginBottom30}>
              {instructiongroup.instructions.map((instruction) => (
                <Instruction
                  opcode={instruction.opcode}
                  name={instruction.name}
                  example={instruction.example}
                  description={instruction.description}
                  key={instruction.name}
                  usage={instruction.usage}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructionSet;
