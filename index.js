
const express =  require("express");
require('dotenv').config({path: __dirname + '/.env'})
const app = express();

app.use(express.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,auth-token');

    res.setHeader('Access-Control-Allow-Credentials', 1);

    next();
});

app.use("/t",require("./routes/login") );

app.listen(process.env.PORT, () => {
    console.log('The application is listening on port 5000!');
})