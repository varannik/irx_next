import { useState, useEffect } from "react";

export function Updating() {
    const [content, setContent] = useState("Updating");

    useEffect(() => {
        const timer = setTimeout(() => {
            setContent("Reloading");
            window.location.reload();
        }, 60000); // 1 minute = 60,000 ms

        // Cleanup the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (

        <div className="mx-auto flex w-full max-w-lg items-center justify-center">
            <div
                className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]"
            >
                <div
                    className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#D64E52_20deg,transparent_120deg)]"
                ></div>
                <div className="relative z-20 flex w-full rounded-[0.60rem] bg-slate-900 p-2 justify-center items-center text-gray-100">
                    {content}
                </div>
            </div>
        </div>
    );
}