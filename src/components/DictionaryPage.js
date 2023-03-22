import React, { Component } from "react";

import EntryHeader from "./EntryHeader";

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const fetchData = (word) => {
    return fetch(`${URL}${word}`)
        .then(response => response.json())
};

// API to-do notes:
//     - Use first item in resp Array
//     - in phonetics, find first phonectic with audio and use that along with pronounciation
//     - 

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
        console.log(this.state.data)
        return  (this.props.word) ? (
            <div>
                <EntryHeader
                    word={this.props.word}

                />
                {/* foreach definition, return definition component */}
            </div>
        ) : (
            <p>Search for a word...</p>
        );
    }
}

export default DictionaryPage;
