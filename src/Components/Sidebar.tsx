// Sidebar.tsx
import { Command } from "../assets/types";

interface SidebarProps {
    commands: Command[];
    cmd: string;
    setCmd: (cmd: string) => void;
}
function Sidebar({ commands, cmd, setCmd }: SidebarProps) {
    const symbols = commands.filter((element) => element.type === "symbol");
    const linuxCommands = commands.filter(
        (element) => element.type === "command"
    );

    return (
        <div id="sidebar">
            <h1>Symbols</h1>
            <ul>
                {symbols.map((element, index) => (
                    <li key={index}>
                        <pre
                            className={element.name === cmd ? "active" : ""}
                            onClick={() => setCmd(element.name)}
                        >
                            {element.name}
                        </pre>
                    </li>
                ))}
            </ul>
            <h1>Linux commands</h1>
            <ul>
                {linuxCommands.map((element, index) => (
                    <li key={index}>
                        <pre
                            className={element.name === cmd ? "active" : ""}
                            onClick={() => setCmd(element.name)}
                        >
                            {element.name}
                        </pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
