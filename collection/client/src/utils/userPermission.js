// Base
import { useState } from "react";

const userPermission = ({ path }) => {
  const [userPermission, setUserPermission] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    setUserPermission(true);
  }

  return userPermission;
};

export default userPermission;
