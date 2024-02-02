import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollTop";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import VideoPage from "./VideoPage/VideoPage";
import ShortVideo from "./ShortVideo/ShortVideo";

function App() {
  return (
    <>
      <Router basename="/MyTube"> 
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<VideoPage />} />
          <Route path="short/:id" element={<ShortVideo />} />

        </Routes>

      </Router>
    </>
  );
}

export default App;
