import React from "react";

export default function Footer(props) {
  return (
    <footer className="w-full fixed bottom-0 p-5 bg-blue-500 text-white  font-bold">
      <div className="flex justify-around">
        <button
          className="text-xs"
          onClick={() => {
            console.log("clicked");
            props.setShow("termsAndConditions");
          }}
        >
          Terms and Conditions
        </button>
        {/* <p
          className="text-xs"
          onClick={() => {
            props.setShow("about");
          }}
        >
          About us
        </p>{" "}
        <p
          className="text-xs"
          onClick={() => {
            console.log("hey");
          }}
        >
          Inventory search
        </p> */}
      </div>
    </footer>
  );
}
