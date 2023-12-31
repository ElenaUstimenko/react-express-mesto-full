import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { PopupWithForm } from './PopupWithForm.js';

function EditProfilePopup(props) {
  const { isOpen, onClose, isLoading } = props;

  // подписываемся на CurrentUserContext и получаем значение контекста
  const currentUser = React.useContext(CurrentUserContext); 

  // cтейт, в котором содержится значение инпута
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // обработчик изменения инпута обновляет стейт
  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  };

  // после загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах
  React.useEffect(() => {
    setName(currentUser?.name ??'');
    setDescription(currentUser?.about ??'');
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

      // передаём значения управляемых компонентов во внешний обработчик
      props.onUpdateUser({ name: name, about: description });
  };

  return (
    // значение элемента «привязывается» к значению стейта
    <PopupWithForm name="popup_edit-profile" title="Редактировать профиль" isOpen={isOpen} 
        onClose={onClose} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit}> 
            <label className="popup__field">
              <input 
                id="name-input"
                type="text"
                name="name"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                required
                value={name} 
                onChange={handleChangeName}
            />
            <span className="name-input popup__input-error" />
            </label>
            <label className="popup__field">
              <input
                  id="profession-input"
                  type="text"
                  name="about"
                  className="popup__input popup__input_type_profession"
                  placeholder="Вид деятельности"
                  minLength={2}
                  maxLength={200}
                  required
                  value={description} 
                  onChange={handleChangeDescription}    
              />
            <span className="profession-input popup__input-error" />
            </label>
        </PopupWithForm>
  )
};

export { EditProfilePopup };