import userModel from "../models/userModel.js";

// add items to user cart

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId })
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndDelete(req.body.userId, { cartData })
        res.json({ success: true, message: "Added to cart" })
    } catch (error) {
        console.log("Error while adding the item in the cart", error)
        res.json({ success: false, message: "Error" })
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId })
        let cartData = userData.cartData

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Removed From Cart" })
    } catch (error) {
        console.log("Error while removing the item")
        res.json({ success: false, message: "Error" })
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        res.json({ success: false, cartData })
    } catch (error) {
        console.log("Error while getting the data", error)
        res.json({ success: false, message: "Error" })
    }
}

export { addToCart, removeFromCart, getCart }