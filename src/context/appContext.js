import React, {useReducer, useContext} from "react";
import reducer from './reducer';
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    TOGGLE_SIDEBAR,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR, LOGOUT_USER
} from "./actions";
import axios from "axios";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}

const AppContext = React.createContext()
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Axios config
    const authFetch = axios.create({
        //baseURL: 'https://igmprepa-store.onrender.com/api/v1',
        baseURL: 'http://localhost:5000/api/v1',
        /* headers: {
             Authorization: `Bearer ${state?.token}`,
         }*/
    });
    // request interceptor
    authFetch.interceptors.request.use(
        (config) => {
            //config.headers['Authorization'] = `Bearer ${state?.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        }
    );

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 4000)
    }
    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR});
    };
    const addUserToLocalStorage = ({user, location}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('location', location);
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('location');
    }
    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({type: SETUP_USER_BEGIN});
        try {
            const response = await authFetch.post(`/auth/${endPoint}`, currentUser);
            console.log(response.data);
            const {user, location} = response.data;
            dispatch({type: SETUP_USER_SUCCESS, payload: {user, location, alertText}});
            addUserToLocalStorage({user, location});
        } catch (error) {
            console.log(error);
            dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    };
    const logoutUser = () => {
        dispatch({type: LOGOUT_USER});
        removeUserFromLocalStorage();

    }
    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            setupUser,
            toggleSidebar,
            logoutUser
        }}>{children}</AppContext.Provider>
    )
}
const useAppContext = () => {
    return useContext(AppContext)
}
export {AppProvider, initialState, useAppContext}