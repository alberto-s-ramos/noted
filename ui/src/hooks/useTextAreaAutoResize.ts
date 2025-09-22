import { useEffect, useLayoutEffect } from "react";
import type { RefObject } from "react";

const widthOffset = 27;

export const useTextAreaAutoResize = (
    textareaRef: RefObject<HTMLTextAreaElement | null>,
    sizerRef: RefObject<HTMLDivElement | null>,
    containerRef: RefObject<HTMLDivElement | null>,
    value: string,
    active: boolean
) => {

    const syncHeight = () => {
        const s = sizerRef.current;
        const ta = textareaRef.current;
        const container = containerRef.current;
        if (!s || !ta || !container) return;

        s.style.width = `${container.clientWidth - widthOffset}px`;
        s.textContent = value || " ";
        ta.style.height = `${s.offsetHeight}px`;
    };

    useLayoutEffect(() => {
        if (active) syncHeight();
    }, [value, active]);

    useEffect(() => {
        if (!active) return;
        const onResize = () => syncHeight();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [active, value]);
};
