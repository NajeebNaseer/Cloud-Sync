import React from 'react';

import './styles.css';

const Input = React.forwardRef(({ id, label, ...props }, ref) => (
  <div className="sc__input-container">
    <label className="sc__input-label" htmlFor={id}>
      {label}
    </label>
    <input className="sc__input" id={id} ref={ref} {...props} />
  </div>
));

export default Input;
