import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCaractor, setIsCaractor] = useState(false);
  const [password, setPassword] = useState("");

  const passWordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) str += "0123456789";
    if (isCaractor) str += "!@#$%^&*?><:";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumber, isCaractor, setPassword]);

  // useref
  const passwordref = useRef(null)


  const copyPassToClipBoeard = useCallback(() => {
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0, 100)
  window.navigator.clipboard.writeText(password)
}, [password])

  useEffect(()=>{passWordGenrator()}, [length, isNumber, isCaractor, passWordGenrator ])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-600 bg-gray-700">
        <h1 className="text-white text-center mb-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none px-3 w-full py-1 bg-white"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button  onClick={copyPassToClipBoeard} className="outline-none  bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              id="numberinput"
              onChange={() => {
                setIsNumber((prev) => {
                  !prev;
                });
              }}
            />
            <label htmlFor="numberinput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isCaractor}
              id="Charinput"
              onChange={() => {
                setIsCaractor((prev) => {
                  !prev;
                });
              }}
            />
            <label htmlFor="Charinput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
