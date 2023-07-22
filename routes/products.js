const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {Product,validateProduct} = require("../models/product");
const { describe } = require("node:test");
const { join } = require("path");

router.get("/", async (req, res) => {
    const products = await Product.find
    .or([
        {price: { $gte : 10000}},
        {isActive: true}
    ]);
    //const products = await Product.find();
    //const products = await Product.find({isActive: true}).select({name:1, price:1});
    res.send(products);
});

router.post("/", async (req, res) => {
    const { error } =  validateProduct(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        isActive: req.body.isActive
    });

    try{
        const result = await product.save();
        res.send(result);
    }

    catch(err){
        console.log(err);
    }

});

router.put("/:id", async (req, res) => {
    // const product = await Product.findById(req.params.id);
    // if(!product) {
    //     return res.status(404).send("aradığınız ürün bulunamadı.");
    // }

    // const { error } = validateProduct(req.body);

    // if(error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    // product.name = req.body.name;
    // product.price = req.body.price;
    // product.description = req.body.description;
    // product.imageUrl = req.body.imageUrl;
    // product.isActive = req.body.isActive;

    // const updatedProduct = await product.save();

    // res.send(updatedProduct);

    const result = await Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isActive: req.body.isActive,
        }
    })

    res.send(result);
});


router.delete("/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    // const product = products.find(p => p.id == req.params.id);
    if(!product) {
         return res.status(404).send("aradığınız ürün bulunamadı.");
     }

    // const index = products.indexOf(product);
    // products.splice(index, 1);
    res.send(product);
});

router.get("/:id", (req, res) => {
    const product = Product.findById(req.params.id);

    if(!product) {
        return res.status(404).send("aradığınız ürün bulunamadı.");
    }
    res.send(product);
});



module.exports = router;