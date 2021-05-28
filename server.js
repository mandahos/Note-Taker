const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3016;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server now on port 3016!`);
});