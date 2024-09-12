import { useEffect, useRef } from "react";

export function Location(props: { userName: string, x: number; y: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const color = useRef(getRandomColor());

    useEffect(() => {
        if (!ref.current) return;
        ref.current.style.transform = `translate(${props.x}px, ${props.y}px)`;
    }, [props.x, props.y])

    return (
        <div ref={ref} style={{ padding: '7px', backgroundColor: color.current, borderRadius: `0 50% 50% 50%`, border: '1px solid black', position: 'fixed', top: 0, left: 0 }}>
            <span>{props.userName}</span>
        </div>
    );
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}