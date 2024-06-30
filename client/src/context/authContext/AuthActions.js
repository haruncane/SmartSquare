export const loginStart = () => ({
    type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const loginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const logout = () => ({
    type: "LOGOUT",
});

export const registerStart = () => ({
    type: "REGISTER_START",
});

export const registerSuccess = (user) => ({
    type: "REGISTER_SUCCESS",
    payload: user,
});

export const registerFailure = () => ({
    type: "REGISTER_FAILURE",
});

export const addCategoryStart = () => ({
    type: "ADD_CATEGORY_START",
});

export const addCategorySuccess = (id) => ({
    type: "ADD_CATEGORY_SUCCESS",
    payload: id,
});

export const addCategoryFailure = () => ({
    type: "ADD_CATEGORY_FAILURE",
});

export const getUserStart = () => ({
    type: "GET_USER_START",
});

export const getUserSuccess = (id) => ({
    type: "GET_USER_SUCCESS",
    payload: id,
});

export const getUserFailure = () => ({
    type: "GET_USER_FAILURE",
});

export const deleteUserStart = () => ({
    type: "DELETE_USER_START",
});

export const deleteUserSuccess = (id) => ({
    type: "DELETE_USER_SUCCESS",
    payload: id,
});

export const deleteUserFailure = () => ({
    type: "DELETE_USER_FAILURE",
});