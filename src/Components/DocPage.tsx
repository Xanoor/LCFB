// DocPage.tsx
import { Command } from "../assets/types";

interface MainProps {
    cmdData: Command | null;
}

function DocPage({ cmdData }: MainProps) {
    if (!cmdData) {
        return <p>No item found</p>;
    }

    return (
        <div id="main">
            <h1>
                {cmdData.name} {cmdData.type}
            </h1>
            <p id="description">{cmdData.long_description}</p>
            <h2>Syntax</h2>
            <div className="bash">
                <div className="top">
                    <p>Bash</p>
                </div>
                <div className="bottom">
                    <p>{cmdData.syntax}</p>
                </div>
            </div>
            <ul>
                {cmdData.details.map((element, index) => (
                    <li key={index}>
                        <p>{element}</p>
                    </li>
                ))}
            </ul>

            {cmdData.options && (
                <>
                    <h2>Common Options</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Option</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(cmdData.options).map(
                                ([option, description]) => (
                                    <tr key={option}>
                                        <td>
                                            <strong>{option}</strong>
                                        </td>
                                        <td>{description}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default DocPage;
