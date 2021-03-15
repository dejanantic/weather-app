import React from "react";
import { getTimeStamp } from "../../../utils/helpers";
import "./LastUpdate.css";

export default function LastUpdate() {
  return (
    <div className="last-update">
      <span className="last-update__timestamp">Updated {getTimeStamp()}</span>
    </div>
  );
}