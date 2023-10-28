// export const baseURL = 'https://auth.nomoreparties.co';
export const baseURL = 'http://localhost:3000';
// export const baseURL = 'https://fifteen.api.nomoredomainsrocks.ru';

// функция register - принимает почту и пароль, отправляет запрос регистрации на /signup
export const register = ({email, password}) => {
 return fetch(`${baseURL}/signup`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    email,
    password
  })
 }).then(handleResponse);
};

// функция login - принимает почту и пароль, отправляет запрос авторизации на /signin
// в ответ сервер вернет jwt, который нужно сохранить в localStorage
export const login = ({ email, password }) => {
  return fetch(`${baseURL}/signin`, {
   method: "POST",
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({ email, password })
  })
  .then(handleResponse)
 };

// функция checkToken - принимает jwt, отправляет запрос на /users/me и 
// возвращает данные пользователя
export const checkToken = () => {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse);
};

 const handleResponse = (res) => {
  if (res.ok) {
    return res.json() // возвращает promise 
  } else {
    return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняет promise 
  }
};