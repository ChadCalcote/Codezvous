import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import EventPage from "./components/EventPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import GroupPage from "./components/GroupPage";
import HomePage from "./components/HomePage"
import UserImage from "./components/UserImage";
import GroupForm from "./components/GroupForm";
import { authenticate } from "./services/auth";
import EventCard from "./components/EventCard";
import Footer from "./components/Footer";
import CommentFormReact from "./components/CommentForm";
import EventFormReact from "./components/EventForm";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        {/* <Route path="/footer" exact={true}> */}
          {/* <Footer
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          /> */}
        {/* </Route> */}
        <Route path="/create-group" exact={true}>
          <GroupForm
            // authenticated={authenticated}
            // setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route exact path="/events/test">
          <EventFormReact
            // authenticated={authenticated}
            // setAuthenticated={setAuthenticated}
          />
        </Route>
        {/* <Route exact path="/events/:eventId/comments">
          <CommentFormReact
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route> */}
        <Route exact path="/events/:eventId">
          <EventPage
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
       </Route>
        <Route path="/attendee">
          <EventPage
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/groups/:groupId">
          <GroupPage
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute
          path="/users"
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/users/:userId"
          exact={true}
          authenticated={authenticated}
        >
          <User />
          <UserImage />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <HomePage />
        </ProtectedRoute>
      </Switch>
      <Footer authenticated={authenticated} setAuthenticated={setAuthenticated}/>
    </BrowserRouter>
  );
}

export default App;
