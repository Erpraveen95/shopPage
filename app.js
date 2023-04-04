const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./models/user')
const app = express()
const shopRoutes = require('./routes/shop')
app.use(cors())
app.use(bodyParser.json())
app.use(shopRoutes)
sequelize
    .sync()
    .then(() => {
        app.listen(3000)
        console.log('server started')
    })
    .catch(err => console.log(err))