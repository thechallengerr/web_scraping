const mongoose = require('mongoose');

async function connect() {
    try {

        await mongoose.connect('mongodb+srv://gnoah1701:m5XNcQmNLJ1SxMgc@fmcards.pupqiel.mongodb.net/fmcards', {

        });
        console.log('Connected successfully');
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connect };