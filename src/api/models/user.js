import { UserTypes } from '../constants/Users';

export const userFields = ({
    id = null,
    firstname = '',
    lastname = '',
    email = '',
    password = '',
    role = UserTypes.USER,
}) => {
    return {
        id,
        firstname,
        lastname,
        email,
        password,
        role,
    }
};

export const userFieldsError = ({
    firstname = false,
    lastname = false,
    email = false,
    password = false,
    role = false,
}) => {
    return {
        firstname,
        lastname,
        email,
        password,
        role,
    }
};