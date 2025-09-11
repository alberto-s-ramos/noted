import type { DailyLog } from '../../data/types';
import { CardDate } from '../CardDate/CardDate';
import styles from './DailyCard.module.css';

type DailyCardProps = {
    dailyLog?: DailyLog;
}

export const DailyCard = ({ dailyLog = {} }: DailyCardProps) => {
    const { date = new Date(), entries } = dailyLog;

    return (
        <div className={styles.dailyCard}>
            <CardDate date={date} />
            <ul className={styles.dailyEntries}>
                {entries?.map(({ text }) => <li>{text}</li>)}
                + Add entry
            </ul>
        </div >
    )
}