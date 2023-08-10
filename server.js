const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    uuid = require("uuid");

const bcrypt = require("bcrypt")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



let users = [
    {
        id: 1,
        name: "Kate",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Max",
        favoriteMovies: ["Shutter"]
    },
]



let movies = [{"_id":{"$oid":"63f8a5f916571b3bc91b5281"},"Title":"Be With Me","Description":"It premiered as the Director's Fortnight selection in the 2005 Cannes Film Festival. It was also the official entry from Singapore for the 78th Academy Awards in the foreign language category. In December 2005, the academy body disqualified the film on grounds that the dialogue is mainly in English.[1] Out of 93 minutes, the film only has two and a half minutes of dialogue.","Genre":{"Name":"Drama","Description":"drama is a category or genre of narrative fiction intended to be more serious than humorous in tone."},"Director":{"Name":"Eric Khoo","Bio":"Eric Khoo was the youngest son of the 15 children of Tan Sri Khoo Teck Puat from his second wife Rose Marie Wee. His mother, who was a cinephile, introduced him to cinema when he was three years old. He later received his education at the United World College of South East Asia.Khoo's interest in film eventually led him to study cinematography at the City Art Institute in Sydney, Australia.","Birth":"1965-03-27"},"ImagePath":"bewithme.jpg","Featured":false},
{"_id":{"$oid":"63f8aeca16571b3bc91b5282"},"Title":"Shutter","Description":"It focuses on mysterious images seen in developed pictures. The film was a huge box office success, making it one of the best known horror films from Thailand and recognized worldwide.","Genre":{"Name":"Horror","Description":"Horror is one of the most popular genres in storytelling. What began in literature can now be found in movies, television, theatre, and video games."},"Director":{"Name":"Banjong Pisanthanakun","Bio":"He is a Thai filmmaker and screenwriter. He saw early success with his first two films, Shutter (2004) and Alone (2007), both horror films that he co-directed and co-wrote with Parkpoom Wongpoom. He also directed the 2013 comedy horror romance film Pee Mak, which became Thailands highest-grossing film of all time, and the 2021 horror film The Medium, which was a commercial and critical success in South Korea.","Birth":"1979-09-11"},"ImagePath":"shutter.jpg","Featured":false},
{"_id":{"$oid":"63f8afc816571b3bc91b5283"},"Title":"Inception","Description":"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.","Genre":{"Name":"Action","Description":"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."},"Director":{"Name":"Christopher Nolan","Bio":"Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.","Birth":"1970-07-30"},"ImagePath":"inception.jpg","Featured":false},
{"_id":{"$oid":"63f8b2e416571b3bc91b5284"},"Title":"Mad Max: Fury Road","Description":"In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.","Genre":{"Name":"Action","Description":"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."},"Director":{"Name":"George Miller","Bio":"George Miller is an Australian film director, screenwriter, producer, and former medical doctor. In 2006, Miller won the Academy Award for Best Animated Feature for Happy Feet (2006).","Birth":"1945-03-03"},"ImagePath":"madmax.jpg","Featured":false},
{"_id":{"$oid":"63f8b3dd16571b3bc91b5285"},"Title":"Interstellar","Description":"A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.","Genre":{"Name":"Sci-fi","Description":"Science fiction is a modern genre. Though writers in antiquity sometimes dealt with themes common to modern science fiction, their stories made no attempt at scientific and technological plausibility, the feature that distinguishes science fiction from earlier speculative writings and other contemporary speculative genres such as fantasy and horror."},"Director":{"Name":"Christopher Nolan","Bio":"Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.","Birth":"1970-07-30"},"ImagePath":"interstellar.jpg","Featured":false},
{"_id":{"$oid":"63f8b4cd16571b3bc91b5286"},"Title":"Schindler`s List","Description":"Schindler`s List is a 1993 American epic historical drama film directed and produced by Steven Spielberg and written by Steven Zaillian.","Genre":{"Name":"Drama","Description":"drama is a category or genre of narrative fiction intended to be more serious than humorous in tone."},"Director":{"Name":"Steven Spielberg","Bio":"He is the most commercially successful director of all time. He is the recipient of various accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards.","Birth":"1946-12-18"},"ImagePath":"schindlerlist.jpg","Featured":false},
{"_id":{"$oid":"63f8b61216571b3bc91b5287"},"Title":"The Curious Case of Benjamin Button","Description":"The Curious Case of Benjamin Button is a 2008 American fantasy romantic drama film directed by David Fincher.","Genre":{"Name":"Drama","Description":"drama is a category or genre of narrative fiction intended to be more serious than humorous in tone."},"Director":{"Name":"David Fincher","Bio":"He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy in Hollywood.","Birth":"1962-08-28"},"ImagePath":"benjaminbutton.jpg","Featured":false},
{"_id":{"$oid":"63f8b6f016571b3bc91b5288"},"Title":"The Fault in Our Stars","Description":"The Fault in Our Stars is a novel by John Green. It is his fourth solo novel, and sixth novel overall.","Genre":{"Name":"Drama","Description":"drama is a category or genre of narrative fiction intended to be more serious than humorous in tone."},"Director":{"Name":"Josh Boone","Bio":"Josh Boone is an American filmmaker. He is best known for directing the romantic drama The Fault in Our Stars, based on the novel of the same name.","Birth":"1979-04-05"},"ImagePath":"thefault.jpg","Featured":false},
{"_id":{"$oid":"63f8b82716571b3bc91b5289"},"Title":"The Shawshank Redemption","Description":"It tells the story of banker Andy Dufresne, who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence.","Genre":{"Name":"Drama","Description":"drama is a category or genre of narrative fiction intended to be more serious than humorous in tone."},"Director":{"Name":"Frank Darabont","Bio":"Frank Árpád Darabont is an American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award.","Birth":"1959-01-28"},"ImagePath":"shawshank.jpg","Featured":false},
{"_id":{"$oid":"63f8b8e616571b3bc91b528a"},"Title":"Sing 2","Description":"Sing 2 is a 2021 American computer-animated jukebox musical comedy film produced by Illumination and distributed by Universal Pictures.","Genre":{"Name":"Animated","Description":"Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film."},"Director":{"Name":"Garth Jennings","Bio":"Garth Jennings is an English director, screenwriter and actor. Films he has directed include The Hitchhikers Guide to the Galaxy, Son of Rambow, Sing, and Sing 2.","Birth":"1972-07-09"},"ImagePath":"sing2.jpg","Featured":false}]

