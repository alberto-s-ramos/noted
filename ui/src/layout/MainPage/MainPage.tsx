import type { ReactNode } from "react"
import styles from './MainPage.module.css';
import classNames from "classnames";

type MainPageProps = {
    children?: ReactNode;
    className?: string;
}

export const MainPage = ({ children, className }: MainPageProps) => {
    return (
        <main className={classNames(styles.mainPage, className)}>
            {children}
        </main>
    )
}