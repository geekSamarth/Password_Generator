import { useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyText,setCopyText] =useState("copy");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,25);
    window.navigator.clipboard.writeText(password)
  },[password])
  const changeCopyText = (()=>{
     setCopyText("copied")
  })
  const copyTextChange = (()=>{
    setCopyText("copy")
  })
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-700 px-4 py-2 rounded-lg mx-4 text-orange-500 shadow-md">
        <h1 className="text-center text-3xl text-white mt-3 mb-6">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            className="outline-none w-full py-2 px-3 text-lg"
            placeholder="password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="bg-blue-600 text-white px-3 py-2 outline-none shrink-0 hover:bg-blue-500 transition-colors duration-200" onClick={copyPasswordToClipboard} onMouseDown={changeCopyText} onMouseOut={copyTextChange}>
            {copyText}
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-x-4 ">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              min={8}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={characterAllowed}
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
