import React, { useEffect, useState } from "react";
import s from "./usersTable.module.scss";
import OneStroke from "../OneStroke/OneStroke";
import axios from "axios";
import NewUserModal from "../NewUserModal/NewUserModal";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../slices/modalSlice";
import { editUser } from "../../slices/modalSlice";
import { setLocalState } from "../../slices/userSlice";

const UsersTable = (props) => {
  const seed = localStorage.getItem("seed");
  const randomUsers = `https://randomuser.me/api/?seed=${seed}&inc=gender,name,email&results=30`;
  const [usersInfo, setUserInfo] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(randomUsers);
        setUserInfo(response.data.results);
        setLoaded(true);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("users")) === null) {
      dispatch(setLocalState(true));
    } else {
      dispatch(setLocalState(false));
    }
  }, []);

  const addUserModal = () => {
    dispatch(openModal(true));
    dispatch(editUser(false));
  };
  const exit = () => {
    localStorage.removeItem("seed");
    localStorage.removeItem("users");
    props.setIsAuthenticated(!!localStorage.getItem("seed"));
  };

  const reduxUsers = useSelector((state) => state.userReducer.users);
  const modalState = useSelector((state) => state.modalReducer.open);
  const dispatch = useDispatch();
  const allUsers = [...reduxUsers, ...usersInfo];

  return (
    <div className={s.table_wrapper}>
      <header className={s.header}>
        <h3>Бобров Дмитрий Валерьевич</h3>
        <div className={s.btns_wrapper}>
          <button className={s.addUser_btn} onClick={addUserModal}>
            Добавить пользователя
          </button>
          <button className={s.exit_btn} onClick={exit}>
            Выйти
          </button>
        </div>
      </header>
      <section className={s.userTable_wrapper}>
        <div className={s.table_header}>
          <div className={s.table_number}>№</div>
          <div className={s.table_surname}>Фамилия</div>
          <div className={s.table_name}>Имя</div>
          <div className={s.table_gender}>Пол</div>
          <div className={s.table_mail}>Почта</div>
          <div className={s.table_action}>Действие</div>
        </div>

        {loaded ? (
          allUsers.map((obj, index) => {
            if (obj.hasOwnProperty("editable")) {
              return (
                <OneStroke
                  key={index}
                  indexNumber={index + 1}
                  lastName={obj.lastName}
                  name={obj.name}
                  gender={obj.gender}
                  mail={obj.email}
                  isEditable={obj.editable}
                />
              );
            } else {
              return (
                <OneStroke
                  key={index}
                  indexNumber={index + 1}
                  lastName={obj.name.last}
                  name={obj.name.first}
                  gender={obj.gender}
                  mail={obj.email}
                />
              );
            }
          })
        ) : (
          <div className={s.data_loader}>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </section>
      {modalState ? (
        <div className={s.bg_fon}>
          <NewUserModal />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UsersTable;
