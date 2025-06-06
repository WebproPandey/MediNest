const Address = require("../../models/addressModel");

exports.addAddress = async (req, res) => {
  const { fullName, phone, pinCode, addressLine, city, state, country } = req.body;

  try {

     console.log("Request Body:", req.body); // Debugging
    console.log("User ID:", req.user?.id); // Debugging

    const address = await Address.create({
      userId: req.user.id,
      fullName,
      phone,
      pinCode,
      addressLine,
      city,
      state,
      country,
    });

    res.status(201).json({ message: "Address added successfully", address });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Failed to add address" });
  }
};

exports.getAddresses = async (req, res) => {
  try {
        console.log("Fetching addresses for user:", req.user?.id); // Debugging

    const addresses = await Address.find({ userId: req.user.id });
    res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
};