var users_data = [
    { "_id": { "$oid": "63fa1a03a6dfe0c9dfef2c32" }, "Username": "Kate", "Password": "Hi1234", "Email": "kate@gmail.com", "Birthday": "14/07/1987" },
    { "_id": { "$oid": "63fa1ad6a6dfe0c9dfef2c33" }, "Username": "Jack", "Password": "jax1234", "Email": "jack@gmail.com", "Birthday": "25/12/1990" },
    { "_id": { "$oid": "63fa1c4aa6dfe0c9dfef2c34" }, "Username": "Devid", "Password": "devid1234", "Email": "devid@gmail.com", "Birthday": "14/08/1991" },
    { "_id": { "$oid": "63fa1c9da6dfe0c9dfef2c35" }, "Username": "Kyle", "Password": "kyle1234", "Email": "kyle@gmail.com", "Birthday": "25/10/1987" },
    { "_id": { "$oid": "63fa1d25a6dfe0c9dfef2c36" }, "Username": "Max", "Password": "max1234", "Email": "max@gmail.com", "Birthday": "14/06/1986" }
]

//landing page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/documentation.html");
});

app.get('/users', function (req, res) {
    res.json(users_data);
})
//Allow new users to register
app.post("/users", (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send("Please input user name")
    }
});

//Allow users to update thir profile (userName, password, email, birthdate)
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send("User not found")
    }
});

//Allow users to add favorite movies
app.post("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send("User not found")
    }
});

//Allow users to delete movies from favorite list
app.delete("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(404).send("User not found")
    }
})

//Allow user to delete their id
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(404).send("User not found")
    }
})

//READ - Return all movies to users
app.get("/movies", (req, res) => {
    res.status(200).json(movies);
})

//READ - Return data (description, genre, director, image URL, whether it’s featured or not)
app.get("/movies/:title", (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).send("Movie not found")
    }
})

//READ - Return the genre
app.get("/movies/genre/:genreName", (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(404).send("Genre not found")
    }
})

//READ - Return director data
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(404).send("Director not found")
    }
})

//port to run app
app.listen(8080, () => console.log("listening on 8080"))