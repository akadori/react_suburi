import { useEffect, useState } from "react";

export type CounterButtonProps = {
    count: number;
    onClick: () => void;
}

const GoodCounterButton = (({ count, onClick }: CounterButtonProps) => {
    console.log("GoodCounterButton")
    const counterLabel = `${count}回クリックしました`
    return <button value={onClick.toString()} onClick={onClick}>{counterLabel}</button>
})
const BadCounterButton = (({ count, onClick }: CounterButtonProps) => {
    console.log("BadCounterButton")
    const [counterLabel, setCounterLabel] = useState(`${count}回クリックしました`);
    useEffect(() => {
        setCounterLabel(`${count}回クリックしました`)
    }, [count])
    return <button value={onClick.toString()} onClick={onClick}>{counterLabel}</button>
})

export const Counter = () => {

    const [count, setCount] = useState(0)
    return <>
        <label>Good</label>
        <GoodCounterButton count={count} onClick={() => setCount(count + 1)} />
        <label>Bad</label>
        <BadCounterButton count={count} onClick={() => setCount(count + 1)} /></>
}