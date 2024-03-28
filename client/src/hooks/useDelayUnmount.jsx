import { useState, useEffect } from "react";

export default function useDelayUnmount(isMounted, delay) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (isMounted && !shouldRender) {
            setShouldRender(true);
        } else if (!isMounted && shouldRender) {
            timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, delay);
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delay, shouldRender]);
    return shouldRender;
}