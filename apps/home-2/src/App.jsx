import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom";
import Footer from "./footer";
// import Header from "./header";
const About = lazy(() => import("about/About"));
const InventorySearch = lazy(() => import("SnD/InventorySearch"));
// const Temp = lazy(() => import("./temp"));
const Header = lazy(() => import("./header"));
const TermsAndConditions = lazy(() =>
  import("termsAndConditions/TermsAndConditions")
);
import "./index.scss";

const App = () => {
  const [show, setShow] = useState("home");
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Suspense fallback={<div>Loading Terms and Conditions...</div>}>
        <Header setShow={setShow} />
      </Suspense>
      {show === "home" && <div className="my-10">Home page content</div>}
      {show === "termsAndConditions" && (
        <Suspense fallback={<div>Loading Terms and Conditions...</div>}>
          <TermsAndConditions />
        </Suspense>
      )}
      {show === "about" && (
        <Suspense fallback={<div>Loading About page...</div>}>
          <About />
        </Suspense>
      )}
      {show === "inventory" && (
        <Suspense fallback={<div>Loading About page...</div>}>
          <InventorySearch />
        </Suspense>
      )}
      <Footer setShow={setShow} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
