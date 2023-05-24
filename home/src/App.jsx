import React, { useState } from "react";
import ReactDOM from "react-dom";
import Footer from "./footer";
import Header from "./header";
import About from "about/About";
import TermsandConditions from "termsAndConditions/TermsAndConditions";
import "./index.scss";

const App = () => {
  const [show, setShow] = useState("home");
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Header setShow={setShow} />
      {show === "home" && <div className="my-10">Home page content</div>}
      {show === "termsAndConditions" && <TermsandConditions />}
      {show === "about" && <About />}
      <Footer setShow={setShow} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
