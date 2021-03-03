let app = require("express")();
let http = require("http").createServer(app);
const PORT = 8080;

let io = require("socket.io")(http);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});