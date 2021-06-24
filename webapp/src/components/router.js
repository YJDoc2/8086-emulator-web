import React, { useState, useEffect } from "react";
import Home from "../pages/home";
import Compiler from "../pages/compiler";
import InstructionSet from "../pages/instructions";
import Navbar from "./navbar";
import Footer from "./footer";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

function RootRouter() {
  const [wasm, setWasm] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const wasm = await import("emulator_8086");
        setWasm(wasm);
      } catch (err) {
        console.error(
          `Unexpected error in loadWasm. [Message: ${err.message}]`
        );
        setWasm(false);
      }
    }
    load();
  }, []);
  const invalidRoute = () => <Redirect to="/8086-emulator-web/" />; //This will send user back to homepage

  return (
    <Router>
      <div id="page-container">
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/8086-emulator-web/" component={Home} />
            <Route
              exact
              path="/8086-emulator-web/compile"
              component={() => <Compiler wasm={wasm} />}
            />
            <Route
              exact
              path="/8086-emulator-web/help"
              component={InstructionSet}
            />
            <Route component={invalidRoute} />
          </Switch>
        </div>
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </Router>
  );
}

export default RootRouter;
