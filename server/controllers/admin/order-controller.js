const Order = require('../../models/Order')
const User = require('../../models/User')



const getAllOrderOfAllUsers = async(req,res) => {
    try{

        const orders = await Order.find({})

        if(!orders.length === 0){
            res.status(404).json({
                success:false,
                message:"No orders found!"
            })
        }

        res.status(200).json({
            success:true,
            data: orders
        })

    } catch (err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}

const getOrderDetailsForAdmin = async(req,res) => {
    try{

        const {id} = req.params
        const order = await Order.findById(id)

        if(!order){
            res.status(404).json({
                success:false,
                message:"Order not found!"
            })
        }

        res.status(200).json({
            success:true,
            data: order
        })

    } catch (err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}


const getUserDetailsForAdmin  = async(req,res) => {
    try{
        const {userId} = req.params
        const user = await User.findById(userId)

        if (!user) {
            return(
                res.status(404).json({
                    success: false,
                    message: "User not found!"
                })
            )
        }

        res.status(200).json({
            success:true,
            data: user
        })

    } catch (err){
        console.log(err)
        res.status(500).json({
            success:false,
            message: "Some error occured!"
        })
    }
}

const updateOrderStatus = async (req,res) => {
    try{

        const {id} = req.params
        const {orderStatus} = req.body

        const order = await Order.findById(id)

        if (!order){
            return(
                res.status(404).json({
                    success:false,
                    message: "Order not found!"
                })
            )
        }

        await Order.findByIdAndUpdate(id,{orderStatus})

        res.status(200).json({
            success:true,
            message: "Order status is updated successfuly!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            message: "Some error occured!"
        })
    }
}


module.exports = {getAllOrderOfAllUsers, getOrderDetailsForAdmin, getUserDetailsForAdmin,updateOrderStatus}