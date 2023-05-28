const mongoose = require('mongoose');

module.exports = async () => {

    try {
        await mongoose.connect(
            `${process.env.USER_NAME}${process.env.USER_PASSWORD}${process.env.DATABSE}`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
    }
    catch (err) {
        console.log(err.message)
    }
}