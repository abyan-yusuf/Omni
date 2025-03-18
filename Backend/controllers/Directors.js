const Directors = require("../models/Directors");
const fs = require("fs");

exports.getAllDirectors = async (req, res) => {
  try {
    return res.status(200).json(await Directors.find({}).select("-__v -image"));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.addDirector = async (req, res) => {
  try {
    const { name, designation, about } = req.fields;
    const { image } = req.files;
    if (!name) {
      return res.status(404).send({ message: "Name is required" });
    }
    if (!designation) {
      return res.status(404).send({ message: "Designation is required" });
    }
    if (!about) {
      return res.status(404).send({ message: "About is required" });
    }
    const newDirector = new Directors({ name, designation, about });
    if (image) {
      newDirector.image.data = fs.readFileSync(image.path);
      newDirector.image.contentType = image.type;
    } else {
      return res.status(404).send({ message: "Image is required" });
    }
    await newDirector.save();
    return res.status(200).json({
      message: "Director added successfully",
      newDirector,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getDirectorImage = async (req, res) => {
  try {
    const image = await Directors.findById(req.params.id).select("image");
    if (!image) {
      return res.status(500).send({ message: "Director not found" });
    } else {
      res.set("Content-Type", image.image.contentType);
      res.send(image.image.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.updateDirector = async (req, res) => {
  try {
    const { name, designation, about } = req.fields;
    const { image } = req.files;
    if (!name) {
      return res.status(404).send({ message: "Name is required" });
    }
    if (!designation) {
      return res.status(404).send({ message: "Designation is required" });
    }
    if (!about) {
      return res.status(404).send({ message: "About is required" });
    }
    const director = await Directors.findById(req.params.id);
    if (!director) {
      return res.status(404).send({ message: "Director not found" });
    }
    if (image) {
      director.image.data = fs.readFileSync(image.path);
      director.image.contentType = image.type;
    }
    const updatedDirector = await Directors.findByIdAndUpdate(
      req.params.id,
      { name, designation, about },
      { new: true }
    );
    
    if (image?.path && image?.type) {
        updatedDirector.image.data = fs.readFileSync(image.path);
        updatedDirector.image.contentType = image.type;
      }
      await updatedDirector.save();
    return res.status(200).json({
      message: "Director updated successfully",
      director,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteDirector = async (req, res) => {
  try {
    const director = await Directors.findById(req.params.id);
    if (!director) {
      return res.status(404).send({ message: "Director not found" });
    }
    await Directors.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Director deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};