const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');



const PORT = process.env.PORT || 3016;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));



//Rutes, setting up the server by routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '.db/db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});





app.listen(PORT, () => {
    console.log(`API server now on port 3016!`);
});