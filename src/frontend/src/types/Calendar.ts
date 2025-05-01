export type DataEntry = {
  id: number;
  content: string;
  created_at: string;
  main_emotion: string;
};

export type CalendarDataType = {
  month_main_emotion?: string;
  data?: Record<string, DataEntry>;
};
