import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideWhenVisible = isVisible ? "hidden" : "";
  const showWhenVisible = isVisible ? "" : "hidden";

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div className={hideWhenVisible}>
        <button
          className="underline text-green-400 hover:text-green-300"
          onClick={toggleVisibility}
        >
          {props.label}
        </button>
      </div>
      <div className={showWhenVisible}>
        <button
          className="text-green-400 hover:text-green-300"
          onClick={toggleVisibility}
        >
          cancel
        </button>
        {props.children}
      </div>
    </div>
  );
};

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
