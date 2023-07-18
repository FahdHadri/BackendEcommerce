var express = require("express");
var router = express.Router();

// Créer une instance de article.
const Article = require("../models/article");

// afficher la liste des categories.
router.get("/", async (req, res) => {
    try {
        const art = await Article.find({}, null, { sort: { _id: -1 } });
        res.status(200).json(art);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
        
});

// créer un nouveau article
router.post("/", async (req, res) => {
    const { reference, designation,prix,marque,qtestock,imageart,scategorieID } = req.body;
    const newArticle = new Article({
        reference:reference,
        designation:designation,
        prix:prix,
        marque: marque,
        qtestock:qtestock,
        imageart:imageart,
        scategorieID :scategorieID
    });
    try {
      await newArticle.save();
      res.status(200).json(newArticle);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
});

// chercher une article
router.get("/:articleId", async (req, res) => {
    try { 
        const art = await article.findById(req.params.id)
        res.status(200).json(art);
     } catch (error) {
         res.status(404).json({ message: error.message });
         } 
});

// modifier un article
router.put("/:articleId", async (req, res) => {
    try {
        const art = await article.findByIdAndUpdate(
          req.params.articleId,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(art);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
});

// Supprimer un article
router.delete("/:articleId", async (req, res) => {
    
  const cat = await Article.findByIdAndDelete(req.params.articleId);
  res.json({ message: "categorie deleted successfully." });
});
module.exports = router;
