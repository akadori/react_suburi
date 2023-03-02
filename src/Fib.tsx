import React from "react";

export const Fib = () => {
    const [number, setNumber] = React.useState(0);
    const [result, setResult] = React.useState(0);
    
    const fib = (n: number): number => {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    };
    
    return (
        <div>
        <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button onClick={() => setResult(fib(number))}>Calculate</button>
        <p>{result}</p>
        </div>
    );
    };