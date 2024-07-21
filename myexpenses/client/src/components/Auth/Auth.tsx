import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { MutableRefObject, useRef, useState } from "react";
import { AuthClient } from "../../api/authClient";
import { Spinner } from "../Spinner/Spinner";

interface IAuthProps {
  type: "login" | "registration";
}

export const Auth = ({ type }: IAuthProps) => {
  const [spinner, setSpinner] = useState(false);
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const currentAuthTitle = type === "login" ? "Войти" : "Регистрация";

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) return;

    const result = await AuthClient.login(username, password);
    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);

    navigate("/costs");

    console.info({ text: "Вход выполнен" });
  };

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) return;
    if (password.length < 4) return;

    const result = await AuthClient.registration(username, password);

    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);

    navigate("/login");
    console.info({ text: "Регистрация выполнено" });
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    switch (type) {
      case "login":
        handleLogin(usernameRef.current.value, passwordRef.current.value);
        break;
      case "registration":
        handleRegistration(
          usernameRef.current.value,
          passwordRef.current.value
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form className="form-group" onSubmit={handleAuth}>
        <label className="auth-label">
          Введите имя пользователя
          <input ref={usernameRef} className="form-control" />
        </label>
        <label className="auth-label">
          Введите пароль
          <input ref={passwordRef} className="form-control" />
        </label>
        <button className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
        </button>
      </form>
      {type === "login" ? (
        <div>
          <span className="question-text">Ещё нет аккаунта?</span>
          <Link to={"/registration"}>Зарегистрироваться</Link>
        </div>
      ) : (
        <div>
          <span className="question-text">Уже есть аккаунт?</span>
          <Link to={"/login"}>Войти</Link>
        </div>
      )}
    </div>
  );
};
