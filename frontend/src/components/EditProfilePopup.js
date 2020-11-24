import React, { useCallback } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { formsValidator } from './FormsValidator.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [formValues, setFormValues] = React.useState({
        userName: "",
        profileDescription: ""
    });

    const [errors, setErrors] = React.useState({
        userNameErrors: {
            required: false,
            minLength: false,
            maxLength: false,
        },
        profileDescriptionErrors: {
            required: false,
            minLength: false,
            maxLength: false,
        }
    });

    const currentUserData = React.useContext(CurrentUserContext);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onUpdateUser({
            name: formValues.userName,
            about: formValues.profileDescription,
        });
    }, [onUpdateUser, formValues]);

    React.useEffect(() => {
        if (currentUserData) {
            setFormValues({
                userName: currentUserData.name,
                profileDescription: currentUserData.about});
        }
    }, [currentUserData]);

    const handleNameChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
        const userNameValidationResult = formsValidator.validateEditProfileNameInput(value);
        setErrors((prevState) => ({...prevState, 
            userNameErrors: userNameValidationResult,
        }));
    }, [setFormValues, setErrors]);

    const handleDescriptionChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({...prevState, [name]: value}));
        const profileDescriptionValidationResult = formsValidator.validateEditProfileDescriptionInput(value);
        setErrors((prevState) => ({...prevState, 
            profileDescriptionErrors: profileDescriptionValidationResult,
        }));
    }, [setFormValues, setErrors]);
 
    return (
        <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        <label className="popup__input">
          <input className="popup__field popup__field_name" value={formValues.userName} onChange={handleNameChange} type="text" name="userName" placeholder="Имя" />
          {errors.userNameErrors.required && <span className="popup__field-error">Пожалуйста, заполните поле</span>}
          {errors.userNameErrors.minLength && <span className="popup__field-error">Минимальная длина имени - 2 символа</span>}
          {errors.userNameErrors.maxLength && <span className="popup__field-error">Максимальная длина имени - 40 символов</span>}
        </label>

        <label className="popup__input">
          <input className="popup__field popup__field_description" value={formValues.profileDescription} onChange={handleDescriptionChange} type="text" name="profileDescription" placeholder="О себе" />
          {errors.profileDescriptionErrors.required && <span className="popup__field-error">Пожалуйста, заполните поле</span>}
          {errors.profileDescriptionErrors.minLength && <span className="popup__field-error">Минимальная длина описания - 2 символа</span>}
          {errors.profileDescriptionErrors.maxLength && <span className="popup__field-error">Максимальная длина описания - 200 символов</span>}
        </label>

      </PopupWithForm>
    );

}

export default EditProfilePopup;