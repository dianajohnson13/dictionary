
function EntryHeader({
    word,
    phonetic // {audio, text} can be missing; TO-DO: handle better
}) {
    const playAudio = () => {
        const audioClip = new Audio(phonetic.audio);
        audioClip.play();
    }

    return (
        <div>
            <div>
                <h1>{word}</h1>
                {phonetic && phonetic.text ? (<p>{phonetic.text}</p>) : null}
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
