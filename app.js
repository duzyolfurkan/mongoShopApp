const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/products" ,products);
app.use("/", home);


const username = 'duzyolfurkan';
const password = '1361523';
const database = 'shopdb'

mongoose.connect(`mongodb+srv://${username}:${password}@appcategory.ut1tbcd.mongodb.net/${database}?retryWrites=true&w=majority`)
    .then(() => { console.log("mongodb bağlantısı kuruldu.") })
    .catch((err) => { console.log(err) });

app.listen(3000, () => {
    console.log("listening on port 3000");
});