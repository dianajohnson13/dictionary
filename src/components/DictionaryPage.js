import React, { Component } from "react";

import EntryHeader from "./EntryHeader";

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

class DictionaryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        if (this.props.word) {
            fetchData(this.props.word)
                .then(data => this.setState({ data }));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.word === prevProps.word) return;

        if (this.props.word) {
            fetchData(this.props.word)
                .then(data => this.setState({ data }));
        } else {
             this.setState({ data: null });
        }
    }

    render() {
        const { data } = this.state;
        return data ? (
            <div>
                <EntryHeader
                    word={data.word}
                    phonetic={data.phonetic}
                />
                {/* foreach definition, return definition component */}
            </div>
        ) : (
            <p>Search for a word...</p>
        );
    }
}

export default DictionaryPage;
