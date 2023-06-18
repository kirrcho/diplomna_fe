import * as React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const isSignedIn = localStorage.getItem('token') != null;
  const [searchValue, setSearchValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(searchValue);
  };

  return (
    <div id="navbar">
      <Link to="/">
        <img id="logo" src="logo.png" width="30px" />
      </Link>
      {!isSignedIn && <Link to="/login" className="route">
        <p>Login</p>
      </Link>}
      {isSignedIn && <Link to="/rooms" className="route">
        <p>Rooms</p>
      </Link>}
      <form onSubmit={handleSubmit} className="right">
        <label>
          <input
            placeholder=" Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0,0,256,256"
            width="30px"
            height="30px"
            fillRule="nonzero"
            onClick={handleSubmit}
          >
            <g
              fill="#c5c5c5"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(8.53333,8.53333)">
                <path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path>
              </g>
            </g>
          </svg>
        </label>
      </form>
    </div>
  );
}

export default Navbar;
