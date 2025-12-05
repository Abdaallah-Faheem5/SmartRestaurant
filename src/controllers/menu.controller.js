const { categories, menuItems, getNextCategoryId, getNextMenuItemId } = require('../data/mockData');

class MenuController {
  // Get all categories
  getAllCategories(req, res) {
    try {
      const activeCategories = categories.filter(c => c.isActive);
      
      res.json({
        success: true,
        count: activeCategories.length,
        data: activeCategories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في جلب الفئات',
        error: error.message
      });
    }
  }

  // Get all menu items
  getAllMenuItems(req, res) {
    try {
      const { category, 
              available, 
              search } = req.query;
      
      let filteredItems = [...menuItems];

      
      if (category) {
        filteredItems = filteredItems.filter(item => item.categoryId === parseInt(category));
      }

      
      if (available !== undefined) {
        const isAvailable = available === 'true';
        filteredItems = filteredItems.filter(item => item.isAvailable === isAvailable);
      }

      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.name.toLowerCase().includes(searchLower) || 
          item.nameEn.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
        );
      }

      res.json({
        success: true,
        count: filteredItems.length,
        data: filteredItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في جلب العناصر',
        error: error.message
      });
    }
  }

  // Get menu item by ID
  getMenuItemById(req, res) {
    try {
      const item = menuItems.find(i => i.id === parseInt(req.params.id));
      
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'العنصر غير موجود'
        });
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Get items by category
  getItemsByCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const category = categories.find(c => c.id === categoryId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
      }

      const items = menuItems.filter(i => i.categoryId === categoryId && i.isAvailable);

      res.json({
        success: true,
        category: category,
        count: items.length,
        data: items
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Create category (manager only)
  createCategory(req, res) {
    try {
      const { name, 
              nameEn, 
              description, 
              displayOrder 
            } = req.body;

      if (!name || !nameEn) {
        return res.status(400).json({
          success: false,
          message: 'الاسم بالعربي والإنجليزي مطلوبان'
        });
      }

      const newCategory = {
        id: getNextCategoryId(),
        name,
        nameEn,
        description: description || '',
        displayOrder: displayOrder || categories.length + 1,
        isActive: true
      };

      categories.push(newCategory);

      res.status(201).json({
        success: true,
        message: 'تم إضافة الفئة بنجاح',
        data: newCategory
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في إضافة الفئة',
        error: error.message
      });
    }
  }

  // Update category
  updateCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.id);
      const categoryIndex = categories.findIndex(c => c.id === categoryId);

      if (categoryIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
      }

      categories[categoryIndex] = {
        ...categories[categoryIndex],
        ...req.body,
        id: categoryId
      };

      res.json({
        success: true,
        message: 'تم تحديث الفئة بنجاح',
        data: categories[categoryIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في التحديث',
        error: error.message
      });
    }
  }

  // Delete category
  deleteCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.id);
      const categoryIndex = categories.findIndex(c => c.id === categoryId);

      if (categoryIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
      }

      // Check if category has items
      const hasItems = menuItems.some(i => i.categoryId === categoryId);
      if (hasItems) {
        return res.status(400).json({
          success: false,
          message: 'لا يمكن حذف فئة تحتوي على عناصر'
        });
      }

      categories.splice(categoryIndex, 1);

      res.json({
        success: true,
        message: 'تم حذف الفئة بنجاح'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في الحذف',
        error: error.message
      });
    }
  }

  // Create menu item
  createMenuItem(req, res) {
    try {
      const { categoryId,
              name,
              nameEn,
              description,
              price, 
              preparationTime, 
              ingredients, 
              allergens 
            } = req.body;

      if (!categoryId || !name || !nameEn || !price) {
        return res.status(400).json({
          success: false,
          message: 'الفئة والاسم والسعر مطلوبة'
        });
      }

      const category = categories.find(c => c.id === categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
      }

      const newItem = {
        id: getNextMenuItemId(),
        categoryId,
        name,
        nameEn,
        description: description || '',
        price: parseFloat(price),
        image: req.body.image || '/images/default.jpg',
        preparationTime: preparationTime || 15,
        isAvailable: true,
        ingredients: ingredients || [],
        allergens: allergens || []
      };

      menuItems.push(newItem);

      res.status(201).json({
        success: true,
        message: 'تم إضافة العنصر بنجاح',
        data: newItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في الإضافة',
        error: error.message
      });
    }
  }

  // Update menu item
  updateMenuItem(req, res) {
    try {
      const itemId = parseInt(req.params.id);
      const itemIndex = menuItems.findIndex(i => i.id === itemId);

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'العنصر غير موجود'
        });
      }

      menuItems[itemIndex] = {
        ...menuItems[itemIndex],
        ...req.body,
        id: itemId
      };

      res.json({
        success: true,
        message: 'تم تحديث العنصر بنجاح',
        data: menuItems[itemIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في التحديث',
        error: error.message
      });
    }
  }

  // Delete menu item
  deleteMenuItem(req, res) {
    try {
      const itemId = parseInt(req.params.id);
      const itemIndex = menuItems.findIndex(i => i.id === itemId);

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'العنصر غير موجود'
        });
      }

      menuItems.splice(itemIndex, 1);

      res.json({
        success: true,
        message: 'تم حذف العنصر بنجاح'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في الحذف',
        error: error.message
      });
    }
  }

  // Toggle availability
  toggleAvailability(req, res) {
    try {
      const itemId = parseInt(req.params.id);
      const item = menuItems.find(i => i.id === itemId);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'العنصر غير موجود'
        });
      }

      item.isAvailable = !item.isAvailable;

      res.json({
        success: true,
        message: `تم ${item.isAvailable ? 'تفعيل' : 'إيقاف'} العنصر`,
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }
}

module.exports = new MenuController();