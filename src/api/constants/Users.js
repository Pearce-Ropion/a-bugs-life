import PropTypes from 'prop-types';

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

export const EmployeeTypes = {
    TESTER: UserTypes.TESTER,
    DEVELOPER: UserTypes.DEVELOPER,
    MANAGER: UserTypes.MANAGER,
};

export const Credentials = {
    USER: {
        type: UserTypes.USER,
        name: 'User',
        username: 'user',
        password: 'user',
    },
    TESTER: {
        type: UserTypes.TESTER,
        name: 'Tester',
        username: 'tester',
        password: 'tester',
    },
    DEVELOPER: {
        type: UserTypes.DEVELOPER,
        name: 'Developer',
        username: 'developer',
        password: 'developer',
    },
    MANGER: {
        type: UserTypes.MANAGER,
        name: 'Manager',
        username: 'manager',
        password: 'manager',
    },
};

export const UserProps = PropTypes.oneOf(Object.values(UserTypes));

export const UserDropdownOptions = Object.keys(EmployeeTypes)
    .map(user => {
        console.log(user);
        return {
            key: EmployeeTypes[user].name,
            value: EmployeeTypes[user].name,
            text: EmployeeTypes[user].name,
        };
    });
