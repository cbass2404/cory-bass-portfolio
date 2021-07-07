const emailRegex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

export const isValidInput = (input: string): boolean => {
    const isValid = input.trim() === '' || !input ? false : true;

    return isValid;
};

export const isValidEmail = (input: string): boolean => {
    const isValid = emailRegex.test(input);

    return isValid;
};

export const isValidPassword = (input: string): boolean => {
    const isValid = passwordRegex.test(input);

    return isValid;
};
