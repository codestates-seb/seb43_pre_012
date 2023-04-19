import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import theme from "./styles/theme";
import Questions from "./pages/Questions";
import UserProfile from "./pages/UserProfile";
import UserSave from "./pages/UserSave";
import QuestionDetail from "./pages/QuestionDetail";
import Users from "./pages/Users";
import Tags from "./pages/Tags";
import Companies from "./pages/Companies";
import Ask from "./pages/Ask";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/slices/userSlice";
import Home from "./pages/Home";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/user", element: <UserProfile /> },
      { path: "/users", element: <Users /> },
      { path: "/tags", element: <Tags /> },
      { path: "/companies", element: <Companies /> },
      { path: "/user", element: <UserProfile /> },
      { path: "/user/save", element: <UserSave /> },
      { path: "/questions/:id", element: <QuestionDetail /> },
      { path: "/questions/ask", element: <Ask /> },
      { path: "/login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
      { path: "/questions", element: <Questions /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
