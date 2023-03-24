import '../styles/EntryHeader.css';

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
                disabled={!phonetic || !phonetic.audio}
                onClick={playAudio}
            >
                Play
            </button>
        </div>
    );
}

export default EntryHeader;
