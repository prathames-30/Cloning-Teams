const express = require("express")
const app = express()
const server = require("http").createServer(app)
const cors = require("cors")
// Cors is a package which we reqyuire for handling 
// cross origin requests.
const PORT = process.env.PORT || 5000

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
        methods: ["GET","POST"]
    }
})

app.use(cors())

app.get("/", (req,res) => {
    res.send('Running server')

})

//Server side connection
io.on('connection',(socket) => {

    socket.emit('me', socket.id)
    
    socket.on('disconnect', () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", {signal: signalData, from, name})
    })

    socket.on("answerCall", (data) => {
        io.to(data.from).emit("callAccepted", data)
    })
} )

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))


