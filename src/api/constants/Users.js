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
    USER: UserTypes.USER,
};

export const UserProps = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
};

export const CurrentUserProps = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(Object.values(UserTypes)),
}

export const UserDropdownOptions = Object.keys(EmployeeTypes)
    .map(user => {
        return {
            key: EmployeeTypes[user].name,
            value: EmployeeTypes[user].name,
            text: EmployeeTypes[user].name,
        };
    });
