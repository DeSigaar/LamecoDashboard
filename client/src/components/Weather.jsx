import React from 'react';
import ReactWeather from 'react-open-weather';
import './ReactWeather.css';

class Weather extends React.Component {
	render() {
		return (
			<ReactWeather
				className='weather'
				forecast="today"
				apikey="3086a287fb514f0e839112800180304"
				type="city"
				city="Ibiza"/>
		);
	}
}

export default Weather;
