import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: isVisible ? "none" : "" };
  const showWhenVisible = { display: isVisible ? "" : "none" };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
