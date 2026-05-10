// Current hardcoded user data in the system
const validUser = {
    username: "Sh",
    password: "123"
};

/**
 * Compare the entered credentials with the stored user data
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
export function authenticate(username, password) {
    return username === validUser.username && password === validUser.password;
}