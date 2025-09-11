import type { FC } from "react";
import styles from "./ActivityGrid.module.css";

type ActivityGridProps = {
    data: number[];
    columns?: number;
};

export const ActivityGrid: FC<ActivityGridProps> = ({ data, columns = 52 }) => {
    const rows = 7;

    const grid: number[][] = Array.from({ length: rows }, () =>
        Array(columns).fill(0)
    );

    data.forEach((value, index) => {
        const col = Math.floor(index / rows);
        const row = index % rows;
        if (col < columns) {
            grid[row][col] = value;
        }
    });

    return (
        <div className={styles.grid}>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((value, colIndex) => (
                        <div
                            key={colIndex}
                            className={styles.cell}
                            style={{ backgroundColor: getColor(value) }}
                            title={`Activity: ${value}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};



const getColor = (value: number) => {
    if (value === 0) return "#151515";
    if (value <= 2) return "#fed7aa";
    if (value <= 4) return "#fd9234";
    if (value <= 6) return "#f97316";
    return "#c2410c";
};

