import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Auth } from "./components/Auth/Auth";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useUnit } from "effector-react";
import { $auth, setAuth, setUsername } from "./context/auth";
import { CostsPage } from "./components/Costs/Costs";
import { getAuthDataFromLS, removeUser } from "./utils";

function App() {
  const [count, setCount] = useState(0);
  const isLoggedIn = useUnit($auth);

  useEffect(() => {
    const auth = getAuthDataFromLS();
    if (!auth || !auth.access_token || !auth.refresh_token) {
      removeUser();
    } else {
      setAuth(true);
      setUsername(auth.username);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to={"/costs"} /> : <Navigate to="login" />
            }
          ></Route>
          <Route
            path="/registration"
            element={
              isLoggedIn ? (
                <Navigate to={"/costs"} />
              ) : (
                <Auth type="registration" />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to={"/costs"} /> : <Auth type="login" />
            }
          ></Route>
          <Route
            path="/costs"
            element={isLoggedIn ? <CostsPage /> : <Navigate to={"/login"} />}
          ></Route>
        </Routes>
      </Router>
      Hello
    </div>
  );
}

export default App;
