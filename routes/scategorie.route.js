const express = require("express");
const router = express.Router();
const SCategorie = require("../models/scategorie");
const scategorie = require("../models/scategorie");
// afficher la liste des categories.
router.get("/", async (req, res) => {
  try {
    const scat = await SCategorie.find({}, null, { sort: { _id: -1 } })
      .populate("categorieID")
      .exec();

    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// créer un nouvelle catégorie
router.post("/", async (req, res) => {
  const nouvscateg = new scategorie(req.body);

  try {
    await nouvscateg.save();

    res.status(200).json(newSCategorie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// chercher une sous catégorie
router.get("/:scategorieId", async (req, res) => {
  try {
    const scat = await SCategorie.findById(req.params.scategorieId);
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// modifier une catégorie
router.put("/:scategorieId", async (req, res) => {
  try {
    const scat= await SCategorie.findByIdAndUpdate(
      req.params.scategorieId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Supprimer une catégori
router.delete("/:scategorieId", async (req, res) => {
  const id = req.params.scategorieId;
  await SCategorie.findByIdAndDelete(id);
  res.json({ message: "sous categorie deleted successfully." });
});

// chercher une sous catégorie par cat
router.get("/cat/:categorieID", async (req, res) => {
  try {
    const scat = await SCategorie.find({
      categorieID: req.params.categorieID,
    }).exec();
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
