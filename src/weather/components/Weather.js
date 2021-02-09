import React from 'react';
import styled from 'styled-components';
import SearchCity from './SearchCity';
import Result from './Result';
import NotFound from './NotFound';
import '../index.sass'

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 104px);
  width: 100%;
  position: relative;
`;

class WeatherApp extends React.Component {
  state = {
    value: localStorage.getItem('city') || '',
    weatherInfo: null,
    error: false,
  };

  componentDidMount() {
    if (localStorage.getItem('city') !== '' && localStorage.getItem('city') !== null) {
      this.handleSearchCity();
    }
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearchCity = (e) => {
    if (e) e.preventDefault();

    const { value } = this.state;
    // if (!value) {
    //   return;
    // }

    const APIkey = process.env.REACT_APP_API_KEY;
    
    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=imperial`;
    
    fetch(weather)
      .then(async (res) => {
        if (res.ok) {
          return await res.json();
        }
        throw Error(res.statusText);
      })
      .then((data) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

        const weatherInfo = {
          city: data.name,
          country: data.sys.country,
          date,
          description: data.weather[0].description,
          main: data.weather[0].main,
          temp: data.main.temp,
          highestTemp: data.main.temp_max,
          lowestTemp: data.main.temp_min,
          sunrise,
          sunset,
          clouds: data.clouds.all,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        };
        this.setState({
          weatherInfo,
          error: false,
        });
        
        localStorage.setItem('city', data.name)
        this.props.fetchSentimentData(data.name)
      })
      .catch(error => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };

  render() {
    const { value, weatherInfo, error } = this.state;
    return (
      <div className="weather-app">
        <WeatherWrapper>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </div>
    );
  }
}

export default WeatherApp;
