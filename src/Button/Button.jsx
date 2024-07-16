// import "./button.css";
// function Button() {
//   return (
//     <button className="button-21" alt="button">
//       Watch free
//     </button>
//   );
// }
// export default Button;





import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import "./button.css";

function Button() {
  return (
    <Link to="/#main-cards" className="button-21" alt="button" smooth>
      Watch free
    </Link>
  );
}

export default Button;
