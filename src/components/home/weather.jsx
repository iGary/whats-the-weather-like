import React from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';

import './styles/weather.css';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      long: '',
      locationErr: '',
      weather: ''
    }

    this.getWeather = this.getWeather.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  componentDidMount() {
    if (this.state.lat === '') {
      this.fetchLocation();
    }
  }

  fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation);
    } else {
      this.setState({ locationErr: 'Geolocation is not supported by this browser.' })
    }
  }

  setLocation(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    this.setState({ lat: lat, long: long })
  }

  getWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=5ade581cfb2449c780a14308201104&q=${this.state.lat},${this.state.long}`;
    axios.get(url)
      .then(
        (resp) => {
          const city = resp.data.location.name;
          const temp = resp.data.current.temp_c;
          const condition = resp.data.current.condition.text;
          const isDay = resp.data.current.is_day;
          const returnStr = `${isDay ? 'Today' : 'Tonight'} in ${city} is ${condition} with a temperature of ${temp}`;
          this.setState({ weather: returnStr });
        },
        (err) => {
          console.log('Error occurred: ', err)
        }
      )
  }

  render() {
    return (
      <div>
        <Button
          id="get-weather"
          variant="primary"
          size="lg"
          onClick={this.getWeather}
        >
          Get Weather
        </Button>

        {
          this.state.weather !== '' && (
            <p id="location-value">Weather: {this.state.weather}</p>
          )
        }
        {
          this.state.locationErr !== '' && (
            <p id="location-error">{this.state.locationErr}</p>
          )
        }
      </div>
    );
  }
}

export default Weather