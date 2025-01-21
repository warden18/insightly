import { Mood } from "../../types/Mood";

export enum ChartKeysEnum {
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
};

export type ChartKeys = "daily" | "weekly" | "monthly";

export type ChartData = {
  [key in ChartKeys]: {
    labels: string[];
    datasets: [
      {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }
    ]
  }
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Mood scores for the past 7 days',
    },
  },
};

export const generateChartData = (userMoods: Mood[]): ChartData => {
  const { weeks, months } = splitDates(userMoods);

  const weekLabels = Object.keys(weeks);
  const weekData = weekLabels.map((key) => (weeks[key].value / weeks[key].length));

  const monthLabels = Object.keys(months);
  const monthData = monthLabels.map((key) => (months[key].value / months[key].length));

  return {
    daily: {
      labels: userMoods.slice(-7).map((mood) => new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
      }).format(new Date(mood.date))),
      datasets: [
        {
          label: 'Mood chart',
          data: userMoods.slice(-7).map(({ mood }) => mood),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
    weekly: {
      labels: weekLabels,
      datasets: [
        {
          label: 'Mood chart',
          data: weekData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
    monthly: {
      labels: monthLabels,
      datasets: [
        {
          label: 'Mood chart',
          data: monthData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }
  }
};

export function splitDates(userMoods: Mood[]) {
  const weeks: Record<string, Record<string, number>> = {};
  const months: Record<string, Record<string, number>> = {};

  userMoods.forEach(({ date, mood }) => {
    const dateObj = new Date(date);

    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth();
    const startOfYear = new Date(Date.UTC(year, 0, 1));
    const dayOfYear = Math.floor((dateObj.valueOf() - startOfYear.valueOf()) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((dayOfYear + startOfYear.getUTCDay() + 1) / 7);

    const weekKey = `${year} Week-${week}`;
    if (!weeks[weekKey]) {
      weeks[weekKey] = { value: 0, length: 1 };
    }
    
    weeks[weekKey] = { value: weeks[weekKey].value + mood, length: ++weeks[weekKey].length };

    const monthKey = `${year}-${month + 1}`;
    if (!months[monthKey]) {
      months[monthKey] = { value: 0, length: 1 };
    }

    months[monthKey] = { value: months[monthKey].value + mood, length: ++months[monthKey].length };
  });

  return { weeks, months };
}