import React from 'react';
import successImgPath from '../images/successReg.png';
import unsuccessImgPath from '../images/unsuccessReg.png';

function RegistrationResultsPopup({onClose, isOpen, isRegSuccessfull}) {
    return (
        <div className={`popup ${isOpen && `popup_opened`}`} >
        
            <div className ="popup__window">

            <button type="button" className="popup__close-button" onClick={onClose}></button>
     
            <img className="popup__reg-picture" src={isRegSuccessfull ? successImgPath : unsuccessImgPath} alt="здесь должна быть картинка, но что-то пошло не так" />
            <h2 className="popup__header popup__header_centered">{
                isRegSuccessfull ? 
                `Вы успешно\nзарегистрировались!` : `Что-то пошло не так!\nПопробуйте ещё раз.`}</h2>
        </div>

    </div>
    );
}

export default RegistrationResultsPopup;