import React, { useState } from 'react';
import Instruction from '../components/instruction';
import { instruction_set } from '../components/instructionSet';
//Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	sidebar: {
		position: 'fixed',
		verticalAlign: 'middle',
		paddingTop: 30,
		paddingBottom: 30,
	},
	navLink: {
		cursor: 'pointer',
		'&:hover': {
			color: "#f4c430",
		},
	},
	instructions: {
		borderLeft: '1px solid silver',
		paddingLeft: 20
	},
	instructionName: {
		marginBottom: 25
	}
}))

function InstructionSet() {
	const classes = useStyles()
	const matches = useMediaQuery('(max-width:1024px)');
	//JSON for instructions
	const [instructionList] = useState(instruction_set)
	return (
		<div>
			<br/>
			<Typography variant="h4"> Instruction Set:</Typography>
			<br/>
			<Grid container>
				<Grid item md={2} className={classes.sidebar} style={matches?{display:'none'}:null}>
					{instructionList.map(instructiongroup=>
						<Typography onClick={()=>window.scrollTo({top:document.getElementById(`instruction-${instructiongroup.name}`).offsetTop-50, behavior: 'smooth'})} variant="h6" key={`nav-${instructiongroup.name}`} gutterBottom className={classes.navLink}>{instructiongroup.name}</Typography>
					)}
				</Grid>
				<Grid item md={2} style={matches?{display:'none'}:null}>
				</Grid>
				<Grid item md={10} className={!matches?classes.instructions:null}>
					{instructionList.map(instructiongroup=>
						<div key={`instruction-${instructiongroup.name}`} id={`instruction-${instructiongroup.name}`}>
						<Typography variant="h5" className={classes.instructionName}>{instructiongroup.name}</Typography>
						{instructiongroup.instructions.map(instruction=>
						<Instruction 
							opcode={instruction.opcode} 
							name={instruction.name} 
							example={instruction.example} 
							description={instruction.description}
							key={instruction.name}
						/>)}
						<br/><br/>
						</div>
					)}
				</Grid>
			</Grid>
		</div>
	);
}

export default InstructionSet;