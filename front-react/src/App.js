import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Default from './Layouts/Default'
import Auth from './Layouts/Auth'
import Admin from "./Layouts/Admin"

import Home from './pages/Home'

import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Active from './pages/auth/Active'

import MyAccount from './pages/account/Show'

import HomeAdmin from './pages/admin/Home'
import UsersIndexAdmin from './pages/admin/users/Index'
import UsersShowAdmin from './pages/admin/users/Show'
import UsersEditAdmin from './pages/admin/users/Edit'


import Toast from './components/layouts/Toast'

import { setUserPending, setUserSuccess, setUserFail } from './redux/slices/authSlice'
import { getAPI } from './services/FetchData'

function App() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.auth)

  const getUser = useCallback( async() => {
    try {
      dispatch(setUserPending())
      const res = await getAPI("auth/refresh_token")
      dispatch(setUserSuccess(res.data)) // verifier qu'il y bien les bonne info 
    } catch(err) {
      dispatch(setUserFail("Vous n'êtes pas authentifié"))
    }
  }, [dispatch] )

  useEffect(() => {
    if(!isAuth) {
      getUser()
    }

  
  }, [dispatch, getUser, isAuth])

  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route exact path="/">
          <Default>
            <Home />
          </Default>
        </Route>
        <Route exact path="/my-account">
          <Default isPrivate={true}>
            <MyAccount />
          </Default>
        </Route>
        <Route path="/login">
          <Auth>
            <Login />
          </Auth>
        </Route>
        <Route path="/logout">
          <Auth>
            <Logout />
          </Auth>
        </Route>
        <Route path="/register">
          <Auth>
            <Register />
          </Auth>
        </Route>
        <Route path="/forgot_password">
          <Auth>
            <ForgotPassword />
          </Auth>
        </Route>
        <Route path="/reset_password/:reset_token">
          <Auth>
            <ResetPassword />
          </Auth>
        </Route>
        <Route path="/active/:slug">
          <Auth>
            <Active />
          </Auth>
        </Route>

        <Route exact path="/admin">
          <Admin>
            <HomeAdmin />
          </Admin>
        </Route>
        <Route exact path="/admin/users">
          <Admin>
            <UsersIndexAdmin />
          </Admin>
        </Route>
        <Route exact path="/admin/users/:userId/edit">
          <Admin>
            <UsersEditAdmin />
          </Admin>
        </Route>
        <Route exact path="/admin/users/:userId">
          <Admin>
            <UsersShowAdmin />
          </Admin>
        </Route>
      </Switch>
      <Toast />
    </Router>
  );
}

export default App;
