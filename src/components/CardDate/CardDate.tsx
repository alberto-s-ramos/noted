import styles from './CardDate.module.css';

type CardDateProps = {
    date: Date;
}

export const CardDate = ({ date }: CardDateProps) => {
    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        weekday: "short"
    };

    const formatted = date.toLocaleDateString(undefined, options);
    const parts = formatted.replace(',', '').split(' ');
    const [weekday, month, day] = parts;

    return (
        <div className={styles.cardDate}>
            <h3 className={styles.month}>{month.toUpperCase()}</h3>
            <h1 className={styles.day}>{day}</h1>
            <h3 className={styles.weekday}>{weekday.toUpperCase()}</h3>
        </div>
    )

}