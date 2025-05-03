"use strict"
const form = new UserForm();
function processAuthRes(authRes){
    if(authRes.success){
        location.reload();
    } else{
        form.setLoginErrorMessage(authRes.error);
    }
}
function processRegistrationRes(authRes){
    if(authRes.success){
        location.reload();
    } else{
        form.setRegisterErrorMessage(authRes.error);
    }
}
form.loginFormCallback = (formData) => {
    ApiConnector.login(formData, processAuthRes);
}
form.registerFormCallback = (formData) => {
    ApiConnector.register(formData, processRegistrationRes);
}