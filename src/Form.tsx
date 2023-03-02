import react from "react";

import {type Form as TForm} from "./App";

export const Form = (props: TForm & {setForm: (key: keyof TForm, value: string) => void}) => {
    return (
        <div>
            <input type="text" value={props.name} onChange={(e) => props.setForm("name", e.target.value)} />
            <input type="number" value={props.minAge} onChange={(e) => props.setForm("minAge", e.target.value)} />
            <input type="number" value={props.maxAge} onChange={(e) => props.setForm("maxAge", e.target.value)} />
            <input type="text" value={props.keyword} onChange={(e) => props.setForm("keyword", e.target.value)} />
        </div>
    )
}