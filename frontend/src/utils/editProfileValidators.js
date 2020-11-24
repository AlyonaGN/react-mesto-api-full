export const editProfileValidators = {
    userName: {
      required: (value) => {
        return value === "";
      },
      minLength: (value) => {
        return value.length < 2;
      },
      maxLength: (value) => {
        return value.length > 40;
      }
    },
    profileDescription: {
      required: (value) => {
        return value === "";
      },
      minLength: (value) => {
        return value.length < 2;
      },
      maxLength: (value) => {
        return value.length > 200;
      }
    }
  };