import { ChartKeysEnum } from "../constants/chartKeys";

export type ChartKeys = ChartKeysEnum.daily | ChartKeysEnum.weekly | ChartKeysEnum.monthly;

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