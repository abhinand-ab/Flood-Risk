const mongoose = require("mongoose");

const ZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },

  riskLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },

  geometry: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
    },

    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
});

ZoneSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("Zone", ZoneSchema);