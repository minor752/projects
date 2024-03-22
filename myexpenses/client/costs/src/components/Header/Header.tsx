import { useUnit } from "effector-react";
import { useTheme } from "../../hooks";
import { $auth, $username } from "../../context/auth";
import { removeUser } from "../../utils";

export const Header = () => {
  const { switchTheme, theme } = useTheme();
  const username = useUnit($username);
  const isLoggedIn = useUnit($auth);

  return (
    <header
      className={`navbar navbar-dark bg-${
        theme === "dark" ? "dark" : "primary"
      }`}
    >
      <div className="container">
        <h1 style={{ color: "white" }}>Costs App</h1>
        {username.length ? <h2 style={{ color: "white" }}>{username}</h2> : ""}
        <button
          onClick={switchTheme}
          className={`btn btn-${theme === "dark" ? "light" : "dark"}`}
        >
          Go {theme === "dark" ? "light" : "dark"}
        </button>
        {isLoggedIn && (
          <button onClick={removeUser} className="btn btn-primary">
            Выход
          </button>
        )}
      </div>
    </header>
  );
};
