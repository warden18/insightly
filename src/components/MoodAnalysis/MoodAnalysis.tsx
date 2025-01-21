import { useMemo } from "react";
import { useUser } from '../../contexts/UserContext';

import styles from './MoodAnalysis.module.css';
import { isConsistentlyIncreasing, isTrendingDownwards } from "./utils";

const AVERAGE_MOOD_PERIOD = 7;

const MoodAnalysis = () => {
  const { userMoods } = useUser();
  
  const { message, className } = useMemo(() => {
    const lastWeekMoods = userMoods.slice(-AVERAGE_MOOD_PERIOD).map(({ mood }) => mood);

    if (isConsistentlyIncreasing(lastWeekMoods)) {
      return {
        message: 'Your mood has been improving over the past few days!',
        className: 'message--mood-increase',
      }
    }

    if (isTrendingDownwards(lastWeekMoods)) {
      return {
        message: 'It seems like you\'ve been feeling a bit down. Hang in there!',
        className: 'message--mood-decrease',
      }
    }

    return { 
      message: 'Your mood has been varying lately. Try finding balance!',
      className: 'message',
    }
  }, [userMoods])

  return (
    <div className={styles[className]}>{message}</div>
  )
};

export default MoodAnalysis;
