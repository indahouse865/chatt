const path = require("path");
const PublicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const express = require('express');

const app = express();

app.use(express.static(PublicPath));

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});
