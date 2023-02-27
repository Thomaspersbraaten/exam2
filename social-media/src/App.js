import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";
import { TrackReactionProvider } from "./components/context/ReactionContext";
import { AuthProvider } from "./components/context/AuthContext";
import { NameProvider } from "./components/context/NameContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import PageNotFound from "./pages/PageNotFound";
import ProfileDetail from "./pages/ProfileDetail";
import NavBar from "./components/navigation/NavBar";
import Profiles from "./pages/Profiles";

function App() {
  return (
    <NameProvider>
      <AuthProvider>
        <TrackReactionProvider>
          <div className="main-container">
            <Router>
              <NavBar />
              <div className="page-container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/welcome" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/create-account" element={<CreateAccount />} />
                  <Route path="/list-profiles" element={<Profiles />} />
                  <Route path="/profiles/:name" element={<ProfileDetail />} />
                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </Router>
          </div>
        </TrackReactionProvider>
      </AuthProvider>
    </NameProvider>
  );
}

export default App;
