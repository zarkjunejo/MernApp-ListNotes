const mongoose = require('mongoose');
const mongoRI = "mongodb+srv://zark:junejo@inotebook.s1ain.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = () => {

    mongoose.connect(mongoRI, () => {
        console.log('connected');
    })
}

module.exports = connectToMongo;