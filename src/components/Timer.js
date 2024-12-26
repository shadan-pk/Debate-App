export default function Timer({ duration, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            onTimeUp();
        }
    }, [timeLeft, onTimeUp]);

    return (
        <div>
            <h2>Time Left: {timeLeft} seconds</h2>
        </div>
    );
}