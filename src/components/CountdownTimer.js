import React, { useState, useEffect } from 'react';
import { Button, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Timer } from 'easytimer.js';
import styles from '../styles/CountdownTimerStyles';

const useStyles = makeStyles(styles);

const CountdownTimer = () => {
  const classes = useStyles();
  const [time, setTime] = useState(7200);
  const [timer, setTimer] = useState(null);
  const [running, setRunning] = useState(false);
  const [editTime, setEditTime] = useState('02:00:00');

 useEffect(() => {
  if (running) {
    const newTimer = new Timer();
    newTimer.start({ countdown: true, startValues: { hours: Math.floor(time / 3600), minutes: Math.floor((time % 3600) / 60), seconds: time % 60 } });
    newTimer.addEventListener('secondsUpdated', () => {
      setTime(newTimer.getTotalTimeValues().seconds);
    });
    setTimer(newTimer);
  } else {
    if (timer) {
      timer.stop();
      setTimer(null);
    }
  }
  return () => {
    if (timer) {
      timer.stop();
      setTimer(null);
    }
  };
}, [running, time]);


  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setTime(7200); // Reset time to 2 hours
    setRunning(false);
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setEditTime(newTime);
    const [hoursStr, minutesStr, secondsStr] = newTime.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (!isNaN(totalSeconds)) {
      setTime(totalSeconds);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.root}>
          <Typography variant="h4" className={classes.timerText}>
            {formatTime(time)}
          </Typography>
          <div className={classes.controls}>
            <Button
              variant="contained"
              color={running ? 'secondary' : 'primary'}
              onClick={handleStartStop}
              className={classes.button}
            >
              {running ? 'Stop' : 'Start'}
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={handleReset}
              className={classes.button}
            >
              Reset
            </Button>
          </div>
          <div className={classes.edit}>
            <Typography variant="body1" className={classes.editLabel}>
              Edit Timer (HH:MM:SS):
            </Typography>
            <input
              type="text"
              value={editTime}
              onChange={handleTimeChange}
              className={classes.editInput}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CountdownTimer;
