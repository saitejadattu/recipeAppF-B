import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UpdateRecipe from './UpdateRecipe';
import AddRecipe from './AddRecipe';
import ProtechtedRoute from './ProtechtedRoute.js';
import NotFound from './NotFound/index.js';
const App = () => {
  return (
    <BrowserRouter v7_startTransition={true}>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route exact element={<Signup />} path="/signup" />
        <Route element={<ProtechtedRoute />}>
          <Route exact element={<Home />} path="/home" />
          <Route exact element={<UpdateRecipe />} path="/update/:id" />
          <Route exact element={<AddRecipe />} path="/add" />
        </Route>
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
