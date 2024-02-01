import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="text-lg text-center py-28 ">
            <Link className="text-blue-400 text-center text-xl" to="./login">
                Login
                <br />
            </Link>
            To upload the song
        </div>
    );
}

export default Home;
