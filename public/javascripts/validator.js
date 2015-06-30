module.exports = {

passwordValidator: function(password, pwdConf, email){
    var pwdArray = [];
    if (password != pwdConf){
      pwdArray.push('Passwords don\'t match!')
    }
    if (password.length<8){
      pwdArray.push('Password too short')
    }
    if (email.trim() === ""){
      pwdArray.push('Email cannot be blank')
    }
    return pwdArray;
  },

userValidator: function (password, email, userCollection){
    var userArray = [];
    if (email.trim() === ""){
      userArray.push('Email cannot be blank!')
    }
    return userArray;
  }
}
