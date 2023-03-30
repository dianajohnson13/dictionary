import '../styles/EntryHeader.css';
import PlayIcon from '../assets/icon-play.svg';

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
                <p>{phonetic && phonetic.text ? phonetic.text : null}</p>
            </div>
            <button
                className="play"
                disabled={!phonetic || !phonetic.audio}
                onClick={playAudio}
            >
                <img src={PlayIcon}/>
            </button>
        </div>
    );
}

export default EntryHeader;
