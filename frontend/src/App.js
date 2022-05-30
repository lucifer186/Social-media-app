
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messager from "./pages/message/Messager";
import Edit from "./pages/editProfile/Edit";
import Navsidebar from "./navSidebar/Navsidebar";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messanger">
          {!user ? <Redirect to="/" /> : <Messager />}
        </Route>
        <Route path='/edit-profile'>
          {user ? <Edit/>: <Login/> }
        </Route>
        <Route path='/navsidebar' >
         {user && <Navsidebar/> }

        </Route>
      
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
