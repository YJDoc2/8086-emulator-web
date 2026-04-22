import React, { useState, useEffect } from "react";
import Home from "../pages/home";
import Compiler from "../pages/compiler";
import InstructionSet from "../pages/instructions";
import Navbar from "./navbar";
import Footer from "./footer";
import { siteConfig } from "../siteConfig";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { loadEmulator8086Wasm } from "../loadEmulator8086Wasm";

function RootRouter() {
  const [wasm, setWasm] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const wasm = await loadEmulator8086Wasm();
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
  const invalidRoute = () => <Redirect to={siteConfig.routes.home.path} />; //This will send user back to homepage

  return (
    <Router>
      <div id="page-container">
        <Navbar />
        <main className="App">
          <Switch>
            <Route exact path={siteConfig.routes.home.path} component={Home} />
            <Route
              exact
              path={siteConfig.routes.compiler.path}
              component={() => <Compiler wasm={wasm} />}
            />
            <Route
              exact
              path={siteConfig.routes.help.path}
              component={InstructionSet}
            />
            <Route component={invalidRoute} />
          </Switch>
        </main>
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </Router>
  );
}

export default RootRouter;
