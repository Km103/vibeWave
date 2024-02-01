import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Upload from "./Pages/Upload";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
