import styles from './CardDate.module.css';

type CardDateProps = {
    date: Date;
}

export const CardDate = ({ date }: CardDateProps) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        weekday: "short",
    });

    const parts = formatter.formatToParts(date);
    const weekday = parts.find(p => p.type === "weekday")?.value ?? "";
    const month = parts.find(p => p.type === "month")?.value ?? "";
    const day = parts.find(p => p.type === "day")?.value ?? "";

    return (
        <div className={styles.cardDate}>
            <h3 className={styles.month}>{month.toUpperCase()}</h3>
            <h1 className={styles.day}>{day}</h1>
            <h3 className={styles.weekday}>{weekday.toUpperCase()}</h3>
        </div>
    )

}