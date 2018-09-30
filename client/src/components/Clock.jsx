import React from 'react';
import Clock from 'react-live-clock'

class ClockComponent extends React.Component {
	render () {
		return (
			<Clock className='klokje' format={'HH:mm:ss'} ticking={true} timezone={'Europe/Amsterdam'} />
		);
	}
}

export default ClockComponent;
