import ReactAudioPlayer from "react-audio-player";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

const playingButton = () => {
    if (isPlaying) {
        pause(); // this will pause the audio
        setIsPlaying(false);
    } else {
        play(); // this will play the audio
        setIsPlaying(true);
    }
};

function Player(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(props.track);

    return (
        <div className="flex  py-24  w-3/4  justify-center border-4 border-blue-900 rounded-3xl bg-gray-800 mt-6 flex-auto">
            <div className="text-4xl px-24  font-medium text-white ">
                {props.name}
            </div>
            <ReactAudioPlayer
                className="px-52 ml-32"
                src={`${props.track}`}
                controls
                volume={0.5}
            />
        </div>
    );
}

export default Player;
