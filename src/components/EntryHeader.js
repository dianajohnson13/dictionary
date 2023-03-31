import '../styles/EntryHeader.css';
import {ReactComponent as PlayIcon } from '../assets/icon-play.svg';

function EntryHeader({
    word,
    phonetic // {audio, text} can be missing; TO-DO: handle better
}) {
    const playAudio = () => {
        const audioClip = new Audio(phonetic.audio);
        audioClip.play();
    }

    return (
        <div className ="entry-header">
            <div>
                <h1>{word}</h1>
                <p className="phonetic">{phonetic && phonetic.text ? phonetic.text : null}</p>
            </div>
            <button
                aria-label="speak word"
                className="play"
                disabled={!phonetic || !phonetic.audio}
                onClick={playAudio}
            >
                <PlayIcon aria-hidden />
            </button>
        </div>
    );
}

export default EntryHeader;
