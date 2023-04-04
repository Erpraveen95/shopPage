const User = require('../models/user')

exports.getUser = async (req, res, next) => {
    try {
        const allData = await User.findAll()
        res.status(200).json({ allData: allData })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: error })
    }
}
exports.postUser = async (req, res, next) => {
    try {
        const price = req.body.price
        const name = req.body.name
        const category = req.body.category
        const userData = await User.create({
            name: name,
            price: price,
            category: category
        })
        res.status(201).json({ userData: userData })
    } catch (err) {
        console.log(err)
    }
}
exports.deleteProduct = async (req, res, next) => {
    const itemId = req.params.id
    try {
        if (!itemId) {
            res.status(400).json({ err: "item not present" })
        }
        await User.destroy({ where: { id: itemId } })
        res.status(200).json({ res: "delte Success" })
    } catch (err) {
        console.log(err)
    }
}