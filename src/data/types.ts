export type DailyLog = {
    date: Date;
    entries?: DailyEntry[];
}

export type DailyEntry = {
    id: string;
    text?: string;
    label?: any
}