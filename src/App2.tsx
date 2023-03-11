import React from "react";

export const App2 = () => {
    const [message, setMessage] = React.useState("Hello World");
    // eslint-disable-next-line no-console
    console.log(`messageChanged: ${JSON.stringify(message)}`);
    React.useEffect(() => {
        console.log("is use effect message: ", message);
    }, [message]);
    return (
        (): true => {
            console.log("before return");
            return true;
        }
    )() && (
        <div>
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => setMessage((m) => `HelloWorld ${m}`)}>Reset</button>
        <Foo />
        </div>
    );
    };

function Foo() {
    console.log("foo");
    return (
        <div>
            <p>Foo</p>
        </div>
    )
}