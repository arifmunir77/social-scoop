import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NewOrderPage from "../NewOrderPage/NewOrderPage.jsx";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage.jsx";
import AuthPage from "../AuthPage/AuthPage.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      {/* NavBar and Routes are only available when the user is logged in */}
      {/* <NavBar user={user} setUser={setUser} /> */}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/orders/new" element={<NewOrderPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
