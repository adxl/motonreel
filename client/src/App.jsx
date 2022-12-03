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
const Logout = React.lazy(() => import("@pages/Logout"));
const Register = React.lazy(() => import("@pages/Register"));
const Home = React.lazy(() => import("@pages/Home"));
const Error = React.lazy(() => import("@pages/Error"));

import { AuthProvider } from "@hooks/auth";

export default function App() {
  return (
    <div id="app">
      <AuthProvider>
        <Suspense fallback={"loading..."}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/home"
                element={<ProtectedRoute el={Home} />}
              />
              <Route path="*" element={<Error />} />
              <Route exact path="/logout" element={<Logout />} />
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
}
