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

    const handleMenuButtonOnClick = () => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            if (sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
            } else {
                sidebar.classList.add("active");
            }
        }
    };

    // When the searchBar is updated, update the list of items
    useEffect(() => {
        // Filter commands where the name includes the searchValue
        const items = commands
            .filter((element) =>
                element.name.toLowerCase().includes(searchValue)
            )
            .map((element) => ({
                command: element.name,
                detail: element.description,
            }));

        // Add commands where the description includes the searchValue and the name is not already in items
        const additionalItems = commands
            .filter(
                (element) =>
                    element.description.toLowerCase().includes(searchValue) &&
                    !items.some((item) => item.command === element.name)
            )
            .map((element) => ({
                command: element.name,
                detail: element.description,
            }));

        // Concatenate the filtered items and additional items
        setFoundItems(items.concat(additionalItems));
    }, [searchValue]);

    return (
        <>
            <header>
                <p>LCFB</p>
                <div onClick={handleMenuButtonOnClick} className="menu-button">
                    <svg>
                        <rect
                            width="100%"
                            height="20%"
                            x="0"
                            y="0%"
                            fill="white"
                        />
                        <rect
                            width="100%"
                            height="20%"
                            x="0"
                            y="40%"
                            fill="white"
                        />
                        <rect
                            width="100%"
                            height="20%"
                            x="0"
                            y="80%"
                            fill="white"
                        />
                    </svg>
                </div>
                <div id="searchBar">
                    <input
                        type="text"
                        placeholder="Search"
                        id="searchBarInput"
                        onClick={() => setIsExpanded(true)}
                        onBlur={() =>
                            setTimeout(() => setIsExpanded(false), 100)
                        }
                        onChange={(event) =>
                            setSearchValue(
                                event.target.value.toLocaleLowerCase()
                            )
                        }
                    ></input>
                    <div
                        id="searchBarExpand"
                        style={{ display: isExpanded ? "block" : "none" }}
                    >
                        {foundItems.length === 0 ? (
                            <p>No items</p>
                        ) : (
                            foundItems.map((element) => (
                                <div
                                    className="searchBar-item"
                                    onClick={() =>
                                        handleOnClick(element.command)
                                    }
                                    key={element.command}
                                >
                                    <p
                                        className={
                                            cmd === element.command
                                                ? "searchBar-item-cmd active"
                                                : "searchBar-item-cmd"
                                        }
                                    >
                                        {element.command}
                                    </p>
                                    <p className="searchBar-item-detail">
                                        {element.detail}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}

export default SearchBar;
