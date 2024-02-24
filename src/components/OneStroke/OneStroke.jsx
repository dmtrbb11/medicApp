import React from "react";
import s from "./OneStroke.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../slices/modalSlice";
import { editUser } from "../../slices/modalSlice";
import { userDataSave } from "../../slices/modalSlice";

const OneStroke = (props) => {
  const dispatch = useDispatch();
  const buttonStyle = {
    background: props.isEditable === true ? "" : "#F2F2F7",
  };

  const stroke_chage = (name, lastName, indexNumber, edit, mail, gender) => {
    // const currentUserData = {
    //   indexNumber: indexNumber,
    //   name: name,
    //   surName: lastName,
    //   email: mail,
    //   gender: gender,
    //   editable: edit,
    // };
    dispatch(editUser(true));
    dispatch(openModal(true));
    dispatch(userDataSave({ name, lastName, indexNumber, edit, mail, gender }));
  };

  return (
    <div className={s.stroke_wrapper}>
      <div className={s.stroke_number}>{props.indexNumber}</div>
      <div className={s.stroke_surname}>{props.lastName}</div>
      <div className={s.stroke_name}>{props.name}</div>
      <div className={s.stroke_gender}>{props.gender}</div>
      <div className={s.stroke_mail}>{props.mail}</div>
      <div className={s.stroke_action}>
        <button
          disabled={props.isEditable === true ? false : true}
          onClick={() =>
            stroke_chage(
              props.name,
              props.lastName,
              props.indexNumber,
              props.isEditable,
              props.mail,
              props.gender
            )
          }
          style={buttonStyle}
          className={s.action_btn}
        >
          Редактировать
        </button>
      </div>
    </div>
  );
};

export default OneStroke;
