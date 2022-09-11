import React from 'react';

const MyButton = (props) => {
  const {
    children,
    ...rest
  } = props;
  console.log('MyButton render');
  return (
    <button
      className="btn btn-danger"
      {...rest}>{children}</button>
  )
};

export default React.memo(MyButton);