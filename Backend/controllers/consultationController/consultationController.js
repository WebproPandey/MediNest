const {
  createConsultation,
  getPendingConsultations,
} = require("../../services/consultationService/consultationService");

// Submit Consultation Request (User → Admin Notified in Real-time)
exports.submitConsultation = async (req, res) => {
  try {
    const newConsultation = await createConsultation(req.body);

    // Emit real-time event to admin (via Socket.IO)
    req.app.get("io").emit("new_consultation", newConsultation);

    res.status(201).json({
      success: true,
      message: "Consultation submitted successfully",
      data: newConsultation,
    });
  } catch (error) {
    console.error("Error submitting consultation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit consultation",
    });
  }
};

// Fetch Pending Consultations (for Admin Dashboard)
exports.fetchConsultations = async (req, res) => {
  try {
    const consultations = await getPendingConsultations();

    res.status(200).json({
      success: true,
      message: "Pending consultations fetched successfully",
      data: consultations,
    });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch consultations",
    });
  }
};

exports.acceptConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const consultation = await require("../../models/ConsultationModel").findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );
    if (!consultation) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }
    // Notify user (optional, via socket)
    req.app.get("io").emit("consultation_accepted", consultation);

    res.json({ success: true, message: "Consultation accepted", data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error accepting consultation" });
  }
};
