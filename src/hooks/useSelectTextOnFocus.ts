import { useEffect } from "react";
import type { RefObject } from "react";

export const useSelectTextOnFocus = (
    textareaRef: RefObject<HTMLTextAreaElement | null>,
    active: boolean
) => {
    useEffect(() => {
        if (active && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [active, textareaRef]);
};
