const mongoose = require('mongoose');
const uri = require('./utils/propertiesurl').DB;

module.exports = () => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log(`DB Connected on ${uri}`))
    .catch(error => console.log(`Error connection on ${error}`));

    process.on('SIGINT', ()=>{
        mongoose.connection.close(()=>{
            console.log(`DB disconnected`);
            process.exit(0)
        });
    });
}
