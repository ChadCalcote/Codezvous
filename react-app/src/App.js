import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginPage";
import SignUpForm from "./components/auth/SignUpPage";
import NavBar from "./components/NavBar";
import EventPage from "./components/EventPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import GroupPage from "./components/GroupPage";
import NotFoundPage from "./components/NotFoundPage"
import UserImage from "./components/UserImage";
import GroupForm from "./components/GroupForm";
import { authenticate } from "./services/auth";
import Footer from "./components/Footer";
import HomePageContainer from "./components/HomePageContainer";
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
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/" exact={true}>
          <HomePageContainer
          authenticated={authenticated}
          />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute 
        authenticated={authenticated}
        path="/create-group" 
        exact={true}
        >
          <GroupForm />
        </ProtectedRoute>
        <Route path="/groups/create/event" exact={true}>
          <EventFormReact/>
        </Route>
        <Route exact path="/events/:eventId">
          <EventPage
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route exact path="/groups/:groupId">
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
        <Route path="*" >
            <NotFoundPage />
        </Route>
      </Switch>
      <Footer
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </BrowserRouter>
  );
}

export default App;
