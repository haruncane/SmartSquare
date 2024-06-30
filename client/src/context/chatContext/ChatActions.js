export const getChatsStart = () => ({
    type: "GET_CHATS_START",
});

export const getChatsSuccess = (chats) => ({
    type: "GET_CHATS_SUCCESS",
    payload: chats,
});

export const getChatsFailure = () => ({
    type: "GET_CHATS_FAILURE",
});

export const createChatStart = () => ({
    type: "CREATE_CHAT_START",
});
  
export const createChatSuccess = (chat) => ({
    type: "CREATE_CHAT_SUCCESS",
    payload: chat,
});
  
export const createChatFailure = () => ({
    type: "CREATE_CHAT_FAILURE",
});

export const getLastCreatedChatStart = () => ({
    type: "GET_ LAST_CREATED_CHAT_START",
});

export const getLastCreatedChatSuccess = (chat) => ({
    type: "GET_ LAST_CREATED_CHAT_SUCCESS",
    payload: chat,
});

export const getLastCreatedChatFailure = () => ({
    type: "GET_ LAST_CREATED_CHAT_FAILURE",
});
  
export const updateChatStart = () => ({
    type: "UPDATE_CHAT_START",
});
  
export const updateChatSuccess = (chat) => ({
    type: "UPDATE_CHAT_SUCCESS",
    payload: chat,
});
  
export const updateChatFailure = () => ({
    type: "UPDATE_CHAT_FAILURE",
});
  
export const setFavoriteStart = () => ({
    type: "SET_FAVORITE_START",
});
  
export const setFavoriteSuccess = (id) => ({
    type: "SET_FAVORITE_SUCCESS",
    payload: id,
});
  
export const setFavoriteFailure = () => ({
    type: "SET_FAVORITE_FAILURE",
});