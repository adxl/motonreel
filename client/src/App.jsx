import React, { Suspense } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "@components/ProtectedRoute";

import "./App.css";

const Error = React.lazy(() => import("./pages/Error"));

export default function App() {
  return (
    <div id="app">
      <Suspense fallback={"loading..."}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route exact path="/login" element={"login"} />
            <Route exact path="/register" element={"register"} />
            <Route
              exact
              path="/profile"
              element={<ProtectedRoute el={"profile"} />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}
