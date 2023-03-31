import '../styles/Meaning.css'
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
        <div className="meaning">
            <h2 className='part-of-speach'>{partOfSpeech}</h2>
            <h3>Meaning</h3>
            <ul className="definitions">
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