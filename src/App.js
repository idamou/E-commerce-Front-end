import Landing from './pages/Landing';
import {BrowserRouter, Routes, Route, Link, Router} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<div>Dashboard</div>}/>
            <Route path="/register" element={<div>Register</div>}/>
            <Route path="/landing" element={<Landing/>}/>
            <Route path="/*" element={<div>ERROR 404 Not Found</div>}/>
        </Routes>
            </BrowserRouter>

    );
}

export default App;
