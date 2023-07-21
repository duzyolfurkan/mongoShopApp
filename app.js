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

    const productSchema = mongoose.Schema({
        name: String,
        price: Number,
        description: String,
        imageUrl: String,
        date: {
            type: Date,
            default: Date.now
        },
        isActive: Boolean
    });

    const Product = mongoose.model("Product", productSchema);
    const prd = new Product({
        name: "iphone 14",
        price: 30000,
        description: "iyi cihaz",
        imageUrl: "1.jpeg",
        isActive: true
    });

    async function saveProduct() {
        
        try{
            const result = await prd.save();
            console.log(result);
        }

        catch(err){
            console.log(err);
        }
    }

    saveProduct();

app.listen(3000, () => {
    console.log("listening on port 3000");
});