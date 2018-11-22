import React from 'react';

export default (WrappedComponent) => {
  // ...and returns another component...
  return (props) => {
    console.log("###################################")
    console.log(props);
    return (
      <WrappedComponent
        {...props}
      />);
  };
};