import React from "react";
import { UserContext, TokenContext } from "./App";

export default function useContext() {
  const user = React.useContext(UserContext);
  const token = React.useContext(TokenContext);
  return [user, token];
}
