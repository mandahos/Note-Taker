const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const generateUniqueId = require('generate-unique-id');



const PORT = process.env.PORT || 3016;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));



app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            const oldNotes = JSON.parse(data);
            req.body.id = generateUniqueId();
            const newNotes = [req.body, ...oldNotes];
            fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(newNotes), (err) => {
                if(err) {
                    res.status(500).json(err);
                } else {
                    res.json(newNotes);
                }
            })
        }
    });
});

//Rutes, setting up the server by routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    
});



app.listen(PORT, () => {
    console.log(`API server now on port 3016!`);
});