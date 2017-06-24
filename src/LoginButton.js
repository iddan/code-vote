import React from 'react';
import { token, login } from './github';

const LoginButton = () => {
  if (token) {
    return null;
  }
  return <button onClick={ login }>login</button>;
};

export default LoginButton;
