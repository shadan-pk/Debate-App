export default function MicControl() {
    const [isMicOn, setMicOn] = useState(false);

    const toggleMic = () => {
        setMicOn(prevState => !prevState);
        // Additional logic to handle microphone settings can be added here
    };

    return (
        <div>
            <button onClick={toggleMic}>
                {isMicOn ? 'Mute Mic' : 'Unmute Mic'}
            </button>
        </div>
    );
}