const Category = require("../models/category.model");

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving categories", error });
    }
  }
}

module.exports = new CategoryController();
