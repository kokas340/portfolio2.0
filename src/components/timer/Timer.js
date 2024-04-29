import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [timeSince, setTimeSince] = useState({
    years: Math.floor(Math.random() * 10), // Initial random values
    months: Math.floor(Math.random() * 12),
    days: Math.floor(Math.random() * 30),
    hours: Math.floor(Math.random() * 24),
    minutes: Math.floor(Math.random() * 60),
    seconds: Math.floor(Math.random() * 60),
  });

  useEffect(() => {
    const startTime = new Date(2018, 0, 24); // January 24, 2018
    let spamInterval;

    // Start spamming random numbers
    spamInterval = setInterval(() => {
      setTimeSince({
        years: Math.floor(Math.random() * 5),
        months: Math.floor(Math.random() * 12),
        days: Math.floor(Math.random() * 30),
        hours: Math.floor(Math.random() * 24),
        minutes: Math.floor(Math.random() * 60),
        seconds: Math.floor(Math.random() * 60),
      });
    }, 50);

    // Switch to real date after 2 seconds
    setTimeout(() => {
      clearInterval(spamInterval); // Stop spamming
      setInterval(() => {
        const currentTime = new Date();
        const difference = Math.abs(currentTime - startTime);

        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 365)) /
            (1000 * 60 * 60 * 24 * 30.4375)
        );
        const days = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeSince({
          years,
          months,
          days,
          hours,
          minutes,
          seconds,
        });
      }, 1000);
    }, 2000);

    return () => clearInterval(spamInterval);
  }, []);

  return (
    <div className="timer-container">
      <p data-label="Years">
        <span>{timeSince.years}</span>
      </p>
      <p data-label="Months">
        <span>{timeSince.months}</span>
      </p>
      <p data-label="Days">
        <span>{timeSince.days}</span>
      </p>
      <p data-label="Hours">
        <span>{timeSince.hours}</span>
      </p>
      <p data-label="Minutes">
        <span>{timeSince.minutes}</span>
      </p>
      <p data-label="Seconds">
        <span>{timeSince.seconds}</span>
      </p>
    </div>
  );
}

export default Timer;
