import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import UserBooks from './components/UserBooks';
import PrymirnyksPage from './components/PrymirnyksPage'
import MyBooks from './components/MyBooks';
import LibraryBooks from './components/LibraryBooks'
import PrymirnyksPageLibrary from './components/PrymirnyksPageLibrary'
import CategoryPage from './components/CategoryPage';
import BooksByGaluzPage from './components/BooksByGaluzPage';
import CreateBookPage from './components/CreateBookPage';
import ApprovePage from './components/ApprovePage';
import TakenPrymPage from './components/TakenPrymPage';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import EditPrymPage from './components/EditPrymPage';
import CreatePrymPage from './components/CreatePrymPage';
import AuthorsPage from './components/AuthorsPage';
import CategoriesPage from './components/CategoriesPage';
import ActPage from './components/ActPage';
import AdminPage from './components/AdminPage';
import ManagePage from './components/ManagePage';

function setToken(userToken) {
  window.sessionStorage.setItem('token', JSON.stringify(userToken));
}

function setRole(userRole){
  window.sessionStorage.setItem('role', JSON.stringify(userRole));
}

function getToken() {
  const tokenString = window.sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken ? userToken : false
}

function getRole() {
  const roleString = window.sessionStorage.getItem('role');
  const userRole = JSON.parse(roleString);
  return userRole ? userRole : false
}

export default function App() {
  const token = getToken()
  const role = getRole()

  if (!token){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setRole={setRole} />} />
          <Route path="/" element={<LoginForm setToken={setToken} setRole={setRole} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if(role == "READER"){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CategoryPage token={token} />} />
          <Route path="/books" element={<BooksByGaluzPage token={token} />} />
          <Route path="/prymir" element={<PrymirnyksPage token={token}/>}/>
          <Route path="/my" element={<MyBooks token={token} />} />
        </Routes>
      </BrowserRouter>
    )
  }

  if(role == "LIBRARY"){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LibraryBooks token={token} />} />
          <Route path="/prymir" element={<PrymirnyksPageLibrary token={token} />} />
          <Route path="/createBook" element={<CreateBookPage token={token}/>}/>
          <Route path="/requests" element={<ApprovePage token={token}/>}/>
          <Route path="/taken" element={<TakenPrymPage token={token}/>}/>
          <Route path="/prymir/edit" element={<EditPrymPage token={token}/>}/>
          <Route path="/prymir/create" element={<CreatePrymPage token={token}/>}/>
          <Route path="/authors" element={<AuthorsPage token={token} />}/>
          <Route path='/categories' element={<CategoriesPage token={token}/>}/>
          <Route path='/akt' element={<ActPage token={token}/>}/>
        </Routes>
      </BrowserRouter>
    )
  }

  if(role == "ADMIN"){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPage token={token} />} />
          <Route path="/manage" element={<ManagePage token={token}/>} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setRole={setRole} />} />
          <Route path="/" element={<LoginForm setToken={setToken} setRole={setRole} />} />
        </Routes>
      </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
