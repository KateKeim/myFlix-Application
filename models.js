const mongoose = require("mongoose");

//Defining the Schema
let movieSchema = mongoose.Schema({
   Title: {type: String, required: true},
   Description: {type: String, required: true},
   Genre: {
      Name: String,
      Description: String
   },
   Director: {
      Name: String,
      Bio: String,
      Birth: Date
   },
   ImagePath: String,
   Featured: Boolean
});

let userSchema = mongoose.Schema({
   Password: {type: String, required: true},
   Username: {type: String, required: true},
   Email: {type: String, required: true},
   Birthday: Date,
   FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;