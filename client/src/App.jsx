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

const Requests = React.lazy(() => import("@pages/requests"));
const RequestChat = React.lazy(() => import("@pages/requests/RequestChat"));

const Topics = React.lazy(() => import("@pages/topics"));
const TopicDetails = React.lazy(() => import("@pages/topics/TopicDetails"));
const NewTopic = React.lazy(() => import("@pages/topics/NewTopic"));
const EditTopic = React.lazy(() => import("@pages/topics/EditTopic"));

const ConversationsList = React.lazy(() => import("@pages/chat"));
const ConversationDetails = React.lazy(() =>
  import("@pages/chat/ConversationDetails.jsx")
);

const ChatBot = React.lazy(() => import("@pages/chatbot"));

const Error = React.lazy(() => import("@pages/Error"));

import Container from "react-bootstrap/Container";

import { AlertProvider } from "@hooks/alert";
import { AuthProvider } from "@hooks/auth";

export default function App() {
  return (
    <Container fluid id="app">
      <AlertProvider>
        <AuthProvider>
          <Suspense fallback={"Chargement..."}>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/requests" />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route
                  exact
                  path="/requests"
                  element={<ProtectedRoute el={Requests} />}
                />
                <Route
                  exact
                  path="/requests/:requestId"
                  element={<ProtectedRoute el={RequestChat} />}
                />

                <Route
                  exact
                  path="/forum"
                  element={<ProtectedRoute el={Topics} />}
                />
                <Route
                  exact
                  path="/forum/:topicId"
                  element={<ProtectedRoute el={TopicDetails} />}
                />
                <Route
                  exact
                  path="/forum/new"
                  element={<ProtectedRoute el={NewTopic} />}
                  requireAdmin
                />
                <Route
                  exact
                  path="/forum/:topicId/edit"
                  element={<ProtectedRoute el={EditTopic} />}
                  requireAdmin
                />

                <Route
                  exact
                  path="/chat"
                  element={<ProtectedRoute el={ConversationsList} />}
                />
                <Route
                  exact
                  path="/chat/:secUserId"
                  element={<ProtectedRoute el={ConversationDetails} />}
                />

                <Route
                  exact
                  path="/chatbot"
                  element={<ProtectedRoute el={ChatBot} />}
                />

                <Route path="*" element={<Error />} />
                <Route exact path="/logout" element={<Logout />} />
              </Routes>
            </Router>
          </Suspense>
        </AuthProvider>
      </AlertProvider>
    </Container>
  );
}
