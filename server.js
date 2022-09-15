const express = require("express");
const app = express();

const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

app.use(express.static('public'));


app.use('/api',apiRoutes);
app.use('/',htmlRoutes);


app.listen('3000', () => {  // http://localhost:3000/
    console.log("<><><><><><><><><><><><><><><>");
    console.log("Server now on at port 3000");
    console.log("<><><><><><><><><><><><><><><>");
})