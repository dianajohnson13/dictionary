
// partOfSpeech: string
// definitions: [{definition: string}]
// synonyms: [string]
// antonyms: [string]

function Meaning({
    partOfSpeech,
    definitions,
    synonyms,
    antonyms
}) {
    return (
        <div>
            <h2>{partOfSpeech}</h2>
            <h3>Meaning</h3>
            <ul>
                {definitions.map((item, key) => {
                   return <li key={key}>{item.definition}</li>
                })}
            </ul>

            {/* TO-DO: turn lists below into components */}
            {synonyms.length > 0 ? (
                <div>
                <h3>Synonyms</h3>
                <ul>
                    {synonyms.map((syn, idx) => {
                        return (
                            <li key={idx}>
                                <a>{syn}</a>
                                {idx < synonyms.length -1 ? ", " : null}
                            </li>
                        );
                    })}
                </ul>
                </div>
            ) : null}
            {antonyms.length > 0 ? (
                <div>
                    <h3>Antonyms</h3>
                    <ul>
                        {antonyms.map((ant, idx) => {
                            return (
                                <li key={idx}>
                                    <a>{ant}</a>
                                    {idx < synonyms.length -1 ? ", " : null}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}

export default Meaning;