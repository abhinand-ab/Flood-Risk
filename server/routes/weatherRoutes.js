const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:lat/:lon", async (req, res) => {
  try {
    const { lat, lon } = req.params;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;