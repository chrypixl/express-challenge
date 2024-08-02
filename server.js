const express = require('express');
const {readFile, writeFile} = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/api/notes', (req, res) => {
    readFile('db/db.json', 'utf8')
    .then(data => {
        res.send(data)
    }) 
});

app.post('/api/notes', (req, res) => {
    readFile('db/db.json', 'utf8')
    .then(data => {
        const newNote = req.body;
        newNote.id = crypto.randomUUID();
        db = JSON.parse(data);
        db.push(newNote);
        return writeFile('db/db.json', JSON.stringify(db))
    }) .then(data => {
        res.json('The note has been saved!')
    })
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, () => {
    console.log("The application is running.");
})