import "../styles/RelatedWordList.css";

import { urlEncodeWord } from "../utils/urlHandlers";

function RelatedWordList({
    label,
    list
}) {
    return (
        <div className="related-words-container">
            <h3>{label}</h3>
            <ul>
                {list.map((word, idx) => (
                        <li key={idx}>
                            {/* urlEncodeWord handles multiple words */}
                            <a href={`#${urlEncodeWord(word)}`}>{word}</a>
                            {/* unless it's the last word in the list, add a comma */}
                            {idx < list.length -1 ? ", " : null}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}


export default RelatedWordList;