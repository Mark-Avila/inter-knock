import { AuthScreen } from "./screens";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FeedScreen from "./screens/FeedScreen";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthScreen/>}/>
                <Route path="/feed" element={<FeedScreen/>}/>
                <Route path="*" element={<p>Not found!</p>} />
            </Routes>
        </Router>
    );
}

export default App;
