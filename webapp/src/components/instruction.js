import React, { useContext } from 'react';
import { CustomThemeContext } from '../themes/CustomThemeProvider';
// MuI Components
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { ReactComponent as ExpandMoreIcon } from '../images/ExpandIcon.svg';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: 5,
		marginBottom: 10,
	},
	opcode: {
		flexBasis: '10%',
		flexShrink: 0,
		fontSize: 20,
	},
	name: {
		flexBasis: '50%',
		flexShrink: 0,
		fontSize: 20,
	},
	example: {
		color: theme.palette.text.secondary,
		fontSize: 20,
		paddingLeft: 20
	},
	expandIcon: {
		paddingRight: 30
	},
	description: {
		fontWeight: 300,
		fontSize: 14
	}
}));


function Instruction(props) {
	const classes = useStyles();
	const matches = useMediaQuery('(max-width:500px)');
	const { currentTheme } = useContext(CustomThemeContext)
	return (
		<Accordion className={classes.main}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon style={currentTheme==="dark"?{filter: 'invert(1)'}:null} />}
				aria-controls={props.name}
				id={props.name}
				className={classes.expandIcon}
			>
				<Typography className={classes.opcode}>{props.opcode}</Typography>
				<Typography className={classes.name} style={matches?{display:'none'}:null}>{props.name}</Typography>
				<Typography className={classes.example}>
					{props.example}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography className={classes.description} style={{whiteSpace: "pre-line"}} component="div">
					{props.description}<br/><br/>
					{props.usage&&
						<div>
							Usage:<br/>
							<ul type="none">
								{props.usage.map(eg=>
									<li key={eg}>{eg}</li>
								)}
							</ul>
						</div>
					}
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
}

export default Instruction;