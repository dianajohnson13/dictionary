import React, { Component } from "react";

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

class DictionaryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        if (this.props.word) {
            fetch(`${URL}${this.props.words}`)
                .then(response => response.json())
                .then(data => this.setState({ data }));
        }
    }

    componentDidUpdate(prevProps) {

        if (this.props.word === prevProps.word) return;

        if (this.props.word) {
            fetch(`${URL}${this.props.word}`)
                .then(response => response.json())
                .then(data => this.setState({ data }));
        } else {
             this.setState({ data: null });
        }
    }

    render() {
        console.log(this.state.data)
        return  (this.props.word) ? (
            <div>
                {/* <EntryHeader />
                foreach definition, return definition component */}
            </div>
        ) : (
            <p>Search for a word...</p>
        );
    }
}

export default DictionaryPage;
