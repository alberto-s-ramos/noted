import { useState } from "react";
import type { DailyLog } from "../../data/types";
import { CardDate } from "../CardDate/CardDate";
import { Entry } from "../Entry/Entry";
import styles from "./DailyCard.module.css";
import { nanoid } from "nanoid";

type EntryItem = { id: string; text: string };

type DailyCardProps = {
    dailyLog?: DailyLog;
};

export const DailyCard = ({ dailyLog = {} }: DailyCardProps) => {
    const { date = new Date(), entries: initialEntries = [] } = dailyLog;

    const [entries, setEntries] = useState<EntryItem[]>(
        initialEntries.map((e) => ({ id: nanoid(), text: e.text ?? "" }))
    );

    const handleUpdateEntry = (id: string, newValue: string) => {
        setEntries((prev) =>
            prev.map((entry) =>
                entry.id === id ? { ...entry, text: newValue } : entry
            )
        );
    };

    const handleDeleteEntry = (id: string) => {
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
    };

    const handleAddEntry = () => {
        const id = nanoid();
        const newEntry: EntryItem = { id, text: "" };
        setEntries((prev) => [...prev, newEntry]);
    };

    return (
        <div className={styles.dailyCard}>
            <CardDate date={date} />

            <div className={styles.dailyEntries}>
                {entries.map((entry) => (
                    <Entry
                        key={entry.id}
                        initialLog={entry.text}
                        placeholder="New Entry"
                        onUpdate={(newValue) => handleUpdateEntry(entry.id, newValue)}
                        onDelete={() => handleDeleteEntry(entry.id)}
                    />
                ))}

                <button className={styles.addEntryButton} onClick={handleAddEntry}>
                    + Add Entry
                </button>
            </div>
        </div>
    );
};
