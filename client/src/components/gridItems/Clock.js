import React from "react";
import Clock from "react-live-clock";

const ClockComponent = () => {
  return (
    <Clock
      className="clock"
      format={"HH:mm:ss"}
      ticking={true}
      timezone={"Europe/Amsterdam"}
    />
  );
};

export default ClockComponent;
