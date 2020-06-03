const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");
const xmlParse = require('xml2js').parseString;

var connection_string = 'localhost:27017/rssReader'

const db = require("monk")(connection_string);
const collection_rssReader = db.get("rssReader");
const port = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let instance= axios.create({});



io.on("connection", socket => {
  console.log("New client connected" + socket.id);


  socket.on("initial_data", () => {
    collection_rssReader.find({}).then(data => {
       io.sockets.emit("get_initial_data", data);
    });
  });

  socket.on("get_rss_chanel_data", (data) => {
    instance.get(data).then(response => {
      xmlParse(response.data, function (err, xmlres) {
        io.sockets.emit("send_rss_chanel_data", xmlres);
      });
    });
  });


  socket.on("putOrder", order => {
    collection_rssReader
      .update({ _id: order._id }, { $inc: { ordQty: order.order } })
      .then(updatedDoc => {
        io.sockets.emit("change_data");
      });
  });

  socket.on("mark_done", id => {
    collection_rssReader
      .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
      .then(updatedDoc => {
        io.sockets.emit("change_data");
      });
  });

  socket.on("ChangePred", predicted_data => {
    collection_rssReader
      .update(
        { _id: predicted_data._id },
        { $set: { predQty: predicted_data.predQty } }
      )
      .then(updatedDoc => {
        io.sockets.emit("change_data");
      });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


app.use(express.static("build"));
app.use("/kitchen", express.static("build"));
app.use("/updatepredicted", express.static("build"));

server.listen(port, () => console.log(`Listening on port ${port}`));
