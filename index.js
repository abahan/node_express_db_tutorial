const app = require('./api/server');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n*** Sever is running on port ${PORT} ***\n`);
 });
