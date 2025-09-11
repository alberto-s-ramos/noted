export type DailyLog = {
    date?: Date;
    entries?: DailyEntry[];
}

export type DailyEntry = {
    text?: string;
    label?: any
}