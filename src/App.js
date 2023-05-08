import React  from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import HomePage from './pages/Home'
import LoginPage from './pages/Login/components/LoginPage'
import RegisterPage from './pages/Register/components/RegisterPage'
import ProfilePage from './pages/Profile/components/ProfilePage'
import PasswordResetPage from './pages/PasswordReset/components/PasswordResetPage'
import UserListPage from './pages/UserList/components/UserListPage'

import {ROUTES} from './routes/routes'

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path={ROUTES.HOME} element={<HomePage/>} />
              <Route exact path={ROUTES.LOGIN} element={<LoginPage/>} />
              <Route exact path={ROUTES.REGISTER} element={<RegisterPage/>} />
              <Route exact path={ROUTES.PROFILE} element={<ProfilePage/>} />
              <Route exact path={ROUTES.PASSWORDRESET} element={<PasswordResetPage/>} />
              <Route exact path={ROUTES.USERLIST} element={<UserListPage/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
