import styles from './Navbar.module.css';

import { TABS } from '../../constants/tabs';

interface NavbarProps {
  tab: string;
  setTab: (newTab: string) => void;
};

export default function Navbar({ tab, setTab }: NavbarProps) {
  const getActiveTabClassName = (currentTab: string) => tab === currentTab ? 'active' : '';

  return (
    <ul className={styles.navbar}>
      <li className={styles.tab} onClick={() => setTab(TABS.dailyInsightsSummary)}>
        <a className={`link ${getActiveTabClassName(TABS.dailyInsightsSummary)}`}>
          Daily Insights Summary
        </a>
      </li>
      <li className={styles.tab} onClick={() => setTab(TABS.moodTracker)}>
        <a className={`link ${getActiveTabClassName(TABS.moodTracker)}`}>Mood Tracker</a>
      </li>
      <li className={styles.tab} onClick={() => setTab(TABS.moodAnalysis)}>
        <a className={`link ${getActiveTabClassName(TABS.moodAnalysis)}`}>Mood Analysis</a>
      </li>
      <li className={styles.tab} onClick={() => setTab(TABS.moodTrends)}>
        <a className={`link ${getActiveTabClassName(TABS.moodTrends)}`}>Mood Trends</a>
      </li>
    </ul>
  )
};