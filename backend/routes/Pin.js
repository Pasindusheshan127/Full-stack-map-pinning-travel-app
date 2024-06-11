const router = require("express").Router();
const Pin = require("../models/Pin");

// create a pins
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savePin = await newPin.save();
    res.status(200).json(savePin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
