import { useEffect, useRef } from 'react';
import { ActivityGrid } from '../../components/ActivityGrid/ActivityGrid';
import { DailyCard } from '../../components/DailyCard/DailyCard';
import type { DailyEntry, DailyLog } from '../../data/types';
import { MainPage } from '../../layout/MainPage/MainPage';
import styles from './Feed.module.css';

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
    "Introduce New Demand Page Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "UI-Chat New Tools Feature",
    "Factory Portal v4.5.6 Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "Authentication Module",
    "Dashboard Redesign",
    "Payment Flow Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "Notification System",
    "API Integration Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
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

        const entries: DailyEntry[] = [];
        for (let j = 0; j < numEntries; j++) {
            const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
            const subject = activitySubjects[Math.floor(Math.random() * activitySubjects.length)];
            entries.push({ text: `${type}: ${subject}` });
        }

        logs.push({ date, entries });
    }

    return logs;
};


const mockActivityData = Array.from({ length: 364 }, () => {
    const random = Math.random();
    if (random < 0.8) return 0;
    return Math.floor(Math.random() * 7) + 1;
});

export const Feed = () => {
    const logs = mockDailyLogs(70);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollTop = 0;
        }
    }, []);

    return (
        <MainPage className={styles.feed}>
            <div className={styles.activityGridWrapper}>
                <ActivityGrid data={mockActivityData} />
            </div>
            <div className={styles.dailyLogs} ref={scrollContainerRef}>
                {logs.map((log, idx) => (
                    <DailyCard key={idx} dailyLog={log} />
                ))}
            </div>
        </MainPage>
    );
};
