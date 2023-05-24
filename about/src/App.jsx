import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div className="text-3xl mx-auto max-w-6xl">
      <div class="text-center">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
          class="rounded-full w-32 mb-4 mx-auto"
          alt="Avatar"
        />
        <h5 class="text-xl font-medium leading-tight mb-2">John Doe</h5>
        <p class="text-gray-500">Web designer</p>
      </div>{" "}
    </div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
export default App;
