const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {Product,validateProduct} = require("../models/product");
const { describe } = require("node:test");
const { join } = require("path");

router.get("/", async (req, res) => {
    const products = await Product.find();
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

router.put("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if(!product) {
        return res.status(404).send("aradığınız ürün bulunamadı.");
    }

    const { error } = validateProduct(req.body);

    if(error) {
        return res.status(400).send(result.error.details[0].message);
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.send(product);
});

router.delete("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if(!product) {
        return res.status(404).send("aradığınız ürün bulunamadı.");
    }

    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(product);
});

router.get("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if(!product) {
        return res.status(404).send("aradığınız ürün bulunamadı.");
    }
    res.send(product);
});



module.exports = router;