import React from 'react'
// import ReactDOM from 'react-dom'
import {useReducer} from "./Fiber/react";
import ReactDOM from './Fiber/react-dom'
import './index.css'

function FunctionComponent(props) {
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //hook1

  return (
    <div className="border">
      <p>{props.name}</p>

      {/* <button
        onClick={() => {
          setCount1(count1 + 1);
        }}>
        {count1}
      </button> */}

      <button
        onClick={() => {
          setCount2();
        }}>
        {count2}
      </button>
    </div>
  );
}



const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="http://xyzhfw.top">hsueh</a>
    <FunctionComponent  name="函数"/>
  </div>
)

ReactDOM.createRoot(document.getElementById("root")).render(jsx)
// console.log("React", React.version); //sy-log