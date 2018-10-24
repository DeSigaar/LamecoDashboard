import React, {Component} from "react";
import Clock from "react-live-clock";

class ClockComponent extends Component {
	render () {
		return (
			<Clock className="clock" format={"HH:mm:ss"} ticking={true} timezone={"Europe/Amsterdam"} />
		);
	}
}

export default ClockComponent;