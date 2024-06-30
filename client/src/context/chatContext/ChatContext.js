import { createContext, useReducer } from "react";
import ChatReducer from "./ChatReducer";

const INITIAL_STATE = {
    chats: [],
    chat: null,
    isFetching: false,
    error: false,
};

export const ChatContext = createContext(INITIAL_STATE);

export const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider
            value={{
                chats: state.chats,
                chat: state.chat,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};