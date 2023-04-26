import React, { Component } from "react";

import "../styles/DictionaryPage.css"
import EntryHeader from "./EntryHeader";
import Meaning from "./Meaning";

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const fetchData = (word) => {
    return fetch(`${URL}${word}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
         })
        .then(result => {
            let rawData;
            if (result && result[0]) {
                rawData = result[0];
                return {
                    word: rawData.word,
                    origin: rawData.origin,
                    meanings: rawData.meanings,
                    // some phonetics don't contain audio; use one with audio
                    phonetic: rawData.phonetics ? rawData.phonetics.find(el => el.audio) : null
                }
            }
            return null;
        })
        .catch(error => console.log(error))
};

// TO-DO: Convert to functional component w/ hooks.
    // I used a class component here as a refresher for myself
class DictionaryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true
        };
    }

    componentDidMount() {
        if (this.props.word) {
            fetchData(this.props.word)
                .then(data => this.setState({ data, loading: false }));
        } else {
            this.setState({ loading: false })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.word === prevProps.word) return;

        if (this.props.word) {
            // the DOM doesn't update for loading === true unless data === null
                // TO-DO: visually display loading for the sake of the occasional slow fetch
            this.setState({ loading: true });
            fetchData(this.props.word)
                .then(data => this.setState({ data, loading: false }));
        } else {
             this.setState({ data: null });
        }
    }

    render() {
        const { word } = this.props;
        const { data, loading } = this.state;
        return data ? (
            <div>
                <EntryHeader
                    word={data.word}
                    phonetic={data.phonetic}
                />
                {data.meanings.map((meaning, key) => {
                    return (
                        <Meaning
                            key={key}
                            partOfSpeech={meaning.partOfSpeech}
                            definitions={meaning.definitions}
                            synonyms={meaning.synonyms}
                            antonyms={meaning.antonyms}
                        />
                    );
                })}
            </div>
        ) : loading ? (
            // loading state only displayed if loading and !data.
            <div className="placeholder-container">
                <p>Loading...</p>
            </div>
        ) : (!loading && !data && word) ? (
            <div className="placeholder-container">
                <h2>No results found</h2>
                <p>Please enter a different word</p>
            </div>
        ) : (
            <div className="placeholder-container">
                <h2>Welcome!</h2>
                <p>Enter a word in the search bar to find its definition</p>
            </div>
        );
    }
}

export default DictionaryPage;
