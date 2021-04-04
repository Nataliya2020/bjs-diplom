'use strict'
const userLogOut = new LogoutButton();
const userRatesBoard = new RatesBoard();
const userMoneyManager = new MoneyManager();
const userFavoritesWidget = new FavoritesWidget();

userLogOut.action = () => {
  ApiConnector.logout((error, data) => {
    if (error !== null) {
      location.reload();
    }
  })
}

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
})

userRatesBoard.currencyExchangeRate = () => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      userRatesBoard.clearTable();
      userRatesBoard.fillTable(response.data);
    }
  })
}

userRatesBoard.currencyExchangeRate();

setInterval(userRatesBoard.currencyExchangeRate, 60000);

userMoneyManager.addMoneyCallback = ((data) => {
  ApiConnector.addMoney(data, ((response) => {
    if (response.success) {
      userMoneyManager.setMessage(response.success, `Баланс пополнен`);
      ProfileWidget.showProfile(response.data);
    } else {
      userMoneyManager.setMessage(response.success, response.error);
    }
  }))
})

userMoneyManager.conversionMoneyCallback = ((data) => {
  ApiConnector.convertMoney(data, ((response) => {
    if (response.success) {
      userMoneyManager.setMessage(response.success, `Валюта конвертирована, баланс пополнен`);
      ProfileWidget.showProfile(response.data);
    } else {
      userMoneyManager.setMessage(response.success, response.error);
    }
  }))
})

userMoneyManager.sendMoneyCallback = ((data) => {
  ApiConnector.transferMoney(data, ((response) => {
    if (response.success) {
      userMoneyManager.setMessage(response.success, `Денежные средства переведены`);
      ProfileWidget.showProfile(response.data);
    } else {
      userMoneyManager.setMessage(response.success, response.error);
    }
  }))
})

ApiConnector.getFavorites((response) => {
  if (response.success) {
    userFavoritesWidget.clearTable();
    userFavoritesWidget.fillTable(response.data);
    userMoneyManager.updateUsersList(response.data);
  }
})

userFavoritesWidget.addUserCallback = ((data) => {
  ApiConnector.addUserToFavorites(data, ((response) => {
    if (response.success) {
      userFavoritesWidget.clearTable();
      userFavoritesWidget.fillTable(response.data);
      userMoneyManager.updateUsersList(response.data);
      userFavoritesWidget.setMessage(response.success, `Пользователь успешно добавлен`);
    } else {
      userFavoritesWidget.setMessage(response.success, response.error);
    }
  }))
})

userFavoritesWidget.removeUserCallback = ((id) => {
  ApiConnector.removeUserFromFavorites(id, ((response) => {
    if (response.success) {
      userFavoritesWidget.clearTable();
      userFavoritesWidget.fillTable(response.data);
      userMoneyManager.updateUsersList(response.data);
      userFavoritesWidget.setMessage(response.success, `Пользователь удален`);
    } else {
      userFavoritesWidget.setMessage(response.success, response.error);
    }
  }))
})
