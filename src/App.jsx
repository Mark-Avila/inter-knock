import {
    AuthScreen,
    CreateScreen,
    EditScreen,
    FeedScreen,
    PostScreen,
} from "./screens";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageLayout from "./screens/PageLayout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthScreen />} />

                <Route element={<PageLayout />}>
                    <Route path="/feed" element={<FeedScreen />} />
                    <Route path="/create" element={<CreateScreen />} />
                    <Route path="/post/:id" element={<PostScreen />} />
                    <Route path="/edit/:id" element={<EditScreen />} />
                    <Route path="*" element={<p>Not found!</p>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
