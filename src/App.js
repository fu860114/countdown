import React from "react";
import MyButton from "./components/MyButton";
import useCountdown from "./hooks/useCountdown";
import "./styles.css";

const DAY = 24 * 60 * 60 * 1000;

export default function App() {
  const { value, onStart, onStop, isActive } = useCountdown(
    Date.now() + DAY + DAY
  );

  return (
    <div className="App">
      <div className="example">
        <img src="/img/example.gif" alt="" />
      </div>
      <h1>{value}</h1>
      <button onClick={onStart} disabled={isActive}>
        start
      </button>
      <button onClick={onStop} disabled={!isActive}>
        stop
      </button>
      <MyButton
        aria-label="stop"
        data-hi-9527="9527"
        onClick={onStop}
        disabled={!isActive}
      >
        stop
      </MyButton>
    </div>
  );
}
