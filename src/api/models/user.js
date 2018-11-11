import { UserTypes } from '../constants/Users';
import { getUser } from '../Utils';

export const userFields = ({
    id = null,
    firstname = '',
    lastname = '',
    email = 'm@m.com',
    password = 'manager1',
    role = 'User',
}) => {
    return {
        id,
        firstname,
        lastname,
        email,
        password,
        role: getUser(role),
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