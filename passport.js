const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models'),
    passportJWT = require('passport-jwt');


//define basic HTTP for log-in requests    
let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

    passport.use(new LocalStrategy({
        usernameField: "Username",
        passwordField: "Password"
    }, (username, password, callback) => {
        console.log(username + " " + password);
        Users.findOne({ Username: username }, (error, user) => {
            if (error) {
                console.log(error);
                return callback(error);
            }


            if (!user) {
                console.log("incorrect username");
                return callback(null, false, {message: "Incorrect username or password."});
            }

            console.log("finished");
            return callback(null,user);
        });
    }));

    //Setting up the JWT authentication code อนุญาตให้เราตรวจสอบผู้ใช้จาก JWT ที่ส่งมา
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "your_jwt_secret"
    }, (jwtPayload, callback) => {
        return Users.findById(jwtPayload._id)
            .then((user) => {
                return callback(null, user);
            })
            .catch((error) => {
                return callback(error)
            });
    }));