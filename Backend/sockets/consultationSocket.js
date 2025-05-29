export const socketConnection = (io) => {
  const users = new Map(); // Track userId -> socketId if needed

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", ({ roomId, userId }) => {
      socket.join(roomId);
      users.set(userId, socket.id);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    socket.on("send_message", ({ roomId, message, senderId, role }) => {
      io.to(roomId).emit("receive_message", {
        message,
        senderId,
        role,
        from: socket.id,
        timestamp: new Date(),
      });
    });
    
        socket.on("join_consultation", (consultationId) => {
      socket.join(consultationId);
    });

    // Chat message
  
    socket.on("typing", ({ roomId, senderId }) => {
      socket.to(roomId).emit("typing", { senderId });
    });

      socket.on("chat_message", ({ consultationId, sender, message }) => {
      io.to(consultationId).emit("chat_message", { sender, message, time: new Date() });
    });

    // WebRTC signaling
    socket.on("offer", (data) => io.to(data.room).emit("offer", data));
    socket.on("answer", (data) => io.to(data.room).emit("answer", data));
    socket.on("ice-candidate", (data) =>
      io.to(data.room).emit("ice-candidate", data)
    );

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const [id, sId] of users.entries()) {
        if (sId === socket.id) users.delete(id);
      }
    });
  });
};
