import Showroom from "../models/Showroom.js";

export const createShowroom = async (req, res) => {
  try {
    const {
      name,
      code,
      email,
      phone,
      street,
      division,
      district,
      area,
      latitude,
      longitude,
    } = req.body;
    if (!name) return res.status(500).send({ message: "Name is required" });
    if (!code) return res.status(500).send({ message: "Code is required" });
    if (!email) return res.status(500).send({ message: "Email is required" });
    if (!phone) return res.status(500).send({ message: "Phone is required" });
    if (!street)
      return res.status(500).send({ message: "Address is required" });
    if (!division)
      return res.status(500).send({ message: "Division is required" });
    if (!district)
      return res.status(500).send({ message: "District is required" });
    if (!area) return res.status(500).send({ message: "Area is required" });
    if (!latitude || !longitude)
      return res.status(500).send({ message: "Coordinates is required" });
    const existingShowroom = await Showroom.findOne({ code });
    if (existingShowroom)
      return res.status(500).send({ message: "Showroom already exists" });
    else {
      const newShowroom = new Showroom({
        name,
        code,
        address: {
          street,
          division,
          district,
          area,
        },
        contact: {
          email,
          phone,
        },
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      });
      await newShowroom.save();
      return res
        .status(200)
        .send({ message: "Showroom created successfully", newShowroom });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getAllShowrooms = async (req, res) => {
  try {
    const allShowrooms = await Showroom.find();
    res.status(200).json(allShowrooms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updateShowroom = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      email,
      phone,
      street,
      division,
      district,
      area,
      latitude,
      longitude,
    } = req.body;
    if (!name) return res.status(500).send({ message: "Name is required" });
    if (!code) return res.status(500).send({ message: "Code is required" });
    if (!email) return res.status(500).send({ message: "Email is required" });
    if (!phone) return res.status(500).send({ message: "Phone is required" });
    if (!street)
      return res.status(500).send({ message: "Address is required" });
    if (!division)
      return res.status(500).send({ message: "Division is required" });
    if (!district)
      return res.status(500).send({ message: "District is required" });
    if (!area) return res.status(500).send({ message: "Area is required" });
    if (!latitude || !longitude)
      return res.status(500).send({ message: "Coordinates is required" });
    const existingShowroom = await Showroom.findById(id);
    if (!existingShowroom) {
      return res.status(500).send({ message: "Showroom not found" });
    }
    const updatedShowroom = await Showroom.findByIdAndUpdate(
      id,
      {
        name,
        code,
        address: {
          street,
          division,
          district,
          area,
        },
        contact: {
          email,
          phone,
        },
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .send({ message: "Showroom updated successfully", updatedShowroom });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deleteShowroom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShowroom = await Showroom.findByIdAndDelete(id);
    if (!deletedShowroom) {
      return res.status(500).send({ message: "Showroom not found" });
    }
    return res
      .status(200)
      .send({ message: "Showroom deleted successfully", deletedShowroom });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getNearbyShowrooms = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude)
      return res.status(500).send({ message: "Coordinates are required" });
    const nearbyShowrooms = await Showroom.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 30000,
        },
      },
    });
    res.status(200).json(nearbyShowrooms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getShowroomById = async (req, res) => {
  try {
    const { id } = req.params;
    const showroom = await Showroom.findById(id);
    if (!showroom) {
      return res.status(500).send({ message: "Showroom not found" });
    }
    res.status(200).json(showroom);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getFilteredShowrooms = async (req, res) => {
  try {
    const { division, district, area } = req.body;

    let filter = {};

    if (division) {
      filter["address.division"] = division;
    }
    if (district) {
      filter["address.district"] = district;
    }
    if (area) {
      filter["address.area"] = area;
    }
    console.log(filter)
    const filteredShowrooms = await Showroom.find(filter);
    res.status(200).json(filteredShowrooms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
