"use client";
import { useEffect, useRef, useState } from "react";
import MenubarSvg from "./MenubarSvg";
import MenuViewPopUp from "./MenuViewPopUp";

export default function MenuViewButton() {
  const [popUp, setPopUp] = useState(false);
  const popUpRef = useRef(null);
  const buttonRef = useRef(null);

  // Close the popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is not on the button or the popup, close the popup
      if (
        popUpRef.current &&
        !popUpRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setPopUp(false);
      }
    };

    // Adding event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-end">
        <button ref={buttonRef} onClick={() => setPopUp(!popUp)}>
          <MenubarSvg />
        </button>

        {popUp && (
          <div ref={popUpRef}>
            <MenuViewPopUp />
          </div>
        )}
      </div>
    </>
  );
}
