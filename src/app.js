import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import { Server } from 'socket.io'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))



const httpServer = app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
const socketServer = new Server(httpServer)

app.use("/", productsRouter)
app.use('/', viewsRouter)

let products = []

socketServer.on('connection', socketServer => {
  console.log('Nuevo cliente conectado!')

  socketServer.on("product", data =>{
    products.push(data)
    socketServer.emit("productLogs", products)
  })
})