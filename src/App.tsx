import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MapView from "./components/mapview";
import Loading from "./components/Loading";
import Chat from "./components/chat/chat";
import Profile from "./components/Profile";
import { FaMapMarkedAlt, FaComments, FaRss, FaUser } from "react-icons/fa";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <div className="background"></div>

      <main className="map-container">
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/feed" element={<div>Feed Page</div>} />
          <Route path="/User" element={<Profile/>} />
        </Routes>
      </main>

      <nav className="menu">
        <ul>
          <li>
            <Link to="/">
              <FaMapMarkedAlt />
            </Link>
          </li>

          <li>
            <Link to="/Chat">
              <FaComments />
            </Link>
          </li>

          <li>
            <Link to="/feed">
              <FaRss />
            </Link>
          </li>

          <li>
            <Link to="/User">
              <FaUser />
            </Link>
          </li>
        </ul>


      </nav>
    </div>
  );
}


export default App;
