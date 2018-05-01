var mongoose = require("mongoose");
var bcrypt   = require("bcrypt");

var userSchema = new mongoose.Schema({
  username   : String,
  password   : String,
  firstName  : String,
  lastName   : String,
  eMail      : String
});

// hashing password before saving it to the database
userSchema.pre('save', function (next) {
  if (!this.isModified("password")) {
        return next();
    }

  if(this.password) {
        var salt = bcrypt.genSaltSync(10)
        this.password  = bcrypt.hashSync(this.password, salt)
    }
  next();
});

userSchema.methods.passwordIsValid = function (password) {
   try {
       return bcrypt.compareSync(password, this.password);
   }
   catch (err) {
       throw err;
   }
};

module.exports = mongoose.model("User", userSchema);
