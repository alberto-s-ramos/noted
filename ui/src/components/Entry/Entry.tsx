import { useState, useRef } from "react";
import classNames from "classnames";
import styles from "./Entry.module.css";
import { useTextAreaAutoResize } from "../../hooks/useTextAreaAutoResize";
import { useSelectTextOnFocus } from "../../hooks/useSelectTextOnFocus";


type EntryProps = {
    initialLog?: string;
    placeholder?: string;
    onDelete?: () => void;
    onUpdate?: (newValue: string) => void;
};

export const Entry = ({
    initialLog = "",
    placeholder = "",
    onDelete,
    onUpdate,
}: EntryProps) => {
    const [entry, setEntry] = useState(initialLog);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const sizerRef = useRef<HTMLDivElement>(null);

    useTextAreaAutoResize(textareaRef, sizerRef, containerRef, entry, isEditing);
    useSelectTextOnFocus(textareaRef, isEditing);

    const handleDoubleClick = () => setIsEditing(true);

    const commitChange = () => {
        const trimmed = entry.trim();
        if (trimmed === "") {
            onDelete?.();
        } else {
            onUpdate?.(trimmed);
        }
        setIsEditing(false);
    };

    const handleEditSave = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            commitChange();
        }
    };

    return (
        <div
            ref={containerRef}
            className={classNames(styles.entry, { [styles.hovered]: isHovering })}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onDoubleClick={handleDoubleClick}
        >
            <div
                ref={sizerRef}
                aria-hidden
                className={classNames(styles.text, styles.sizer)}
            />

            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    value={entry}
                    autoFocus
                    onChange={(e) => setEntry(e.target.value)}
                    onBlur={commitChange}
                    onKeyDown={handleEditSave}
                />
            ) : (
                <span
                    className={styles.text}
                    style={{ opacity: entry ? 1 : 0.5 }}
                >
                    {entry || placeholder}
                </span>
            )}

        </div>
    );
};
