import React from 'react';
import './Button.css';

// four props passed
function Button({type, title, disable, onClick}) {
    return (
        <button
            // below is a neat way to define text to appear programmitically
            className={`btn ${
                (type === "add" && "add") ||
                (type === 'remove' && 'remove') ||
                (type === 'checkout' && 'checkout')
            }`}
    disabled={disable}
    onClick={onClick}
        >
        {title}
        </button>
  );
}

export default Button;