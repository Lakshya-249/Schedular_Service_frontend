export type schedule = {
  title: string;
  description: string;
  date_s: string[];
  time_Stamp: string;
  time: string;
  user_id: string;
  star: boolean;
  isReccuring: boolean;
  isSnoozed: boolean;
  frequency: string;
  days: number[];
  dates: number[];
  months: number[];
};

export const week: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type schedule3 = {
  id: string;
  title: string;
  star: boolean;
  time: string;
};

export type schedule2 = {
  id: string;
  title: string;
  description: string;
  time_Stamp: string;
  time: string;
  user_id: string;
  star: boolean;
  isReccuring: boolean;
  isSnoozed: boolean;
};
