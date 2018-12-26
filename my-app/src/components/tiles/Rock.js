import React from 'react';

const Rock = (props) => {
  return (
    <div className="tile rock" style={{opacity: props.opacity}}></div>
  );
}

export default Rock;