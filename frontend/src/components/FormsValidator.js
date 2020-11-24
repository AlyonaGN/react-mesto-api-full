import { editProfileValidators } from '../utils/editProfileValidators.js';


class FormsValidator {

    validateEditProfileNameInput(nameInputValue) {
        const result = {};
        Object.keys(editProfileValidators.userName)
            .forEach((errorKey) => {
                const errorResult = editProfileValidators.userName[errorKey](nameInputValue);
                result[errorKey] = errorResult;
            });
        return result;
    }

    validateEditProfileDescriptionInput(descriptionInputValue) {
        const result = {};
        Object.keys(editProfileValidators.profileDescription)
            .forEach((errorKey) => {
                const errorResult = editProfileValidators.profileDescription[errorKey](descriptionInputValue);
                result[errorKey] = errorResult;
            });
        return result;
    }   
}

export const formsValidator = new FormsValidator();