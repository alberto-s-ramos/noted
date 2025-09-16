import { useState, useEffect, useRef, useMemo } from "react";
import { nanoid } from "nanoid";
import { ActivityGrid } from "../../components/ActivityGrid/ActivityGrid";
import { DailyCard } from "../../components/DailyCard/DailyCard";
import type { DailyLog } from "../../data/types";
import { MainPage } from "../../layout/MainPage/MainPage";
import styles from "./Feed.module.css";

const activityTypes = [
    "PR Open",
    "Review",
    "Deploy",
    "Meeting",
    "Refactor",
    "Bug Fix",
    "Write Doc",
    "Code Review",
];

const activitySubjects = [
    "Introduce New Demand Page Lorem ipsum dolor sit amet.",
    "UI-Chat New Tools Feature",
    "Factory Portal v4.5.6 Lorem ipsum dolor sit amet.",
    "Authentication Module",
    "Dashboard Redesign",
    "Payment Flow Lorem ipsum dolor sit amet.",
    "Notification System",
    "API Integration Lorem ipsum dolor sit amet.",
    "CI/CD Pipeline",
    "Testing Suite",
];

const mockDailyLogs = (days: number): DailyLog[] => {
    const logs: DailyLog[] = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const numEntries = Math.floor(Math.random() * 6);
        const entries = Array.from({ length: numEntries }, () => {
            const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
            const subject =
                activitySubjects[Math.floor(Math.random() * activitySubjects.length)];
            return {
                id: nanoid(),
                text: `${type}: ${subject}`,
            };
        });

        logs.push({ date, entries });
    }

    return logs;
};


export const Feed = () => {
    const [logs, setLogs] = useState<DailyLog[]>(() => mockDailyLogs(70));
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const daysInYear = 364;
    const today = new Date();

    const activityData = useMemo(() => {
        const data = Array(daysInYear).fill(0);

        logs.forEach((log) => {
            if (!(log.date instanceof Date)) return;

            const diffTime = today.getTime() - log.date.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const indexFromLeft = daysInYear - 1 - diffDays;

            if (indexFromLeft >= 0 && indexFromLeft < daysInYear) {
                data[indexFromLeft] += log.entries?.length ?? 0;
            }
        });

        return data;
    }, [logs, today, daysInYear]);

    useEffect(() => {
        scrollContainerRef.current?.scrollTo({ top: 0 });
    }, []);

    const handleAddEntry = (date: Date) => {
        setLogs((prev) =>
            prev.map((log) =>
                log.date.toDateString() === date.toDateString()
                    ? { ...log, entries: [...(log.entries ?? []), { id: nanoid(), text: "" }] }
                    : log
            )
        );
    };

    const handleUpdateEntry = (date: Date, id: string, newValue: string) => {
        setLogs((prev) =>
            prev.map((log) =>
                log.date.toDateString() === date.toDateString()
                    ? {
                        ...log,
                        entries: (log.entries ?? []).map((e) =>
                            e?.id === id ? { ...e, text: newValue } : e
                        ),
                    }
                    : log
            )
        );
    };

    const handleDeleteEntry = (date: Date, id: string) => {
        setLogs((prev) =>
            prev.map((log) =>
                log.date.toDateString() === date.toDateString()
                    ? { ...log, entries: log?.entries?.filter((e) => e.id !== id) }
                    : log
            )
        );
    };

    return (
        <MainPage className={styles.feed}>
            <div className={styles.activityGridWrapper}>
                <ActivityGrid data={activityData} />
            </div>
            <div className={styles.dailyLogs} ref={scrollContainerRef}>
                {logs
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map((log, idx) => (
                        <DailyCard
                            key={idx}
                            date={log.date}
                            entries={log.entries ?? []}
                            onAddEntry={handleAddEntry}
                            onUpdateEntry={handleUpdateEntry}
                            onDeleteEntry={handleDeleteEntry}
                        />
                    ))}
            </div>
        </MainPage>
    );
};
