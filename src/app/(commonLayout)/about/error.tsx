"use client";

import { useEffect } from "react";

const AboutError = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;  
}) => {
    useEffect(() => {
        console.log(error);
    }, [error]);
    return (
        <div>
            <h1>Something went Wrong! Please Try Again</h1>
            <button onClick={reset}>Try Again</button>
        </div>
    );
};

export default AboutError;
