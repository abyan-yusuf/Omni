import Showroom from "../models/Showroom.js";

export const createShowroom = async (req, res) => {
  try {
    const { name, code, email, phone, address, division, district, thana } =
      req.body;
    if (!name) return res.status(500).send({ message: "Name is required" });
    if (!code) return res.status(500).send({ message: "Code is required" });
    if (!email) return res.status(500).send({ message: "Email is required" });
    if (!phone) return res.status(500).send({ message: "Phone is required" });
    if (!address)
      return res.status(500).send({ message: "Address is required" });
    if (!division)
      return res.status(500).send({ message: "Division is required" });
    if (!district)
      return res.status(500).send({ message: "District is required" });
    if (!thana) return res.status(500).send({ message: "Thana is required" });
    const existingShowroom = await Showroom.findOne({ code });
    if (existingShowroom)
      return res.status(500).send({ message: "Showroom already exists" });
    else {
      const newShowroom = new Showroom({
        name,
        code,
        email,
        phone,
        address,
        division,
        district,
        thana,
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
}

export const getShowroomById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleShowroom = await Showroom.findById(id);
    if (!singleShowroom) {
      return res.status(500).send({ message: "Showroom not found" });
    }
    res.status(200).json(singleShowroom);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export const updateShowroom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, email, phone, address, division, district, thana } = req.body;
    if (!name) return res.status(500).send({ message: "Name is required" });
    if (!code) return res.status(500).send({ message: "Code is required" });
    if (!email) return res.status(500).send({ message: "Email is required" });
    if (!phone) return res.status(500).send({ message: "Phone is required" });
    if (!address)
      return res.status(500).send({ message: "Address is required" });
    if (!division)
      return res.status(500).send({ message: "Division is required" });
    if (!district)
      return res.status(500).send({ message: "District is required" });
    if (!thana) return res.status(500).send({ message: "Thana is required" });
    const existingShowroom = await Showroom.findById(id);
    if (existingShowroom)
      return res.status(500).send({ message: "Showroom already exists" });
    else {
      const updatedShowroom = await Showroom.findByIdAndUpdate(
        id,
        {
          name,
          code,
          email,
          phone,
          address,
          division,
          district, 
          thana
        },
        { new: true }
      );
      return res
        .status(200)
        .send({ message: "Showroom updated successfully", updatedShowroom });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

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
}