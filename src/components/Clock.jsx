import React, { useState, useEffect } from 'react';
import moment from 'moment';

import '../styles/clock.scss';

export const Clock = () => {
  const [dateTime, setDateTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='current dm-sans'>
        <div className='time-wrapper dm-sans'>
            <span className='time'>{dateTime.format('HH:mm')}</span> 
            <span className='type'>{dateTime.format('A')}</span>
        </div>
        <span className='day dm-sans'>{dateTime.format('dddd')}, {dateTime.format('D MMMM YYYY')}</span>
    </div>
  );
}