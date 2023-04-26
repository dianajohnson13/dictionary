import React, { Component } from "react";

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
            this.setState({ loading: true, data: null });
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
            <p>Loading...</p>
        ) : (!loading && !data && word) ? (
            <p>Word not found</p>
        ) : (
            <p>Search for a word...</p>
        );
    }
}

export default DictionaryPage;
