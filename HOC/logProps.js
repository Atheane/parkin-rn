import React from 'react';

export default (WrappedComponent) => {
  // ...and returns another component...
  return (props) => {
    console.log("In LogProps", props);
    return (
      <WrappedComponent
        {...props}
      />);
  };
};
