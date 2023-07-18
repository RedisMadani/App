import React, { useState } from "react";
import Timer from "./Timer";
import {
  Page,
  Layout,
  Button,
  Card,
  FormLayout,
  TextField,
  DatePicker,
} from "@shopify/polaris";
import { useCallback } from "react";
import timerSettings from "../../data/timerSettings";
import CreatedTimers from "./CreatedTimers";

export default function TimerConfig({ setPage, page }) {
  
  if (page === 'haveTimers') return <CreatedTimers setPage={setPage} page={page} />
  
  const [name, setName] = useState(timerSettings[0].name)
  const [hours, setHours] = useState(timerSettings[0].hours);
  const [minutes, setMinutes] = useState(timerSettings[0].minutes);
  const [seconds, setSeconds] = useState(timerSettings[0].seconds);


  const backButton = {
    content: 'Back',
    onAction: () => setPage("empty")
  }

  //save timer logic
  const primaryButton = (
    <Button primary onClick={() => saveTimerSettings()}>
      Save
    </Button>
  );

  function saveTimerSettings() {
    const newTimer = {
      id: dateTimeAfterChoosenTime,
      name,
      days,
      hours,
      minutes,
      seconds,
    }
    
    timerSettings.push(newTimer)

    setPage('haveTimers')
  }
  
  //datePicker states
  const date = new Date();

  const [{ month, year }, setDate] = useState({
    month: date.getMonth(),
    year: date.getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: date,
    end: new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000),
  });
  const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  //update values after input
  const handleNameChange = useCallback((newValue) => setName(newValue), [])
  const handleHoursChange = useCallback((newValue) => setHours(newValue), [])
  const handleMinutesChange = useCallback((newValue) => setMinutes(newValue), [])
  const handleSecondsChange = useCallback((newValue) => setSeconds(newValue), [])

  //here we setting timer
  const days =
    selectedDates.end.getDate() - selectedDates.start.getDate()
  
  const TIME_IN_MS =
    (((days * 24 + parseInt(hours))
    * 60 + parseInt(minutes)) * 60 + parseInt(seconds)) * 1000
    
  const NOW_IN_MS = new Date().getTime()

  const dateTimeAfterChoosenTime = TIME_IN_MS + NOW_IN_MS

  return (
    <Page 
      breadcrumbs={[backButton]}
      title="Your clocks is here!" 
      primaryAction={primaryButton}
      >
      <Layout>
        <Card sectioned>
          <FormLayout>
            <DatePicker
              year={year}
              month={month}
              disableDatesBefore={yesterday}
              selected={selectedDates}
              onChange={setSelectedDates}
              onMonthChange={handleMonthChange}
              allowRange
              multiMonth
            />
            <TextField
              label="Timer name"
              type="text"
              value={name}
              onChange={handleNameChange}
              autoComplete="off"
            />
            <TextField
              label="Hours"
              type="number"
              value={hours}
              onChange={handleHoursChange}
              autoComplete="off"
            />
            <TextField
              label="Minutes"
              type="number"
              value={minutes}
              onChange={handleMinutesChange}
              autoComplete="off"
            />
            <TextField
              label="Seconds"
              type="number"
              value={seconds}
              onChange={handleSecondsChange}
              autoComplete="off"
            />
          </FormLayout>
        </Card>
        <Card>
          <Timer targetDate={dateTimeAfterChoosenTime} name={name} />
        </Card>
      </Layout>
    </Page>
  );
}
