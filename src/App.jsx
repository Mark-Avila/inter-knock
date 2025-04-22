import { AuthScreen, FeedScreen, PostScreen } from "./screens";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthScreen/>}/>
                <Route path="/feed" element={<FeedScreen/>}/>
                <Route path="/post/:id" element={<PostScreen/>}/>
                <Route path="*" element={<p>Not found!</p>} />
            </Routes>
        </Router>
    );
}

export default App;
