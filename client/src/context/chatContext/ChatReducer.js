const ChatReducer = (state, action) => {
    switch (action.type) {
        case "GET_CHATS_START":
            return {
                chats: [],
                chat: null,
                isFetching: true,
                error: false,
            };
        case "GET_CHATS_SUCCESS":
            return {
                chats: action.payload,
                chat: null,
                isFetching: false,
                error: false,
            };
        case "GET_CHATS_FAILURE":
            return {
                chats: [],
                chat: null,
                isFetching: false,
                error: true,
            };
        case "CREATE_CHAT_START":
            return {
                ...state,
                chat: null,
                isFetching: true,
                error: false,
            };
        case "CREATE_CHAT_SUCCESS":
            return {
                chats: [...state.chats, action.payload],
                chat: action.payload,
                isFetching: false,
                error: false,
            };
        case "CREATE_CHAT_FAILURE":
            return {
                ...state,
                chat: null,
                isFetching: true,
                error: true,
            };
        case "GET_ LAST_CREATED_CHAT_START":
            return {
                ...state,
                chat: null,
                isFetching: true,
                error: false,
            };
        case "GET_ LAST_CREATED_CHAT_SUCCESS":
            return {
                ...state,
                chat: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_ LAST_CREATED_CHAT_FAILURE":
            return {
                ...state,
                chat: null,
                isFetching: true,
                error: true,
            };
        case "UPDATE_CHAT_START":
            return {
                ...state,
                chat: null,
                isFetching: true,
                error: false,
            };
        case "UPDATE_CHAT_SUCCESS":
            return {
                chats: state.chats.map((chat) => chat._id === action.payload._id && action.payload),
                chat: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_CHAT_FAILURE":
            return {
                ...state,
                chat: null,
                isFetching: false,
                error: true,
            };
        case "SET_FAVORITE_START":
            return {
                ...state,
                chat: null,
                isFetching: true,
                error: false,
            };
        case "SET_FAVORITE_SUCCESS":
            return {
                chats: state.chats.map((chat) => chat._id === action.payload._id && action.payload),
                chat: null,
                isFetching: false,
                error: false,
            };
        case "SET_FAVORITE_FAILURE":
            return {
                ...state,
                chat: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    };
};

export default ChatReducer;