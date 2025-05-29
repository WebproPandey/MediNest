const  Consultation  =  require ('../../models/ConsultationModel')

exports.createConsultation = async (data) => {
  return await Consultation.create(data);
};

exports.getPendingConsultations = async () => {
  return await Consultation.find({ status: "pending" }).populate("userId", "name");
};
