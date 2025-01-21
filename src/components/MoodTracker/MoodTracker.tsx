import { FormEvent, useState } from "react";
import { useUser } from "../../contexts/UserContext";

import { type Mood } from "../../types/Mood";

import styles from './MoodTracker.module.css';

const MoodTracker = () => {
  const { setUserMoods } = useUser();

  const [currentMood, setCurrentMood] = useState(-1);
  const [isMoodSubmitted, setIsMoodSubmitted] = useState(false);

  const onMoodSelect = (newMood: number) => {
    setCurrentMood(newMood);
  };

  const onMoodSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserMoods((prevState: Mood[]) => {
      return [
        ...prevState, 
        {
          id: prevState.length,
          date: new Date().toISOString(),
          mood: currentMood,
        }
      ];
    });

    setIsMoodSubmitted(true);
  };

  if (isMoodSubmitted) {
    return <div>Thanks for submitting your mood today.</div>
  }

  return (
    <form className={styles.moodForm} onSubmit={onMoodSubmit}>
      <label className={styles.label} htmlFor="mood">What is your mood today?</label>
      <select
        id={styles.moodSelect}
        name="mood"
        value={currentMood} 
        onChange={(event) => onMoodSelect(Number(event.target.value))}
      >
        <option disabled value={-1}></option>
        <option value={3}>Happy</option>
        <option value={2}>Neutral</option>
        <option value={1}>Sad</option>
      </select>

      <button 
        disabled={currentMood === -1} 
        type="submit">
        Submit your mood
      </button>
    </form>
  )
}

export default MoodTracker;
