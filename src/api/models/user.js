/**
 * @file
 * @summary User factory object creators
 */

import { getRole } from '../Utils';

/**
 * @export
 * @function userFields
 * @summary A field factory for creating all the required fields of a user
 * @typedef {Object} User
 *
 * @param {Object} params - the available params
 * @property {Null|Number} [params.id = null] - the user id
 * @property {String} [params.firstname = ''] - the user first name
 * @property {String} [params.lastname = ''] - the user last name
 * @property {String} [params.email = ''] - the user email
 * @property {String} [params.password = ''] - the user password
 * @property {String} [params.role = 'User'] - the user role
 * 
 * @returns {Object} Ticket fields
 */
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

/**
 * @export
 * @function userFieldsError
 * @summary A field factory for creating all the required error states for user fields
 *
 * @param {Object} params - the available params
 * @property {Boolean} [params.firstname = false] - the user first name
 * @property {Boolean} [params.lastname = false] - the user last name
 * @property {Boolean} [params.email = false] - the user email
 * @property {Boolean} [params.password = false] - the user password
 * @property {Boolean} [params.role = false] - the user role
 * 
 * @returns {Object} Ticket fields error states
 */
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