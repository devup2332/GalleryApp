import React from "react";
import { ProgressProps } from "../../models/Props/ProgressProps";
import "./Progress.scss";

const Progress = ({ progress, progressRef }: ProgressProps) => {
  return (
    <div className="progress_container" ref={progressRef}>
      <div className="progress_bar_container">
        <h1 className="progress_title">Uploading</h1>
        <div className="bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
