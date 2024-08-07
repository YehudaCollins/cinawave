import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { auth, onAuthStateChanged } from "../firebase";
import Button from "../Button/Button";
import "../style/top.css";

function Titel({ searchQuery, setSearchQuery, handleKeyDown, user }) {
  const location = useLocation();
  return (
    <div className="titel">
      <img className="logo" src="/images/logo.png" alt="logo" />
      <div className="search-box">
        <FaSearch id="search-icon" />
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="additional-links">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          home
        </Link>
        <Link
          to="/my-list"
          className={location.pathname === "/my-list" ? "active-link" : ""}
        >
          favorites
        </Link>
        <Link
          to="/series"
          className={location.pathname === "/series" ? "active-link" : ""}
        >
          series
        </Link>
      </div>
      <div className="burger-menu">
        <Link to="/profile">
          {user ? (
            <img src={user.photoURL} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-icon">
              <CgProfile />
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

function Top({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  if (
    location.pathname === "/my-list" ||
    location.pathname.startsWith("/card") ||
    location.pathname.startsWith("/series") ||
    location.pathname.startsWith("/profile")
  ) {
    return (
      <div>
        <br />
        <Titel
          onSearch={onSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyDown={handleKeyDown}
          user={user}
        />
      </div>
    );
  }

  return (
    <div className="main-main">
      <video
        src="https://video.gumlet.io/65e9d3efa2249712ac85f323/65e9d4aea2249712ac85f8a3/download.mp4"
        autoPlay
        loop
        muted
        className="background-video"
      />
      <div className="overlay"></div>
      <div className="up">
        <br />
        <Titel
          onSearch={onSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyDown={handleKeyDown}
          user={user}
        />
        <div className="content">
          <div className="main">
            <h1 className="main-title">Free Movies to Watch,</h1>
            <h1 className="main-title">Anytime Anywhere.</h1>
            <h3 className="secondary-title">
              The search is over! Let CinaWave help you find the perfect{" "}
            </h3>
            <h3 className="secondary-title">
              movie to watch tonight for free.
            </h3>
            <br />
            <div className="button">
              <Button></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;
export { Titel };
