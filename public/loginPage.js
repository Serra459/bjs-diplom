"use strict"
const form = new UserForm();
function processAuthRes(authRes){
    if(authRes.success){
        location.reload();
    } else{
        alert(authRes.error);
    }
}
form.loginFormCallback = (formData) => {
    ApiConnector.login(formData, processAuthRes);
}
form.registerFormCallback = (formData) => {
    ApiConnector.login(formData, processAuthRes);
}