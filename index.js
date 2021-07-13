const express = require("express")
const app = express()
const server = require("http").createServer(app)
const PORT = process.env.PORT || 5000

const io = require("socket.io")(server)


const root = path.join(__dirname, 'client', 'build');
// Have Node serve the files for our built React app
app.use(express.static(root));
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile('index.html', { root });
});

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


