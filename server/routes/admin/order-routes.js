const express = require('express')
const {getAllOrderOfAllUsers, getOrderDetailsForAdmin,getUserDetailsForAdmin,updateOrderStatus} = require('../../controllers/admin/order-controller')

const router = express.Router()

router.get('/get',getAllOrderOfAllUsers)
router.get('/details/:id' , getOrderDetailsForAdmin)
router.get ('/details/user/:userId', getUserDetailsForAdmin)
router.put('/update/:id',updateOrderStatus)

module.exports = router