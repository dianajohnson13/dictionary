import "../styles/RelatedWordList.css";

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
                            <a href={`#${word.replace(" ", "-")}`}>{word}</a>
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