import React from "react";
import Instruction from "../components/instruction";
import { instruction_set } from "../components/instructionSet";
import SEO from "../components/seo";
import { siteConfig } from "../siteConfig";
// Material UI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  navLink: {
    cursor: "pointer",
    display: "block",
    paddingLeft: 15,
    marginBottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "#F4C430",
    },
  },
  intro: {
    padding: 24,
    marginBottom: 24,
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
  inlineLink: {
    color: theme.palette.secondary.contrastText,
  },
}));

const groupId = (name) => `instruction-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

function InstructionSet() {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:1324px)");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.routes.home.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Instruction Set",
          item: siteConfig.routes.help.url,
        },
      ],
    },
  ];

  return (
    <div>
      <Typography variant="h4" component="h1" style={{ fontWeight: "800" }}>
        Instruction Set:
      </Typography>
      <br />
      
      <SEO
        title="8086 Instruction Set - Opcodes, Usage, and Examples"
        description="Learn the Intel 8086 assembly instruction set, syntax, interrupts, and opcode behavior for this free 8086 emulator and simulator, including emu8086-style workflows."
        canonical={siteConfig.routes.help.url}
        structuredData={structuredData}
      />
      <div id="sidebar">
        {instruction_set.map((instructiongroup) => (
          <Typography
            component="a"
            href={`#${groupId(instructiongroup.name)}`}
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: document.getElementById(groupId(instructiongroup.name)).offsetTop - 50,
                behavior: "smooth",
              });
            }}
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
            key={groupId(instructiongroup.name)}
            id={groupId(instructiongroup.name)}
          >
            <Typography variant="h5" component="h2" className={classes.instructionName}>
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
