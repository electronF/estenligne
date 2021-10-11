import React from 'react';

import 
{
    BrowserRouter as Router,
    Switch,
    Route
}
from "react-router-dom";

import LoginPage from './components/Pages/LoginPage/LoginPage';
import HomePage from './components/Pages/HomePage/HomePage';
import Footer from './components/shared/footer/Footer';
import './App.css';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';
import NewPasswordPage from './components/Pages/NewPasswordPage/NewPasswordPage';
import ResetPasswordPage from './components/Pages/ResetPasswordPage/ResetPasswordPage';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import UserProfilePage from './components/Pages/UserProfilePage/UserProfilePage';
import RenderFileZone from './components/shared/renderfile/RenderFileZone';
import AlertMessageBox from './components/shared/alertmessagebox/AlertMessageBox';


class App extends React.Component {

  _id:string|number = ""

  
  cookies = new Cookies()

  state = {
    isUserAuthenticate: false,
    userId: this._id
  }

  setUserAsAuthenticate = (isUserAuthenticate:boolean, userId:string|number) => {
    let date = new Date()
    let expirationDate = new Date()
    expirationDate.setMinutes(date.getMinutes() + 7 * 24 * 60)

    this.cookies.set("isAuthenticated", true, {sameSite: true, expires:expirationDate })
  }

  render () {
    return (
      <React.StrictMode>
        <Router>  
          <div className="App">
            <Switch>
                <Route path="/login">
                  {(this.cookies.get("isUserAuthenticate") || this.state.isUserAuthenticate === true)?<Redirect to ="/home"  />: <LoginPage changeAuthenticationState = {this.setUserAsAuthenticate} userId = {this.state.userId}  />}
                </Route>
                <Route path="/home">
                  {/* {(!this.cookies.get("isUserAuthenticate") || this.state.isUserAuthenticate !== true)?<Redirect to ="/login" /> : <HomePage changeAuthenticationState = {this.setUserAsAuthenticate} userId = {this.state.userId}  />} */}
                  <HomePage changeAuthenticationState = {this.setUserAsAuthenticate} userId = {this.state.userId}  />
                </Route>
                <Route path="/register">
                  {(this.cookies.get("isUserAuthenticate") || this.state.isUserAuthenticate === true)?<Redirect to ="/home" /> : <RegisterPage />}
                </Route>
                <Route path="/resetpassword">
                  {(this.cookies.get("isUserAuthenticate") || this.state.isUserAuthenticate === true)? <Redirect to ="/home" /> : <ResetPasswordPage />}
                </Route>
                <Route path="/newpassword">
                  {(this.cookies.get("isUserAuthenticate") || this.state.isUserAuthenticate === true)?<Redirect to ="/home" /> : <NewPasswordPage userId = {this.state.userId}/>}
                </Route>
                <Route path="/shortprofile">
                  <UserProfilePage />
                </Route>
                <Route path="/">
                  <Redirect to ="/login" />
                </Route>
              </Switch>
              <Footer />
              {/* <AlertMessageBox /> */}
              <RenderFileZone />
            </div>
          </Router>
      </React.StrictMode>
    );
  }
}

export default App;
