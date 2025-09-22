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
                            style={{
                                backgroundColor: getColor(value),
                                boxShadow:
                                    value > 0
                                        ? `0 0 0 ${getColor(value)}, 0 0 4px ${getColor(value)}`
                                        : "none",
                                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                                zIndex: value > 0 ? 2 : 1
                            }}
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
    if (value <= 1) return "#ffc1a1";
    if (value <= 2) return "#ff8c66";
    if (value <= 3) return "#ff704d";
    if (value <= 4) return "#ff4d26";
    if (value <= 5) return "#e63900";
    if (value <= 6) return "#b32400";
    if (value <= 7) return "#800000";
    return "#660000";
};
