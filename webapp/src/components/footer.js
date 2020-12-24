import React, { useContext } from 'react';
import { CustomThemeContext } from '../themes/CustomThemeProvider';
// MuI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	footer: {
		position: 'relative',
	},
	footeras: {
		textDecoration: 'none',
		flexGrow: 1,
		fontSize: 19,
	},
	footerToolbar: {
		padding: 7,
		minHeight: 20,
		fontSize: 16,
		backgroundColor: '#0f0f0f',
		color: '#f0f0f0'
	}
}));


function Footer() {
	const classes = useStyles();
	const { currentTheme } = useContext(CustomThemeContext)
	return (
		<div className={classes.root} id="footer-small">
			<AppBar color="secondary" className={classes.footer} style={currentTheme==='dark'?{boxShadow: '0px -2px 6px -1px rgba(255,255,255,0.3), 0px -2px 5px 0px rgba(255,255,255,0.24), 0px -1px 10px 0px rgba(255,255,255,0.22)'}:{boxShadow: '0px -2px 6px -1px rgba(0,0,0,0.3), 0px -2px 5px 0px rgba(0,0,0,0.24), 0px -1px 10px 0px rgba(0,0,0,0.22)'}}>
				<Toolbar className={classes.footerToolbar}>
					<div align="center" className={classes.root}>&#169; Reserved | Developed by • Yashodhan Joshi • Yatharth Vyas • Tejas Ghone • Vatsal Soni</div>
				</Toolbar>
	      	</AppBar>
		</div>
	);
}

export default Footer;