import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({ isOpen, onClose, onDeletionConfirm }) {
    return (
        <PopupWithForm title="Вы уверены?" name="delete-card" isOpen={isOpen} onClose={onClose} onSubmit={onDeletionConfirm}>
            
        </PopupWithForm>
    );

}

export default DeleteCardPopup;