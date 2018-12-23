import React from 'react';

const Food = (props) => {
  return (
    <div className="tile food" style={{opacity: props.opacity}}></div>
  );
}

export default Food;