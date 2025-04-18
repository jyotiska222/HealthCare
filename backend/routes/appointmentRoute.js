
import { bookAppo,getBookings } from "../controller/appointmentController.js"
import express from "express"
import { authMiddle } from "../middlewares/authMiddleware.js"


const router = express.Router()



router.post('/',bookAppo)
router.post('/getBookings/:name',authMiddle,getBookings)

router.post('/', authMiddle,bookAppo)
router.get('/getBookings/:name',authMiddle,getBookings)



export default router

