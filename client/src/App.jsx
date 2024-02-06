import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Upload from "./Pages/Upload";
import Play from "./Pages/Play";
import Layout from "./Layout";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/play" element={<Play />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
