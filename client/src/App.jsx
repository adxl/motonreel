import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "@components/ProtectedRoute";

import "./App.css";

const Login = React.lazy(() => import("@pages/Login"));
const Register = React.lazy(() => import("@pages/Register"));
const Error = React.lazy(() => import("@pages/Error"));

import { AuthProvider } from "@hooks/auth";

export default function App() {
  return (
    <div id="app">
      <AuthProvider>
        <Suspense fallback={"loading..."}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/profile"
                element={<ProtectedRoute el={"profile"} />}
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
}
