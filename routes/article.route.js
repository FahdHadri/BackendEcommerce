var express = require("express");
var router = express.Router();

// Créer une instance de article.
const Article = require("../models/article");

// afficher la liste des categories.
router.get("/", async (req, res) => {
    try {
        const art = await Article.find({}, null, { sort: { _id: -1 } }).populate("scategorieID").exec();
        res.status(200).json(art);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
        
});

// afficher la liste des categories. REDUX PAGE
router.get("/productspage", async (req, res) => {
  const {page,limit} =req.query;
  //calculer le nombre d'elements a sauter
  const offset=(page-1)*limit;
  try {
      const art = await Article.find()
      .skip(offset)
      .limit(limit)
      
      res.status(200).json(art);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
      
});

// créer un nouveau article
router.post("/", async (req, res) => {
  const nouvarticle = new Article(req.body)

  try {
      await nouvarticle.save();

      res.status(200).json(nouvarticle );
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
})
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
router.put('/:articleId', async (req, res)=> {
  try {
   const art = await Article.findByIdAndUpdate(
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
router.delete('/:articleId', async (req, res)=> {
  const  id  = req.params.articleId;
  await Article.findByIdAndDelete(id);

  res.json({ message: "article deleted successfully." });

});
module.exports = router;
