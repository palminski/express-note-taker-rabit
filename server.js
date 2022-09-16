const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api',apiRoutes);
app.use('/',htmlRoutes);


app.listen(PORT, () => {  // http://localhost:3000/
    console.log("<><><><><><><><><><><><><><><>");
    console.log(`Server now on at port ${PORT}!`);
    console.log("<><><><><><><><><><><><><><><>");
})