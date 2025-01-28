"use client";

import { useState } from "react";
import { AuthContext, WatchLaterContext } from "../contexts/userContext";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [watchLater, setWatchLater] = useState([]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <WatchLaterContext.Provider value={{ watchLater, setWatchLater }}>
        {children}
      </WatchLaterContext.Provider>
    </AuthContext.Provider>
  );
}
