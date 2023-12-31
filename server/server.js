const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')


app.use(cors())

app.get('/todos/:userEmail', async(req,res) => {
    const {userEmail} = req.params
    console.log(userEmail)
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos)
    }catch (error){
        res.status(500).json({ success: false, error: error.toString() });
    }
})


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))

