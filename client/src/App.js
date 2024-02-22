import React, { createContext, useState } from "react";
import './stylesheets/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CreatePost from './pages/CreatePost';
import UpdatePost from "./pages/UpdatePost";
import CategoryPage from "./pages/CategoryPage";
import HatePage from "./pages/HatePage";
import PoliticsPage from "./pages/PoliticsPage";
import LovePage from "./pages/LovePage";
import OthersPage from "./pages/OthersPage";
import AboutUs from "./pages/About";
import ContactUs from "./pages/Contact";
export const AuthContext = createContext();

const App = () => {
  const [auth, setAuth] = useState(null);
  const [refresh,setRefresh] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth,refresh,setRefresh }}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/update/:id" element={<UpdatePost />} />
            <Route path="/category/hate" element={<HatePage />} />
            <Route path="/category/love" element={<LovePage />} />
            <Route path="/category/other" element={<OthersPage />} />
            <Route path="/category/politics" element={<PoliticsPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
