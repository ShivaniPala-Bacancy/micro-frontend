import React from "react";
export default function Footer(props) {
  return (
    <footer className="w-full fixed bottom-0 p-5 bg-blue-500 text-white  font-bold">
      <div className="flex justify-around">
        <p
          className="text-xs"
          onClick={() => {
            props.setShow("termsAndConditions");
          }}
        >
          Terms and Conditions
        </p>
        <p
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
            props.setShow("inventorySearch");
          }}
        >
          Inventory search
        </p>
      </div>
    </footer>
  );
}
