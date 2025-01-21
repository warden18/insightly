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
import { useUser } from "../../contexts/UserContext";
import { generateChartData, chartOptions, type ChartData, ChartKeysEnum } from "./utils";

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
    <div className="flex flex-column items-center">
      <div className="flex flex-row gap-2" style={{ marginBottom: "10px", padding: "10px 20px" }}>
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

      <div className="flex items-center justify-center" style={{height: '40vh', width: '80vw' }}>
        <Line options={chartOptions} data={lineData[currentView as keyof ChartData]} />
      </div>
    </div>
  )
}

export default MoodTrends;
