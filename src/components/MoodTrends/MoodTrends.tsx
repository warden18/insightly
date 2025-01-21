import { useState } from "react";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { generateChartData, chartOptions } from "./utils";
import styles from './MoodTrends.module.css';

import { useUser } from "../../contexts/UserContext";

import { ChartKeysEnum } from "../../constants/chartKeys";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MoodTrends() {
  const { userMoods } = useUser();
  const [currentView, setCurrentView] = useState(ChartKeysEnum.daily);

  const lineData = generateChartData(userMoods);

  const toggleView = (newView: ChartKeysEnum) => {
    setCurrentView(newView);
  };  

  return (
    <div className={styles.moodTrendsWrapper}>
      <div className={styles.buttonsWrapper}>
        <button onClick={() => toggleView(ChartKeysEnum.daily)}>
          Daily
        </button>
        <button onClick={() => toggleView(ChartKeysEnum.weekly)}>
          Weekly
        </button>
        <button onClick={() => toggleView(ChartKeysEnum.monthly)}>
          Monthly
        </button>
      </div>

      <div className={styles.chartWrapper}>
        <Line options={chartOptions} data={lineData[currentView]} />
      </div>
    </div>
  )
}

export default MoodTrends;
