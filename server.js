let app = require("express")();
let http = require("http").createServer(app);
const PORT = 8080;

let io = require("socket.io")(http);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

//app.use(require("express").static("public"));

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.sockets.on("connection", socket => {
    console.log("connected",io.of("/").sockets.size);

    socket.on("disconnect", () => {
        console.log("disconnect",io.of("/").sockets.size);
    });
});