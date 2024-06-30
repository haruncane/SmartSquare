import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AccountPage from "./pages/AccountPage/AccountPage";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Routes>
        {user ? 
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/account" element={<AccountPage />} />
        </> : 
        <>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/favorites" element={<Navigate to="/" />} />
          <Route path="/account" element={<Navigate to="/" />} />
        </>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
