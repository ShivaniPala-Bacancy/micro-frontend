import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const App = () => (
  <div classNameName="mt-10 text-3xl mx-auto max-w-6xl">
    <div classNameName="text-3xl mx-auto max-w-6xl">
      <div className="text-center">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
          className="rounded-full w-32 mb-4 mx-auto"
          alt="Avatar"
        />
        <h5 className="text-xl font-medium leading-tight mb-2">John Doe</h5>
        <p className="text-gray-500">Web designer</p>
      </div>{" "}
    </div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
export default App;
