import './App.css';
import {useState} from 'react'
import { Routes,Route } from 'react-router-dom';
import UserGrid from './component/userGrid/UserGrid';
import AddEditUser from './component/AddEditUser/AddEditUser';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<UserGrid />}/>
        <Route path='/add-user' element={<AddEditUser />} />
        <Route path='/edit-user/:id' element={<AddEditUser />} />
        <Route path='/view-user/:id' element={<AddEditUser />} />
      </Routes>
    </div>
  );
}

export default App;
