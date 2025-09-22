import { format, isToday } from "date-fns";
import styles from "./DailyCard.module.css";
import { CardDate } from "../CardDate/CardDate";
import { Entry } from "../Entry/Entry";
import type { DailyEntry } from "../../data/types";


type DailyCardProps = {
    date: Date;
    entries: DailyEntry[];
    onAddEntry: (date: Date) => void;
    onUpdateEntry: (date: Date, id: string, newValue: string) => void;
    onDeleteEntry: (date: Date, id: string) => void;
};

export const DailyCard = ({
    date,
    entries,
    onAddEntry,
    onUpdateEntry,
    onDeleteEntry,
}: DailyCardProps) => {
    const noEntriesMessage = isToday(date)
        ? "No entries logged today"
        : `No entries logged on ${format(date, "MMM d")}`;

    return (
        <div className={styles.dailyCard}>
            <CardDate date={date} />

            <div className={styles.dailyEntries}>
                {entries.length === 0 && (
                    <span className={styles.noEntries}>{noEntriesMessage}</span>
                )}
                {entries.map((entry) => (
                    <Entry
                        key={entry.id}
                        initialLog={entry.text}
                        placeholder="New Entry"
                        onUpdate={(newValue) => onUpdateEntry(date, entry.id, newValue)}
                        onDelete={() => onDeleteEntry(date, entry.id)}
                    />
                ))}

                <button className={styles.addEntryButton} onClick={() => onAddEntry(date)}>
                    + Add Entry
                </button>
            </div>
        </div>
    );
};
