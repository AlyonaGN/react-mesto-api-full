import React, { useCallback } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {

    const [formValues, setFormValues] = React.useState({
        link: "",
        description: ""
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({...prevState, [name]: value}));
    }, [setFormValues]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onAddCard({
            link: formValues.link,
            photoDescription: formValues.description,
        });
    }, [onAddCard, formValues]);

     React.useEffect(() => {
        if (!isOpen) {
            setFormValues({
                link: "",
                description: ""
            });
        }
    }, [isOpen]);  

    return (
        <PopupWithForm title="Новое место" name="add-photo" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="popup__input">
                <input className="popup__field popup__field_photo-description" value={formValues.description} onChange={handleInputChange} type="text" placeholder="Название" name="description" minLength="1" maxLength="30" required />
                <span className="popup__field-error"></span>
            </label>

            <label className="popup__input">
                <input className="popup__field popup__field_photo-link" value={formValues.link} onChange={handleInputChange} type="url" placeholder="Ссылка на картинку" name="link" required />
                <span className="popup__field-error"></span>
            </label>

        </PopupWithForm>
    );

}

export default AddPlacePopup;