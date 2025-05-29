import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { newConsultationReceived, removeConsultationNotification } from "../redux/action/chatAction";

const socket = io("http://localhost:5000", { withCredentials: true });

const AdminNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.adminChat.notifications);

  useEffect(() => {
    socket.on("new_consultation", (consultation) => {
      dispatch(newConsultationReceived(consultation));
    });
    return () => socket.off("new_consultation");
  }, [dispatch]);

  const handleAccept = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/consultation/${id}/accept`,
        {},
        { withCredentials: true }
      );
      dispatch(removeConsultationNotification(id));
      alert("Consultation accepted!");
    } catch {
      alert("Failed to accept consultation");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-bold">New Consultations</h2>
        {notifications.length > 0 && (
          <span className="bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">
            {notifications.length}
          </span>
        )}
      </div>
      <ul>
        {notifications.map((c) => (
          <li key={c._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <span className="font-semibold">{c.name}</span>: {c.problem}
            </div>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              onClick={() => handleAccept(c._id)}
            >
              Accept
            </button>
          </li>
        ))}
        {notifications.length === 0 && <li className="text-gray-500">No new consultations</li>}
      </ul>
    </div>
  );
};

export default AdminNotifications;