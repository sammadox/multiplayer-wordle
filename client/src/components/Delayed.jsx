import { useState, useEffect } from "react";

function Delayed ({children, delay}) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return  () => {
            clearTimeout(timeoutId);
        }
    }, [delay])

    return isVisible ? children : <></>;
}

export default Delayed;