import Button from "../Button/Button";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { faSearch, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/top.css";


function Titel({ searchQuery, setSearchQuery, handleKeyDown }) {
  const location = useLocation();
  return (
    <div className="titel">
      <img className="logo" src="/images/logo.png" alt="logo" />
      <div className="search-box">
        <FontAwesomeIcon icon={faSearch} size="lg" id="search-icon" />
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* <Search></Search> */}
      <div className="additional-links">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          home
        </Link>
        {/* <div className="nav-home">Home </div>
        {navigation("/" )} */}

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
        <FontAwesomeIcon icon={faBarsStaggered} size="lg" id="burger-menu" />
      </div>
    </div>
  );
}

function Top({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  if (
    location.pathname === "/my-list" ||
    location.pathname.startsWith("/card")
  ) {
    return (
      <div>
        <br />
        <Titel
          onSearch={onSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyDown={handleKeyDown}
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
        // controls
      />
      <div className="overlay"></div>
      <div className="up">
        <br />
        <Titel
          onSearch={onSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyDown={handleKeyDown}
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
