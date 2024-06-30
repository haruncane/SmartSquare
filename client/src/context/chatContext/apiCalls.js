import { getChatsStart, getChatsSuccess, getChatsFailure, createChatStart, createChatSuccess, createChatFailure, updateChatStart, updateChatFailure, updateChatSuccess, setFavoriteStart, setFavoriteFailure, setFavoriteSuccess, getLastCreatedChatStart, getLastCreatedChatFailure, getLastCreatedChatSuccess } from "./ChatActions";
import axios from "axios";

export const getChats = async (id, dispatch) => {
    dispatch(getChatsStart());
    try {
        const request = { userId: id };
        const response = await axios.post(`http://localhost:3001/api/chat/getFavoritedChats`, request);
        dispatch(getChatsSuccess(response.data));
    } catch (err) {
        dispatch(getChatsFailure());
    }
};

export const createChat = async (id, chat, category, dispatch) => {
    dispatch(createChatStart());
    try {
        const request = { userId: id, prompt: chat, category: category };
        const response = await axios.post(`http://localhost:3001/api/chat/createChat`, request);
        dispatch(createChatSuccess(response.data));
    } catch (err) {
        dispatch(createChatFailure());
    }
};

export const getLastCreatedChat = async (id, dispatch) => {
    dispatch(getLastCreatedChatStart());
    try {
        const request = { userId: id };
        const response = await axios.post(`http://localhost:3001/api/chat/getLastCreatedChat`, request);
        dispatch(getLastCreatedChatSuccess(response.data));
    } catch (err) {
        dispatch(getLastCreatedChatFailure());
    }
};

export const updateChat = async (prompt, chat, dispatch) => {
    dispatch(updateChatStart());
    try {
        const chatId = chat?._id;
        const request = { prompt: prompt };
        const response = await axios.put(`http://localhost:3001/api/chat/updateChat/${chatId}`, request);
        dispatch(updateChatSuccess(response.data));
    } catch (err) {
        dispatch(updateChatFailure());
    } 
};

export const setFavorite = async (chat, dispatch) => {
    dispatch(setFavoriteStart());
    try {
        const chatId = chat;
        const response = await axios.put(`http://localhost:3001/api/chat/setFavorite/${chatId}`);
        dispatch(setFavoriteSuccess(response.data));
    } catch (err) {
        dispatch(setFavoriteFailure());
    }
};