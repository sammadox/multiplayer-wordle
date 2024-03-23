const express = require('express');
const wordsRouter = express.Router();
const {
    getRandomWord,
    isValidWord
} = require('../utils/words');

wordsRouter.get('/word', (req,res) => {
    res.status(200).json({ word: getRandomWord() });
});

wordsRouter.get('/valid/:word', (req,res) => {
    const { word } = req.params;
    res.status(200).json({
        word,
        valid: isValidWord(word)
    });
});

module.exports = wordsRouter;