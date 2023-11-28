
const Category = require('../models/categorymodels');
const Subcategory = require('../models/subcategorymodels');
const Plan = require('../models/planmodels');

module.exports = {
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      const newCategory = await Category.create({ name });

      return res.status(201).json({
        message: 'Category added successfully',
        category: newCategory,
      }); 
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addSubcategory: async (req, res) => {
    try {
      console.log("body ==================> ",req.body)
      
      const { categoryId, name } = req.body;

      if (!categoryId || !name) {
        return res.status(400).json({ error: 'Category ID and subcategory name are required' });
      }
      // const category = await Category.findOne(categoryId);
      // console.log(categoryId)

      // if (category) {
        const newSubcategory = await Subcategory.create({
          name: name,
          categoryId: categoryId,
        });
        
        return res.status(201).json({
          message: 'Subcategory added successfully',
          subcategory: newSubcategory,
        });
      
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

 };


