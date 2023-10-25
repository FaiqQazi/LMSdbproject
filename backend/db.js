 mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lms', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectToMongo;
