const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//create a schema
const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        lowercase: true
      },
      password: { 
        type: String,
        required:true
      }
}); 

userSchema.pre('save', async function(next) {
  try {
    // console.log('entered');
    // if (this.method !== 'local') {
    //   next();
    // }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    console.log('exited');
    next();
  } catch(error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
}


//create model
const User = mongoose.model('user',userSchema);

// export the model
module.exports = User;