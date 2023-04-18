import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./styles/theme";
import Questions from "./pages/Questions";
import UserProfile from "./pages/UserProfile";
import UserSave from "./pages/UserSave";
import QuestionDetail from "./pages/QuestionDetail";
import Users from "./pages/Users";
import Tags from "./pages/Tags";
import Companies from "./pages/Companies";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Questions /> },
      { path: "/questions", element: <Questions /> },
      { path: "/user", element: <UserProfile /> },
      { path: "/users", element: <Users /> },
      { path: "/tags", element: <Tags /> },
      { path: "/Companies", element: <Companies /> },
      { path: "/user", element: <UserProfile /> },
      { path: "/user/sava", element: <UserSave /> },
      { path: "/questions/:id", element: <QuestionDetail /> },
      { path: "/login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </ThemeProvider>
);
