import React, { useState } from "react";
import s from "./auth.module.scss";
import { Link } from "react-router-dom";

const Auth = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(0.5);
  const [isDisabled, setIsDisabled] = useState(true);
  const handleInputChange = (e) => {
    const regex = /^[a-zA-Z]+$/;
    const value = e.target.value;

    if (!regex.test(value) && value.length > 0) {
      setButtonOpacity(0.5);
      setErrorModal(true);
      setIsDisabled(true);
    } else {
      setButtonOpacity(1);
      setErrorModal(false);
      setIsDisabled(false);
    }
    if (value.length <= 0) {
      setButtonOpacity(0.5);
    }

    setInputValue(value);
  };
  const save_seed = (e) => {
    localStorage.setItem("seed", inputValue);
    props.setIsAuthenticated(!!localStorage.getItem("seed"));
  };

  return (
    <div className={s.auth_wrapper}>
      <div className={s.auth_block}>
        <h3 className={s.title}>Добро пожаловать</h3>
        <div className={s.inputBtn_wrapper}>
          <div className={s.input_wrapper}>
            <label>Seed</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            {errorModal ? (
              <p className={s.error}>*Поле заполнено не корректно</p>
            ) : (
              ""
            )}
          </div>
          <Link to="/usersTable">
            <button
              style={{ opacity: buttonOpacity }}
              disabled={isDisabled}
              className={s.auth_btn}
              onClick={save_seed}
            >
              Войти
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
