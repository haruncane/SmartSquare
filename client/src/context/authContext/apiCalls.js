import { loginStart, loginSuccess, loginFailure, registerStart, registerFailure, registerSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, addCategoryStart, addCategoryFailure, addCategorySuccess, getUserStart, getUserSuccess, getUserFailure } from "./AuthActions";
import axios from "axios";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(`http://localhost:3001/api/user/login`, user);
        dispatch(loginSuccess(response.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const register = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const response = await axios.post(`http://localhost:3001/api/user/register`, user);
        dispatch(registerSuccess(response.data));
    } catch (err) {
        dispatch(registerFailure());
    }
};

export const addCategory = async (user, category, dispatch) => {
    dispatch(addCategoryStart());
    try {
        const userId = user?._id;
        const request = { category: category.toLowerCase() };
        const response = await axios.put(`http://localhost:3001/api/user/addCategory/${userId}`, request);
        dispatch(addCategorySuccess(response.data));
    } catch (err) {
        dispatch(addCategoryFailure());
    }
};

export const getUser = async (id, dispatch) => {
    dispatch(getUserStart());
    try {
        const response = await axios.get(`http://localhost:3001/api/user/` + id);
        dispatch(getUserSuccess(response.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const response = await axios.delete(`http://localhost:3001/api/user/` + id);
        dispatch(deleteUserSuccess(response));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};