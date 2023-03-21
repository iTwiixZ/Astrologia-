import React, { useState, useEffect } from 'react';
import { Paper, Select, Typography } from '@mui/material';
import './styles/index.scss';
import axios from 'axios';

function App() {
  const [astroData, setAstroData] = useState({});
  const [sign, setSign] = useState('aries');
  const [day, setDay] = useState('today');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`);
      setAstroData(response.data);
    };
    fetchData();
  }, [sign, day]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSign = e.target.elements.sign.value;
    const selectedDay = e.target.elements.day.value;
    setSign(selectedSign);
    setDay(selectedDay);
  };

  return (
    <div className="main_container">
      <Paper elevation={3}>
        <Typography variant="h3" sx={{ padding: '20px' }}>
          Your astrology report according to your sign
        </Typography>
      </Paper>
      <form onSubmit={handleSubmit}>
        <Select
          native
          name="sign"
          value={sign}
          onChange={(e) => setSign(e.target.value)}
          sx={{ backgroundColor: 'white', marginTop: '10px', marginRight: '10px' }}
        >
          <option value="aries">Aries</option>
          <option value="taurus">Taurus</option>
          <option value="gemini">Gemini</option>
          <option value="cancer">Cancer</option>
          <option value="leo">Leo</option>
          <option value="virgo">Virgo</option>
          <option value="libra">Libra</option>
          <option value="scorpio">Scorpio</option>
          <option value="sagittarius">Sagittarius</option>
          <option value="capricorn">Capricorn</option>
          <option value="aquarius">Aquarius</option>
          <option value="pisces">Pisces</option>


        </Select>
        <Select
          native
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          sx={{ backgroundColor: 'white', marginTop: '10px' }}
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="yesterday">Yesterday</option>
        </Select>

      </form>
      <div className='card'>
        <Typography paragraph>Current Date: {astroData.current_date}</Typography>
        <Typography paragraph>Compatibility: {astroData.compatibility}</Typography>
        <Typography paragraph>Lucky Number: {astroData.lucky_number}</Typography>
        <Typography paragraph>Lucky Time: {astroData.lucky_time}</Typography>
        <Typography paragraph>Color: {astroData.color}</Typography>
        <Typography paragraph>Date Range: {astroData.date_range}</Typography>
        <Typography paragraph>Mood: {astroData.mood}</Typography>
        <Typography paragraph>Description: {astroData.description}</Typography>
      </div>
    </div>
  );
}

export default App;
