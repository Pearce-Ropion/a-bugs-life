// Things to implement

// Post request to "/api/users/get"
// Sent
const request = {
    email: 'email@email.email',
    password: 'password',
};
// Received
const received = {
    valid: true,
    user: {
        id: 0,
        name: 'first last',
        email: 'email@email.email',
        role: 'user',
    },
}
// OR
const received = {
    valid: false,
}

/**
 * =====================/////==================
 */

// Get request sent to "/api/users/all"
// Received (no password b/c security)
const received = {
    users: [
        {
            id: 0,
            name: 'first last',
            email: 'email@email.email',
            role: 'user',
        },
    ],
}

