// bug ippai, nobishiro
import { useEffect, useMemo, useState } from "react";

export type Todo = {
    id: string;
    done: boolean;
    text: string;
    createdAt: Date;
};

export type Filter = {
    isDone?: boolean;
    hasText?: string;
    from?: Date;
    to?: Date;
}

export type TodosProps = {
    todos: Array<Todo>;
    filter: Filter;
}

const TodosComponent: React.FC<Pick<TodosProps, "todos"> & { toggleChecked: (i: number) => void; }> = (({ todos, toggleChecked }) => {
    return <ol>
        {todos.map((t, i) => <li key={t.id}><input type="checkbox" checked={t.done} onChange={() => toggleChecked(i)} />{t.text}</li>)}
    </ol>
});

export const GoodTodos: React.FC<TodosProps & { toggleChecked: (i: number) => void; }> = (({ todos, filter, toggleChecked }) => {
    const filteredTodos = useMemo<Array<Todo>>(() => {
        console.time("filter")
        const { isDone, hasText, from, to } = filter;
        const temp = todos.filter((t) => {
            if (typeof isDone !== "undefined") {
                if (t.done !== isDone) return false;
            }
            if (typeof hasText !== "undefined") {
                if (t.text.indexOf(hasText) === -1) return false;
            }
            if (from instanceof Date) {
                if (t.createdAt < from) return false;
            }
            if (to instanceof Date) {
                if (to < t.createdAt) return false;
            }
            return true;
        })
        console.timeEnd("filter")
        return temp;
    }, [todos, filter]);
    return <TodosComponent todos={filteredTodos} toggleChecked={toggleChecked} />
});
export const BadTodos: React.FC<TodosProps & { toggleChecked: (i: number) => void; }> = (({ todos, toggleChecked, filter }) => {
    const [filteredTodos, setFilteredTodos] = useState<Array<Todo>>([]);
    useEffect(() => {
        const { isDone, hasText, from, to } = filter;
        setFilteredTodos(todos.filter((t) => {
            if (typeof isDone !== "undefined") {
                if (t.done !== isDone) return false;
            }
            if (typeof hasText !== "undefined") {
                if (t.text.indexOf(hasText) === -1) return false;
            }
            if (from instanceof Date) {
                if (t.createdAt < from) return false;
            }
            if (to instanceof Date) {
                if (to < t.createdAt) return false;
            }
            return true;
        }))
    }, [todos, filter]);
    return <TodosComponent todos={filteredTodos} toggleChecked={toggleChecked} />
});

const Filteres = ({ filter, filterText, setFilterText }: { filter: Filter, filterText: string, setFilterText: (text: string) => void }) => {
    return <>
        <>
            <input type="checkbox" onChange={() => { }} checked={typeof filter.isDone !== "undefined"}></input>
            <label htmlFor="isDone">isDone</label>
            <input type="checkbox" onChange={() => { }} checked={typeof filter.hasText !== "undefined"}></input>
            <label htmlFor="hasText">hasText</label>:{filter.hasText}
            <input type="checkbox" onChange={() => { }} checked={typeof filter.from !== "undefined"}></input>
            <label htmlFor="from">from</label>:{filter.from}
            <input type="checkbox" onChange={() => { }} checked={typeof filter.to !== "undefined"}></input>
            <label htmlFor="to">to</label>:{filter.to}
        </>
        <div>
            <input type={"text"} value={filterText} onChange={(e) => setFilterText(e.currentTarget.value)} />
        </div>
    </>
}

const AddTask = ({ onClickButton }: { onClickButton: (text: string) => void }) => {
    const [task, setTask] = useState("");
    return <>
        <input type={"text"} value={task} onChange={(e) => setTask(e.currentTarget.value)} />
        <input type={"button"} value="add" onClick={() => {
            setTask("")
            onClickButton(task)
        }} />
    </>
}

export const TodoList = () => {
    const [filter, setFilter] = useState<Filter>({});
    const [filterText, setFilterText] = useState("");
    const handleSetFilter = (text: string) => {
        const filteres = text.split(" ");
        console.log(JSON.stringify(filteres));
        let filterAcc: Filter = {};
        filteres.map((f) => {
            const [key, value] = f.split(":");
            if (key === "isDone") {
                filterAcc.isDone = value === "true";
            }
            if (key === "hasText") {
                filterAcc.hasText === value;
            }
            if (key === "from") {
                filterAcc.from = new Date(value);
            }
            if (key === "to") {
                filterAcc.to = new Date(value);
            }
        });
        console.log("filterAcc:", JSON.stringify(filterAcc))
        setFilter(filterAcc);
        setFilterText(text);
    };
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const addTask = (text: string) => {
        setTodos((prev) => [...prev, { id: `id_${prev.length + 1}`, text, createdAt: new Date(), done: false }])
    };

    return <>
        <div>
            <p>filteres</p>
            <Filteres filter={filter} filterText={filterText} setFilterText={handleSetFilter} />
        </div>
        <div>
            <p>addtask</p>
            <AddTask onClickButton={addTask} />
        </div>
        <GoodTodos filter={filter} todos={todos} toggleChecked={(i: number) => setTodos((prev) => [...prev.slice(0, i), { ...prev[i], done: !prev[i].done }, ...prev.slice(i + 1)])} />
        <BadTodos filter={filter} todos={todos} toggleChecked={(i: number) => setTodos((prev) => [...prev.slice(0, i), { ...prev[i], done: !prev[i].done }, ...prev.slice(i + 1)])} />
    </>
}