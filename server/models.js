import mongoose from 'mongoose'
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;


let models = {}
console.log("connecting to mongodb")
await mongoose.connect('mongodb+srv://websharerUser:greenapples2@cluster0.jv2tfzr.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
console.log("successfully connected to mongodb!")

const profileSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    pronouns: String,
    email: String,
    grad_year: String,
    intended_career: String,
    password: { type: String, required: true },
    signed_in: Boolean,
    modulesInProgress: Array,
    modulesComplete: Array,
    subtasksInProgress: Array
})

     
profileSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
profileSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

models.Message = mongoose.model('Message', messageSchema)
models.Profile = mongoose.model('Profile', profileSchema)
console.log("mongoose models created")


export default models;