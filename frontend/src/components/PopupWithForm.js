import React from 'react';

function PopupWithForm(props) {

let buttonName;

switch(props.name){
  case "add-photo": 
    buttonName = "Создать";
    break;
  case "delete-card": 
    buttonName = "Да";
    break;
  default: 
    buttonName = "Сохранить";
    break;
}
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && `popup_opened`}`} >
        
        <form className ="popup__form" name={`${props.name}`} noValidate>

        <button type="button" className="popup__close-button" onClick={props.onClose}></button>

        <h2 className="popup__header">{`${props.title}`}</h2>
        
        {props.children}

        <button type="button" onClick={props.onSubmit} className="popup__submit-button">{buttonName}</button>

        </form>

    </div>
  );
}

export default PopupWithForm;