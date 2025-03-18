const Size = require("../models/Size");

exports.createSize = async (req, res) => {
  try {
    const { size } = req.body;
    if (!size) {
      return res.status(404).send({ message: "Please enter a size" });
    }
    const existingSize = await Size.findOne({ size });
    if (existingSize) {
      return res.status(500).send({ message: "Size already exists" });
    }
    const newSize = new Size({ size });
    await newSize.save();
    return res
      .status(200)
      .send({ message: "Size created successfully", newSize });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getAllSizes = async (req, res) => {
  try {
    return res
      .status(200)
      .json(await Size.find({}).select("-__v").sort({ size: +1 }));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getSizeById = async (req, res) => {
  try {
    return res.status(200).json(await Size.findById(req.params.sid));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.updateSize = async (req, res) => {
  try {
    const { sid } = req.params;
    const { size } = req.body;
    if (!size) {
      return res.status(404).send({ message: "Please enter a size" });
    }
    const updatedSize = await Size.findByIdAndUpdate(
      sid,
      { size },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Size updated successfully", updatedSize });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteSize = async (req, res) => {
  try {
    const { sid } = req.params;
    const deleteSize = await Size.findByIdAndDelete(sid);
    res.status(200).send({ message: "Size deleted", size: deleteSize });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
