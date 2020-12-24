import React, { useState, useEffect } from 'react';
import Home from '../pages/home';
import Compiler from '../pages/compiler';
import InstructionSet from '../pages/instructions';
import Navbar from './navbar';
import Footer from './footer';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

function RootRouter() {
  const [wasm, setWasm] = useState(null)
  useEffect(() => {
    setWasm(true) //replace true with wasm
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const invalidRoute = () => <Redirect to="/" />; //This will send user back to homepage
  return (
    <Router>
    <div id="page-container">
      <Navbar/>
       <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/compile" component={()=><Compiler wasm={wasm}/>} />
          <Route exact path="/help" component={InstructionSet} />
          <Route component={invalidRoute} />
        </Switch>
      </div>
    </div>
    <footer id="footer">
      <Footer/>
    </footer>
    </Router>
  );
}

export default RootRouter;