const socketIO = require("socket.io");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require("./logger");

const socket = (http) => {
    console.log("Initializing Socket!");
    // intiate the socket io
    const io = socketIO(http, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // add users to socket itself
    io.users = {};

    io.on('connection', socket => {

        // register user
        socket.on("register-user", async data => {
            // get the token
            const { token } = data;
            // get the user from token
            // try decoding the token
            try {
                const userData = await jwt.verify(token, process.env.APP_KEY);
                const user = await User.findById(userData.id);

                // if cannot find user return unauthenticated
                if (!user) {
                    console.info("SOCKET: user not connected!");
                    return false;
                }

                // add user to io users
                // make sure io users key is array
                if (!io.users[userData.id]) {
                    io.users[userData.id] = {
                        user, // add user
                        sockets: [] // add connected sockets here
                    };
                }
                // push the socket to user
                io.users[userData.id].sockets.push(socket.id);

                // fire a registered event
                socket.emit('registered-user', { id: userData.id });
                // log connection
                console.info("SOCKET: user connected!" + userData.id);
                return true;
            } catch (error) {
                console.info("SOCKET: user not connected!");
                console.log({ error });
                return false;
            }
        });

        // on disconnect
        socket.on("disconnect", () => {
            try {
                // get users
                const userData = Object.values(io.users).find(s => s.sockets.includes(socket.id));
                // if we have a user, remove his socket
                if (userData) {
                    // remove the socket from user's socket list
                    io.users[userData.user._id].sockets = io.users[userData.user._id].sockets.filter(s => s !== socket.id);
                    if (Array.isArray(io.users[userData.user._id].sockets) && io.users[userData.user._id].sockets.length === 0) {
                        delete io.users[userData.user._id];
                    }
                    console.info("SOCKET: user disconnected!" + userData.user._id);
                    console.info(io.users);
                } else {
                    console.info("SOCKET: user could not be disconnected!" + userData.user._id);
                }
            } catch (error) {
                console.info("SOCKET: user not disconnected!");
                logger.error("Could not disconnect user!", [error]);
            }
        });

        // socket controllers
        // socket.on("send-message", d => DirectMessageIOController.sendDirectMessage(io, d));
    });

    // return socket io
    return io;
}

module.exports = socket;