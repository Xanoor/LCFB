// SearchBar.tsx

import { useEffect, useState } from "react";
import { Command } from "../assets/types";

interface searchBarItem {
    command: string;
    detail: string;
}

interface SearchBarProps {
    commands: Command[];
    cmd: string;
    setCmd: (cmd: string) => void;
}

function SearchBar({ commands, cmd, setCmd }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState("");
    const [foundItems, setFoundItems] = useState<searchBarItem[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleOnClick = (command: string) => {
        setCmd(command);
        setIsExpanded(false);
        const searchBarInput = document.getElementById(
            "searchBarInput"
        ) as HTMLInputElement;
        if (searchBarInput) {
            searchBarInput.value = "";
        }
        setSearchValue("");
    };

    // When the searchBar is updated, update the list of items
    useEffect(() => {
        const items = commands
            .filter((element) => element.name.includes(searchValue))
            .map((element) => ({
                command: element.name,
                detail: element.description,
            }));
        setFoundItems(items);
    }, [searchValue]);

    return (
        <>
            <header>
                <p>LCFB</p>
                <div id="searchBar">
                    <input
                        type="text"
                        placeholder="Search"
                        id="searchBarInput"
                        onClick={() => setIsExpanded(true)}
                        onBlur={() =>
                            setTimeout(() => setIsExpanded(false), 100)
                        }
                        onChange={(event) => setSearchValue(event.target.value)}
                    ></input>
                    <div
                        id="searchBarExpand"
                        style={{ display: isExpanded ? "block" : "none" }}
                    >
                        {foundItems.length === 0 ? (
                            <p>No items</p>
                        ) : (
                            foundItems.map((element) => (
                                <p
                                    className={
                                        cmd === element.command ? "active" : ""
                                    }
                                    onClick={() =>
                                        handleOnClick(element.command)
                                    }
                                >
                                    {element.command}
                                </p>
                            ))
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}

export default SearchBar;
