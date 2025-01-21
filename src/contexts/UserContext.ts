
import { createContext, useContext, Dispatch } from "react";
import { Moods } from "../mocks/data";

interface Mood {
  id: number;
  date: string;
  mood: Moods;
}

interface UserContext {
  userMoods: Mood[];
}

type UserContextType = {
  userMoods: Mood[];
  setUserMoods: Dispatch<(prevState: Mood[]) => Mood[]>;
}

export const UserContext = createContext<UserContextType>({
  userMoods: [],
  setUserMoods: () => {},
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext is used outside the provider');
  return context;
};
