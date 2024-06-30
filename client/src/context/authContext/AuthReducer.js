const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user:  null,
                isFetching: false,
                error: false,
            }
        case "REGISTER_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "REGISTER_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "REGISTER_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "ADD_CATEGORY_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "ADD_CATEGORY_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "ADD_CATEGORY_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case "GET_USER_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "GET_USER_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_USER_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case "DELETE_USER_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DELETE_USER_SUCCESS":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        case "DELETE_USER_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default AuthReducer;