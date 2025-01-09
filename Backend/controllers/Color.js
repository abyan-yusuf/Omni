import Color from "../models/Color.js";

export const createColor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({ message: "Please enter a color" });
    }
    const existingColor = await Color.findOne({ name });
    if (existingColor) {
      return res.status(500).send({ message: "Color already exists" });
    }
    const newColor = new Color({ name });
    await newColor.save();
    return res
      .status(200)
      .send({ message: "Color created successfully", newColor });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getAllColors = async (req, res) => {
  try {
    return res.status(200).json(await Color.find({}));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getColorById = async (req, res) => {
  try {
    return res.status(200).json(await Color.findById(req.params.cid));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updateColor = async (req, res) => {
  try {
    const { cid } = req.params;
    const { name } = req.body
    if (!name) {
      return res.status(404).send({ message: "Please enter a color" });
    }
    const updatedColor = await Color.findByIdAndUpdate(
      cid,
      {name},
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Color updated successfully", updatedColor });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deleteColor = async (req, res) => {
  try {
    const { cid } = req.params;
    const deleteColor = await Color.findByIdAndDelete(cid);
    res.status(200).send({ message: "Color deleted", color: deleteColor });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
