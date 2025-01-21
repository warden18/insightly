import { useMemo } from 'react';

import { useUser } from '../../contexts/UserContext';
import { generateRandomInteger } from '../../utils/generateRandomInteger';

const AVERAGE_MOOD_PERIOD = 7;

function DailyInsightsSummary() {
  const { userMoods } = useUser();

  const tasksCompleted = generateRandomInteger(0, 10);
  const dailyMoodScore = useMemo(() => {
    const sumOfMoods = userMoods.slice(-AVERAGE_MOOD_PERIOD).reduce((memo, item) => {
      memo += item.mood;
      return memo;
    }, 0);

    return (sumOfMoods / AVERAGE_MOOD_PERIOD);
  }, [userMoods]);

  const moodIcon = useMemo(() => {
    if (dailyMoodScore >= 2.5) {
      return String.fromCodePoint(parseInt('0x1f600', 16));
    } 

    if (dailyMoodScore < 2.5 && dailyMoodScore > 1.5) {
      return String.fromCodePoint(parseInt('0x1f610', 16)); 
    }

    return String.fromCodePoint(parseInt('0x1f614', 16));
  }, [dailyMoodScore]);

  return (
    <div>
      <div>&#9989; Tasks completed: {tasksCompleted}</div>
      <div>
        {moodIcon} Mood score: {dailyMoodScore.toFixed(2)}
      </div>
    </div>
  )
}

export default DailyInsightsSummary;
