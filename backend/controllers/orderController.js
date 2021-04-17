import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @des create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
         const order = new Order({
            orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
         })

         const createdOrder = await order.save()

         res.status(201).json(createdOrder)
    }
})

// @des get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @des update order toPaid by id
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult =  {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @des update order to delivered by id
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc GET logged in user orders
//@route GET /api/orders/my-orders
//@access Private
const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user.id})

    res.json(orders)
})


//@desc GET all orders
//@route GET /api/orders
//@access Private/admin
const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)
})



export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered}