const  express = require('express');
const  app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {"Sever is running on port " + PORT});
