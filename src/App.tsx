// First script in React, be gentle !! ;)
// App.tsx
import { useState, useEffect } from "react";
import commands from "./assets/commands.json";
import Sidebar from "./Components/Sidebar";
import DocPage from "./Components/DocPage";
import { Command } from "./assets/types";
import Header from "./Components/Header";

const App: React.FC = () => {
    const [cmd, setCmd] = useState<string>("pipe");
    const [cmdData, setCmdData] = useState<Command | null>(null);

    useEffect(() => {
        const selectedCmd = commands.find((element) => element.name === cmd);
        setCmdData(selectedCmd || null);
    }, [cmd]);

    return (
        <>
            <Header commands={commands} cmd={cmd} setCmd={setCmd} />
            <main>
                <Sidebar commands={commands} cmd={cmd} setCmd={setCmd} />
                <DocPage cmdData={cmdData} />
            </main>
        </>
    );
};

export default App;
