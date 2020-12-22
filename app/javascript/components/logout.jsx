import React from 'react';
import { removeUserSession } from '../utils/common.js';

function Logout(props) {
  removeUserSession();
  location.href = "/";
}

export default Logout;
