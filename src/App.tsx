import { useState } from "react";
import { Form as FormComponent } from "./Form";
import { Fib } from "./Fib";

export type Form = {
  name: string;
  minAge: number;
  maxAge: number;
  keyword: string;
}

function App() {
  const [form, setForm] = useState<Form>({
    name: "",
    minAge: 0,
    maxAge: 100,
    keyword: "",
  })

  const setFormFunc = (key: keyof Form, value: string) => {
    if(key === "minAge" || key === "maxAge") {
      setForm({
        ...form,
        [key]: parseInt(value)
      })
    }else
      setForm({
        ...form,
        [key]: value
      })
  }
  return (
    <div className="App">
      <FormComponent {...form} setForm={ setFormFunc}/>
      <Fib />
    </div>
  )
}

export default App
