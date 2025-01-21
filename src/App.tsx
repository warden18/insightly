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

const tabs = {
  [TABS.dailyInsightsSummary]: <DailyInsightsSummary />,
  [TABS.moodTracker]: <MoodTracker />,
  [TABS.moodAnalysis]: <MoodAnalysis />,
  [TABS.moodTrends]: <MoodTrends />,
};

const getCurrentTab = (tab: string) => {
  return tabs[tab] || <DailyInsightsSummary />;
}

function App() {
  const [userMoods, setUserMoods] = useState(USER_MOOD_DATA);
  const [tab, setTab] = useState(TABS.dailyInsightsSummary);

  const providerValue = {
    userMoods,  
    setUserMoods,
  };

  const currentTab = getCurrentTab(tab);

  return (
    <>
      <UserContext.Provider value={providerValue}>
        <h2 className="">Insightly</h2>

        <Navbar tab={tab} setTab={setTab} />

        <br />

        {currentTab}
      </UserContext.Provider>
    </>
  )
}

export default App
