'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { TiWeatherWindyCloudy } from 'react-icons/ti';
import { FaCloudSun, FaSun, FaThermometerHalf } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';

const WeatherUI = () => {
  // input: api search value
  const [searchCity, setSearchCity] = useState('');

  // weather conditions
  const [temperature, setTemperature] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [humidity, setHumidity] = useState();
  const [visibility, setVisibility] = useState();
  const [windDirection, setWindDirection] = useState();
  const [windGust, setWindGust] = useState();

  // weather snapshot
  const [icon, setIcon] = useState();
  const [imgDescription, setImgDescription] = useState();

  // location geo details
  const [cityName, setCityName] = useState();
  const [localTime, setLocalTime] = useState();
  const [country, setCountry] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [region, setRegion] = useState();
  const [timezone, setTimezone] = useState();

  // error message for invalid city
  const [error, setError] = useState();

  async function weather() {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchCity}`
      );

      const data = await response.json();

      if (data.error) {
        setError('No matching city found, try again.');
        setTemperature('');
        setWindSpeed('');
        setHumidity('');
        setVisibility('');
        setWindDirection('');
        setIcon('');
        setImgDescription('');
        setCityName('');
        setLocalTime('');
        setCountry('');
        setLongitude('');
        setLatitude('');
        setRegion('');
        setTimezone('');
        setWindGust('');
        return;
      }

      //removing error message from UI, input is valid at this point in code
      setError('');

      setTemperature(data.current.temp_f);
      setWindSpeed(data.current.wind_mph);
      setHumidity(data.current.humidity);
      setVisibility(data.current.vis_miles);
      setWindDirection(data.current.wind_dir);
      setWindGust(data.current.gust_mph);

      setIcon(data.current.condition.icon);
      setImgDescription(data.current.condition.text);

      // location information:
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };
        return date.toLocaleString('en-US', options);
      };

      setCityName(data.location.name);
      const localTime = data.location.localtime;
      const formattedDate = formatDate(localTime);
      setLocalTime(formattedDate);
      setCountry(data.location.country);
      setLongitude(data.location.lon);
      setLatitude(data.location.lat);
      setRegion(data.location.region);
      setTimezone(data.location.tz_id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col app-background text-[#fff] sm:max-w-4xl w-full sm:min-h-[400px] p-4 sm:p-8 rounded-lg ">
        <div>
          <div className="flex flex-row items-center justify-center gap-2">
            <TiWeatherWindyCloudy size={38} color="#FFCD00" />
            <div></div>
            <h2 className="text-center font-bold text-2xl">QuickCast</h2>
          </div>
          <p className="text-center text-gray-100 font-semibold">
            Your Instant Weather Update
          </p>
        </div>

        <div className="flex flex-col sm:flex sm:flex-row sm:justify-center py-4 mb-1 gap-4 mx-auto items-center w-full sm:w-4/5 md:w-3/5">
          <div className="flex-col flex gap-2 text-center sm:flex sm:flex-row sm:items-center w-full">
            <label className="text-nowrap font-semibold" htmlFor="city">
              Enter City
            </label>

            <input
              className="p-2 w-full outline-none sm:ml-3 rounded-md text-[#000] flex-grow font-roboto"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  weather();
                }
              }}
            />
          </div>

          <button
            className="bg-[#FFCD00] w-full sm:w-fit text-nowrap self-center py-2 px-4 rounded-lg text-[#19014E] font-bold  hover:bg-[#e6b700] transition-colors ease-in-out"
            onClick={weather}
          >
            Get Weather
          </button>
        </div>
        {error && (
          <div className="flex items-center justify-center text-[#FF6B6B] text-center gap-1 font-roboto mb-3">
            {error}
            <MdError size={20} />
          </div>
        )}
        <div className="pb-4 sm:hidden">
          <h3 className="text-center font-roboto">{localTime}</h3>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex flex-row items-center gap-2 border-b-2 pb-1">
              <h2 className="font-bold">Weather Conditions</h2>
              <FaThermometerHalf size={24} color="#FFCD00" />
            </div>

            <div className="flex flex-col gap-1 py-1 font-roboto  ">
              <div className="flex flex-row justify-between">
                <p>Temperature &#8457; </p>
                {temperature}
              </div>
              <div className="flex flex-row justify-between">
                <p>WindSpeed</p>
                {windSpeed ? `${windSpeed} mph ` : ''}
              </div>
              <div className="flex flex-row justify-between">
                <p>Humidity</p>
                {humidity}
              </div>
              <div className="flex flex-row justify-between">
                <p>Visibility</p>
                {visibility}
              </div>
              <div className="flex flex-row justify-between">
                <p>Wind Direction</p>
                {windDirection}
              </div>
              <div className="flex flex-row justify-between">
                <p>Wind Gust</p>
                {windGust}
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-row items-center gap-2 border-b-2 pb-1">
              <h2 className="font-bold">Weather Snapshot</h2>
              <FaCloudSun size={24} color="#FFCD00" />
            </div>
            <div className="flex w-full h-full items-start justify-center">
              {icon ? (
                <>
                  <div className="flex flex-col items-center justify-center font-roboto pt-2 sm:pt-0">
                    <Image
                      width={120}
                      height={120}
                      src={`https:${icon}`}
                      alt="weather drawing"
                    />
                    <div className="font-bold text-3xl">
                      {temperature} &#8457;
                    </div>
                    <p>{imgDescription}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full min-h-[130px]">
                  <TiWeatherWindyCloudy size={100} />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-row items-center gap-2 border-b-2 pb-1">
              <h2 className="font-bold">Location Geo Details</h2>
              <FaLocationDot size={24} color="#FFCD00" />
            </div>

            <div className="hidden sm:block flex flex-col gap-1 py-1 font-roboto">
              <h3>City: {cityName}</h3>
              <p>Region: {region}</p>
              <h3>Country: {country}</h3>
              <p>TimeZone: {timezone}</p>
              <h3>Longitude: {longitude}</h3>
              <h3>Latitude: {latitude}</h3>
            </div>

            <div className="sm:hidden flex flex-col gap-1 py-1 font-roboto">
              <div className="flex flex-row justify-between">
                <p>City</p>
                {cityName}
              </div>
              <div className="flex flex-row justify-between">
                <p>Region</p>
                {region}
              </div>
              <div className="flex flex-row justify-between">
                <p>Country</p>
                {country}
              </div>
              <div className="flex flex-row justify-between">
                <p>Time Zone</p>
                {timezone}
              </div>
              <div className="flex flex-row justify-between">
                <p>Longitude</p>
                {longitude}
              </div>
              <div className="flex flex-row justify-between">
                <p>Latitude</p>
                {latitude}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 hidden sm:block">
          <h3 className="text-center font-roboto">{localTime}</h3>
        </div>
      </div>
    </>
  );
};

export default WeatherUI;
