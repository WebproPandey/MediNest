
const  express  =  require("express");
const { submitConsultation, fetchConsultations } = require("../../controllers/consultationController/consultationController");
const router =  express.Router()



router.post("/", submitConsultation);
router.get("/", fetchConsultations); 

module.exports = router