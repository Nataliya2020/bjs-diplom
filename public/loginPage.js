'use strict'
const user = new UserForm();

user.loginFormCallback = (data) => {
  ApiConnector.login(data, (login) => {
    if (login.success) {
      user.setLoginErrorMessage(`Авторизация прошла успешно`);
      location.reload();

    } else {
      user.setLoginErrorMessage(login.error);
    }
  });
}

user.registerFormCallback = (data) => {
  ApiConnector.register(data, (reg) => {
    if (reg.success) {
      user.setRegisterErrorMessage(`Пользователь успешно зарегистрирован`);
      location.reload();
    } else {
      user.setRegisterErrorMessage(reg.error);
    }
  })
}
