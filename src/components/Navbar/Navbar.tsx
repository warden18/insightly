import styles from './Navbar.module.css';

interface NavbarProps {
  tab: string;
  setTab: (newTab: string) => void;
};

export default function Navbar({ tab, setTab }: NavbarProps) {
  const getActiveTabClassName = (currentTab: string) => tab === currentTab ? 'active' : '';

  return (
    <ul className={styles.navbar}>
      <li onClick={() => setTab('dailyInsightsSummary')}>
        <a className={`link ${getActiveTabClassName('dailyInsightsSummary')}`}>Daily Insights Summary</a>
      </li>
      |
      <li onClick={() => setTab('moodTracker')}>
        <a className={`link ${getActiveTabClassName('moodTracker')}`}>Mood Tracker</a>
      </li>
      |
      <li onClick={() => setTab('moodAnalysis')}>
        <a className={`link ${getActiveTabClassName('moodAnalysis')}`}>Mood Analysis</a>
      </li>
      |
      <li onClick={() => setTab('moodTrends')}>
        <a className={`link ${getActiveTabClassName('moodTrends')}`}>Mood Trends</a>
      </li>
    </ul>
  )
};