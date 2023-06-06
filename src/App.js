import React  from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ROUTES} from './routes/routes'

import HomePage from './pages/Home'
import LoginPage from './pages/Login/components/LoginPage'
import RegisterPage from './pages/Register/components/RegisterPage'
import ProfilePage from './pages/Profile/components/ProfilePage'
import PasswordResetPage from './pages/PasswordReset/components/PasswordResetPage'
import EditUserPage from './pages/EditUser';
import NoteListPage from './pages/NoteList';
import NoteInfoPage from './pages/NoteInfo';
import NoteAddPage from './pages/NoteAdd';
import NoteEditPage from './pages/NoteEdit';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path={ROUTES.HOME} element={<HomePage/>} />
              <Route exact path={ROUTES.LOGIN} element={<LoginPage/>} />
              <Route exact path={ROUTES.REGISTER} element={<RegisterPage/>} />
              <Route exact path={ROUTES.PROFILE} element={<ProfilePage/>} />
              <Route exact path={ROUTES.PROFILEUPD} element={<EditUserPage />} />
              <Route exact path={ROUTES.PASSWORDRESET} element={<PasswordResetPage/>} />
              <Route exact path={ROUTES.NOTELIST} element={<NoteListPage/>} />
              <Route exact path={ROUTES.NOTEINFO} element={<NoteInfoPage/>} />
              <Route exact path={ROUTES.NOTEADD} element={<NoteAddPage/>} />
              <Route exact path={ROUTES.NOTEEDIT} element={<NoteEditPage/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
