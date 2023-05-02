import asyncHandler from 'express-async-handler';
//const asyncHandler = require('express-async-handler')
import Product from '../models/productModel.js';

//@description Fetch all products
//@route       GET /api/products
//@access      Public
const getProducts = asyncHandler(async (req,res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name : {
            $regex: req.query.keyword,
            $options: 'i'//case insensitive
        } 
    } : {} // query is a word after question mark  
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    res.json({products, page, pages:Math.ceil(count/pageSize)})
})
//@description Fetch single product
//@route       GET /api/products/:id
//@access      Public
const getProductById = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
})

//@description Create a product
//@route       Post /api/products
//@access      Private/Admin
const createProduct = asyncHandler( async (req,res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body
    const product = new Product({
        name : name,
        price : price,
        user : req.user._id,
        image: image,
        brand : brand,
        category : category,
        countInStock:countInStock,
        numReviews:0,
        description : description,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})

//@description Update a product
//@route       Post /api/products/:id
//@access      Private/Admin
const updateProduct = asyncHandler( async (req,res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id);

    if(product) {

        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock
        
        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
    
})
//@description Delete a product
//@route       Delete /api/products/:id
//@access      Private
const deleteProduct = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        await product.remove();
        res.json({message:'Product removed!'})
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
})
//@description Create new review
//@route       POST /api/products/:id/reviews
//@access      Private
const createProductReview = asyncHandler( async (req,res) => {
    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id);

    if(product) {

        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed')
        }

        const review = {
            name : req.user.name,
            rating : Number(rating),
            comment,
            user : req.user._id
        }
        
        product.reviews.push(review);

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((prev, val) => prev+val.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({message:'Reviewed added'})

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
    
})

//@description Get top rated products
//@route       GET /api/products/top
//@access      Public
const getTopProducts = asyncHandler( async (req,res) => {
   
    const products = await Product.find({}).sort({rating:-1}).limit(3);

    res.json(products)
    
})
export {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview,getTopProducts}