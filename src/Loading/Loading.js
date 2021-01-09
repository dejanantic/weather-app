import React, { useState, useEffect, useRef } from "react";
import "./Loading.css";

export default function Loading({ loadingMessage = "Loading", speed = 600 }) {
  const initialMessage = loadingMessage;
  const [message, setMessage] = useState(initialMessage);
  const id = useRef();

  useEffect(() => {
    id.current = window.setInterval(() => {
      console.log("interval running");
      message === `${initialMessage}...`
        ? setMessage(initialMessage)
        : setMessage((message) => `${message}.`);
    }, speed);

    return () => window.clearInterval(id.current);
  }, [message, initialMessage, speed]);

  return <div className="loading">{message}</div>;
}
