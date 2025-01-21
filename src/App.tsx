import { useState } from 'react'

import { USER_MOOD_DATA } from './mocks/data';
import { UserContext } from './contexts/UserContext';

import DailyInsightsSummary from './components/DailyInsightsSummary/DailyInsightsSummary';
import MoodTracker from './components/MoodTracker/MoodTracker';
import MoodTrends from './components/MoodTrends/MoodTrends';
import Navbar from './components/Navbar/Navbar';
import MoodAnalysis from './components/MoodAnalysis/MoodAnalysis';

import { TABS } from './constants/tabs';

import './App.css';

function App() {
  const [userMoods, setUserMoods] = useState(USER_MOOD_DATA);
  const [tab, setTab] = useState(TABS.dailyInsightsSummary);

  const providerValue = {
    userMoods,  
    setUserMoods,
  };

  return (
    <>
      <UserContext.Provider value={providerValue}>
        <h2 className="">Insightly</h2>

        <Navbar tab={tab} setTab={setTab} />

        <br />

        {tab === TABS.dailyInsightsSummary && <DailyInsightsSummary />}
        {tab === TABS.moodTracker && <MoodTracker />}
        {tab === TABS.moodAnalysis && <MoodAnalysis />}
        {tab === TABS.moodTrends && <MoodTrends />}
      </UserContext.Provider>
    </>
  )
}

export default App
