module.exports = {

passwordValidator: function(password, pwdConf, email){
    var pwdArray = [];
    if (password != pwdConf){
      pwdArray.push('Passwords don\'t match!')
    }
    if (password.length<8){
      pwdArray.push('Password should be at least 8 characters long!')
    }
    if (email.trim() === ""){
      pwdArray.push('Email cannot be blank!')
    }
    return pwdArray;
  },

userValidator: function (password, email, userCollection){
    var userArray = [];
    if (email.trim() === ""){
      userArray.push('Email cannot be blank!')
    }
    if (password.trim() === ""){
      userArray.push('Password cannot be blank!')
    }
    if (password.length<8){
      userArray.push('Password should be at least 8 characters long!')
    }
    return userArray;
  }
}
