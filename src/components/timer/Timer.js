import React, { useState, useEffect } from "react";
import "./Timer.css";
function Timer() {
  const [change, setChange] = useState(false);
  const [timeSince, setTimeSince] = useState({
    years: Math.floor(Math.random() * 10), // Initial random values
    months: Math.floor(Math.random() * 12),
    days: Math.floor(Math.random() * 30),
    hours: Math.floor(Math.random() * 24),
    minutes: Math.floor(Math.random() * 60),
    seconds: Math.floor(Math.random() * 60),
  });

  useEffect(() => {
    const startTime = new Date(2018, 0, 24);
    let spamInterval;
    spamInterval = setInterval(() => {
      setTimeSince({
        years: Math.floor(Math.random() * 3),
        months: Math.floor(Math.random() * 12),
        days: Math.floor(Math.random() * 30),
        hours: Math.floor(Math.random() * 24),
        minutes: Math.floor(Math.random() * 60),
        seconds: Math.floor(Math.random() * 60),
      });
    }, 50);

    setTimeout(() => {
      clearInterval(spamInterval);
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
        changeColor();
      }, 1000);
    }, 2000);

    return () => clearInterval(spamInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeColor = () => {
    if (!change) {

      const timeElements = document.querySelectorAll(".timer-container p");
      if (timeElements.length > 0 && !timeElements[0].style.color) {

        if (!timeElements[0].style.color) {
          timeElements.forEach((element, index) => {
            element.style.color = "green"; // Change color to green
            element.style.animation = `wave 0.7s ease forwards ${(index + 1) * 0.1
              }s`; // Apply wave animation with delay based on index
          });
          setTimeout(() => {
            timeElements.forEach((element) => {
              element.style.color = "#333"; // Change color back to white
              element.style.animation = "none"; // Remove animation
            });
            setChange(true); // Set change to true after color change
          }, 1000);
        }
      }
    }
  };

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
 