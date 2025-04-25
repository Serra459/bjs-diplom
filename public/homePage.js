const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();
function processLogout(data){
    if(data.success){
        location.reload();
    }
}
function processCurrent(data){
    if(data.success){
        ProfileWidget.showProfile(data.data);
    }
}
function updateCurrency(data){
    if(data.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(data.data);
    }
}
function processMoneyOperation(response){
    if(response.success){
        ProfileWidget.showProfile(response.data);
    } 
    moneyManager.setMessage(response.success, response.error ?? "Операция прошла успешно");
}
function processGetFavorites(response){
    console.log(response);
    if(response.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
}
function processUserOperation(response){
    if(response.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
    favoritesWidget.setMessage(response.success, response.error ?? "Операция прошла успешно");
}
logoutButton.action = () =>{
    ApiConnector.logout(processLogout);
}
ApiConnector.current(processCurrent);
setInterval(() => {
    ApiConnector.getStocks(updateCurrency);
}, 1000)
moneyManager.addMoneyCallback = (data) =>{
    ApiConnector.addMoney(data, processMoneyOperation);
}
moneyManager.conversionMoneyCallback = (data) =>{
    ApiConnector.convertMoney(data, processMoneyOperation);
}
moneyManager.sendMoneyCallback = (data) =>{
    ApiConnector.transferMoney(data, processMoneyOperation);
}
ApiConnector.getFavorites(processGetFavorites);
favoritesWidget.addUserCallback = (data) =>{
    ApiConnector.addUserToFavorites(data, processUserOperation);
}
favoritesWidget.removeUserCallback = (data) =>{
    ApiConnector.removeUserFromFavorites(data, processUserOperation);
}