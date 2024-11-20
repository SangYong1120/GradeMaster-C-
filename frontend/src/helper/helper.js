import moment from 'moment';

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const setToken = (val) => {
    localStorage.setItem('token', val);
};

export const setUserData = (val) => {
    localStorage.setItem('userData', val);
};

export const removeUserData = () => {
    localStorage.removeItem('userData');
};

export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

export const isUserLoggedIn = () => !!localStorage.getItem('userData');

export const removeCookie = (cookieName) => {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const getDateFormat = (formattedDate) => {
    const formattedDateMoment = moment(`${formattedDate}`, 'YYYY-MM-DD HH:mm A');
    const formattedDateTime = moment(formattedDateMoment).format('llll');
    return formattedDateTime;
};

