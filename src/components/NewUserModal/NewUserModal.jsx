import React, { useState } from "react";
import s from "./NewUserModal.module.scss";
import closeImg from "../../img/close.svg";
import deleteIcon from "../../img/deleted.png";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../slices/modalSlice";
import { addUser } from "../../slices/userSlice";
import { deleteUserFunction } from "../../slices/userSlice";
import { closeAndDeleteDataModal } from "../../slices/modalSlice";
import { saveEditedUser } from "../../slices/userSlice";

const NewUserModal = () => {
  const dispatch = useDispatch();
  const editableState = useSelector((state) => state.modalReducer.editable);
  const oneUserData = useSelector((state) => state.modalReducer.userData);

  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState(
    oneUserData.name === undefined ? "" : oneUserData.name
  );
  const [surNameError, setSurNameError] = useState(false);
  const [surName, setSurName] = useState(
    oneUserData.lastName === undefined ? "" : oneUserData.lastName
  );
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState(
    oneUserData.mail === undefined ? "" : oneUserData.mail
  );
  const [gender, setGender] = useState(
    oneUserData.gender === undefined ? "Мужчина" : oneUserData.gender
  );

  const nameInputHandler = (e) => {
    const value = e.target.value;
    if (!/^[а-яА-ЯёЁ-]{0,25}$/.test(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(value);
  };
  const surNameInputHandler = (e) => {
    const value = e.target.value;
    if (!/^[а-яА-ЯёЁ-]{0,25}$/.test(value)) {
      setSurNameError(true);
    } else {
      setSurNameError(false);
    }
    setSurName(value);
  };
  const emailInputHandler = (e) => {
    const value = e.target.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(value);
  };
  const genderInputHandler = (e) => {
    const value = e.target.value;
    setGender(value);
  };
  const deleteUser = () => {
    
    dispatch(deleteUserFunction(oneUserData.mail));
    dispatch(closeModal(false));
    dispatch(closeAndDeleteDataModal());

  };
  const closeAndDeleteModal = () => {
    dispatch(closeAndDeleteDataModal());
    dispatch(closeModal(false));
  };
  const saveUser = (name, surName, email, gender) => {
    const pochta = oneUserData.mail;
    const user = {
      name: name,
      surName: surName,
      email: email,
      gender: gender,
      editable: true,
    };
    if (editableState === false) {
      dispatch(addUser(user));
    }
    if (
      gender !== oneUserData.gender ||
      name !== oneUserData.name ||
      email !== oneUserData.mail ||
      surName !== oneUserData.lastName
    ) {
      dispatch(saveEditedUser({ pochta, user }));
    }

    dispatch(closeModal(false));
  };

  return (
    <div className={s.container}>
      <div className={s.modal_wrapper}>
        <div className={s.modal_header}>
          <p>Новый пользователь</p>
          <img
            src={closeImg}
            alt="React Logo"
            onClick={() => closeAndDeleteModal()}
          />
        </div>
        <div className={s.genderBlock_wrapper}>
          <label className={s.gender_box}>
            <input
              type="radio"
              checked={gender === "Мужчина"}
              value="Мужчина"
              onChange={genderInputHandler}
            />
            <div className={s.gender_text}>Мужчина</div>
          </label>
          <label className={s.gender_box}>
            <input
              type="radio"
              name="radio"
              value="Женщина"
              checked={gender === "Женщина"}
              onChange={genderInputHandler}
            />
            <div className={s.gender_text}>Женщина</div>
          </label>
        </div>
        <div className={s.dataInputs_wrapper}>
          <input
            className={s.surname_input}
            type="text"
            placeholder="Фамилия*"
            style={{
              borderBottom: surNameError
                ? "1px solid #FF0000"
                : "1px solid #e5e5ea",
            }}
            value={surName}
            onChange={surNameInputHandler}
          />
          <input
            className={s.name_input}
            type="text"
            placeholder="Имя*"
            style={{
              borderBottom: nameError
                ? "1px solid #FF0000"
                : "1px solid #e5e5ea",
            }}
            value={name}
            onChange={nameInputHandler}
          />
          <input
            className={s.mail_input}
            type="text"
            placeholder="Email*"
            style={{
              borderBottom: emailError
                ? "1px solid #FF0000"
                : "1px solid #e5e5ea",
            }}
            value={email}
            onChange={emailInputHandler}
          />
          {nameError || surNameError || emailError ? (
            <span className={s.error_message}>
              *Некоторые поля заполнены не корректно
            </span>
          ) : (
            ""
          )}
        </div>
        {editableState ? (
          <div className={s.buttons_wrapper}>
            <button onClick={() => deleteUser()} className={s.delete_btn}>
              <img src={deleteIcon} alt="" />
            </button>
            <button
              style={{
                opacity:
                  name.length === 0 ||
                  surName.length === 0 ||
                  email.length === 0 ||
                  nameError ||
                  surNameError ||
                  emailError
                    ? 0.5
                    : 1,
              }}
              disabled={
                name.length === 0 ||
                surName.length === 0 ||
                email.length === 0 ||
                nameError ||
                surNameError ||
                emailError
                  ? true
                  : false
              }
              onClick={() => saveUser(name, surName, email, gender)}
              className={s.save_btn_edit}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <button
            style={{
              opacity:
                name.length === 0 ||
                surName.length === 0 ||
                email.length === 0 ||
                nameError ||
                surNameError ||
                emailError
                  ? 0.5
                  : 1,
            }}
            disabled={
              name.length === 0 ||
              surName.length === 0 ||
              email.length === 0 ||
              nameError ||
              surNameError ||
              emailError
                ? true
                : false
            }
            onClick={() => saveUser(name, surName, email, gender)}
            className={s.save_btn}
          >
            Сохранить
          </button>
        )}
      </div>
    </div>
  );
};

export default NewUserModal;
