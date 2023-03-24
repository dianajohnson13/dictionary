import RelatedWordList from "./RelatedWordList";

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
            {synonyms.length > 0 && (
                <RelatedWordList
                    label="Synonyms"
                    list={synonyms}
                />
            )}
            {antonyms.length > 0 && (
                <RelatedWordList
                    label="Antonyms"
                    list={antonyms}
                />
            )}
        </div>
    );
}

export default Meaning;