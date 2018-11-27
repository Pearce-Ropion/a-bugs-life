/**
 * @file
 * @summary Constants relating to users and user manipulation
 */

import PropTypes from 'prop-types';

/**
 * @export
 * @enum
 * @constant {Object} UserTypes
 * @summary The available user types
 */
export const UserTypes = {
    TESTER: {
        type: Symbol('Tester'),
        name: 'Tester',
    },
    DEVELOPER: {
        type: Symbol('Developer'),
        name: 'Developer',
    },
    MANAGER: {
        type: Symbol('Manager'),
        name: 'Manager',
    },
    USER: {
        type: Symbol('User'),
        name: 'User',
    },
    NONE: {
        type: Symbol('None'),
        name: 'None',
    },
};

/**
 * @export
 * @enum
 * @constant {Object} EmployeeTypes
 * @summary The available employee types
 */
export const EmployeeTypes = {
    TESTER: UserTypes.TESTER,
    DEVELOPER: UserTypes.DEVELOPER,
    MANAGER: UserTypes.MANAGER,
    USER: UserTypes.USER,
};

/**
 * @export
 * @constant {Object} UserProps
 * @summary The available property types of a single user
 */
export const UserProps = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
};

/**
 * @export
 * @constant {Object} UserProps
 * @summary The available property types of the current user
 */
export const CurrentUserProps = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(Object.values(UserTypes)),
}

/**
 * @export
 * @constant {Array} UserDropdownOptions
 * @summary The available employee types to be used in dropdown menus
 */
export const UserDropdownOptions = Object.keys(EmployeeTypes)
    .map(user => {
        return {
            key: EmployeeTypes[user].name,
            value: EmployeeTypes[user].name,
            text: EmployeeTypes[user].name,
        };
    });
