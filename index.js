const  express = require('express');
const  app = express();
app.use(express.json());
const {Client} = require('pg');
require('dotenv').config({path:"process.env"});
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
})
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({message: "working!"});
});

app.listen(PORT, () => {"Sever is running on port " + PORT});
