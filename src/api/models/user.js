import { UserTypes } from '../constants/Users';
import { getRole } from '../Utils';

export const userFields = ({
    id = null,
    firstname = '',
    lastname = '',
    email = '',
    password = '',
    role = 'User',
}) => {
    return {
        id,
        firstname,
        lastname,
        email,
        password,
        role: getRole(role),
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