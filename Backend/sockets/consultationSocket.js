
const socketIO = require('socket.io');
const userModel =   require("../models/userModel")
const adminModel =   require("../models/adminModel")

let io;
function initializeSocket (server){
    io =  socketIO(server ,{
        cors:{
            origin:'*',
            methods:['GET' ,'POST']
        }
    })

    io.on('connection' , (socket) =>{
        console.log(`client Connection:, ${socket.id}`);
        
        socket.on('join' , async(data) =>{
            const {userId , userType} = data
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,{ socketId:socket.id})
            }
            else if(userType === 'admin'){
                await adminModel.findByIdAndUpdate(userId,{socketId:socket.id})
            }
        } )


        socket.on('disconnect' ,() =>{
            console.log(`Client  Disconnect :${socket.id}`);
        })   
    })
}

function sendMessagesToSocketId(socketId , message){
    if(io){
        io.to(socketId).emit('message' ,message)
    }else{
        console.log('Socket.io not intitialized.')
    }
}


module.exports =  {initializeSocket ,sendMessagesToSocketId}