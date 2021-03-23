import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Loading.css";

function Loading({ loadingMessage = "Loading", speed = 600 }) {
  const initialMessage = loadingMessage;
  const [message, setMessage] = useState(initialMessage);
  const id = useRef();

  useEffect(() => {
    id.current = window.setInterval(() => {
      message === `${initialMessage}...`
        ? setMessage(initialMessage)
        : setMessage((message) => `${message}.`);
    }, speed);

    return () => window.clearInterval(id.current);
  }, [message, initialMessage, speed]);

  return <div className="loading">{message}</div>;
}

Loading.propTypes = {
  loadingMessage: PropTypes.string,
  speed: PropTypes.number,
};

export default Loading;
