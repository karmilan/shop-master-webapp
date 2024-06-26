import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from '../config/db.js'
import shopRoutes from '../routes/shopRoutes.js'
import employeeRoutes from '../routes/employeeRoutes.js'
import customerRoutes from '../routes/customerRoutes.js'
import creditRoutes from '../routes/creditRoutes.js'
import expenseRoutes from '../routes/expenseRoutes.js'

dotenv.config()
console.log(process.env.MONGO_URI);
connectDB()

const PORT = 5000

const app = express()

// middleware
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use("/api", shopRoutes)
app.use("/api", employeeRoutes)
app.use("/api", customerRoutes)
app.use("/api", creditRoutes)
app.use("/api", expenseRoutes)


app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>")
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))