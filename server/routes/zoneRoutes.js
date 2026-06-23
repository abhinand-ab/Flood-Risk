const express = require("express");
const router = express.Router();

const Zone = require("../models/Zone");

router.get("/", async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/check-location", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    console.log("Received:", lat, lng);

    const point = {
      type: "Point",
      coordinates: [Number(lng), Number(lat)],
    };

    console.log("POINT:", point);

    const zone = await Zone.findOne({
      geometry: {
        $geoIntersects: {
          $geometry: point,
        },
      },
    });

    console.log("ZONE FOUND:", zone);

    if (!zone) {
      return res.json({
        riskLevel: "none",
        zoneName: "Safe Area",
        district: "Outside Flood Zones",
        safetyScore: 100,
      });
    }

    let score = 100;

    if (zone.riskLevel === "high") score = 25;
    if (zone.riskLevel === "medium") score = 60;
    if (zone.riskLevel === "low") score = 90;

    res.json({
      riskLevel: zone.riskLevel,
      zoneName: zone.name,
      district: zone.district,
      safetyScore: score,
    });
  } catch (error) {
    console.error("CHECK LOCATION ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;