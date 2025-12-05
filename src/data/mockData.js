let users = [
  {
    id: 1,
    email: 'admin@restaurant.com',
    password: 'admin123', 
    role: 'manager',
    firstName: 'Faheem',
    lastName: 'المدير',
    phone: '+962791234567',
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 2,
    email: 'chef@restaurant.com',
    password: 'admin123',
    role: 'chef',
    firstName: 'محمد',
    lastName: 'الشيف',
    phone: '+962792234567',
    isActive: true, 
    createdAt: new Date('2024-01-01')
  },
  {
    id: 3,
    email: 'waiter@restaurant.com',
    password: 'admin123',
    role: 'waiter',
    firstName: 'خالد',
    lastName: 'النادل',
    phone: '+962793234567',
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 4,
    email: 'cashier@restaurant.com',
    password: '123456',
    role: 'cashier',
    firstName: 'سارة',
    lastName: 'الكاشير',
    phone: '+962794234567',
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 5,
    email: 'customer@restaurant.com',
    password: '123456',
    role: 'customer',
    firstName: 'رائد',
    lastName: 'الزبون',
    phone: '+962794234567',
    isActive: true,
    createdAt: new Date('2024-01-01')
  }
];

// Restaurant Info
let restaurant = {
  id: 1,
  name: 'مطعم الذواقة',
  nameEn: 'Gourmet Restaurant',
  address: 'شارع الرينبو، عمان، الأردن',
  phone: '+96265551234',
  email: 'info@gourmet-restaurant.com',
  openingHours: {
    saturday: { open: '10:00', close: '23:00' },
    sunday: { open: '10:00', close: '23:00' },
    monday: { open: '10:00', close: '23:00' },
    tuesday: { open: '10:00', close: '23:00' },
    wednesday: { open: '10:00', close: '23:00' },
    thursday: { open: '10:00', close: '23:00' },
    friday: { open: '14:00', close: '23:00' }
  },
  status: 'open',
  currency: 'JOD'
};

// Tables
let tables = [
  { id: 1, tableNumber: 1, capacity: 2, status: 'available', qrCode: 'QR-TABLE-001', currentOrderId: null },
  { id: 2, tableNumber: 2, capacity: 4, status: 'occupied', qrCode: 'QR-TABLE-002', currentOrderId: 1 },
  { id: 3, tableNumber: 3, capacity: 4, status: 'available', qrCode: 'QR-TABLE-003', currentOrderId: null },
  { id: 4, tableNumber: 4, capacity: 6, status: 'reserved', qrCode: 'QR-TABLE-004', currentOrderId: null },
  { id: 5, tableNumber: 5, capacity: 2, status: 'available', qrCode: 'QR-TABLE-005', currentOrderId: null },
  { id: 6, tableNumber: 6, capacity: 8, status: 'available', qrCode: 'QR-TABLE-006', currentOrderId: null },
  { id: 7, tableNumber: 7, capacity: 4, status: 'occupied', qrCode: 'QR-TABLE-007', currentOrderId: 2 },
  { id: 8, tableNumber: 8, capacity: 2, status: 'available', qrCode: 'QR-TABLE-008', currentOrderId: null }
];

// Categories
let categories = [
  { id: 1, name: 'المقبلات', nameEn: 'Appetizers', description: 'المقبلات والسلطات', displayOrder: 1, isActive: true },
  { id: 2, name: 'الأطباق الرئيسية', nameEn: 'Main Dishes', description: 'الأطباق الرئيسية', displayOrder: 2, isActive: true },
  { id: 3, name: 'المشاوي', nameEn: 'Grills', description: 'المشاوي على الفحم', displayOrder: 3, isActive: true },
  { id: 4, name: 'المعجنات', nameEn: 'Pastries', description: 'معجنات وفطائر', displayOrder: 4, isActive: true },
  { id: 5, name: 'الحلويات', nameEn: 'Desserts', description: 'حلويات شرقية وغربية', displayOrder: 5, isActive: true },
  { id: 6, name: 'المشروبات', nameEn: 'Beverages', description: 'عصائر ومشروبات ساخنة', displayOrder: 6, isActive: true },
  { id: 7, name: 'وجبات سريعة', nameEn: 'fastfood', description: 'وجبات سريعة', displayOrder: 7, isActive: true }
];

// Menu Items
let menuItems = [
  // Appetizers
  { id: 1, categoryId: 1, name: 'حمص بالطحينة', nameEn: 'Hummus', description: 'حمص طازج مع طحينة وزيت زيتون', price: 3.50, image: '/images/hummus.jpg', preparationTime: 5, isAvailable: true, ingredients: ['حمص', 'طحينة', 'ليمون', 'ثوم'], allergens: ['سمسم'] },
  { id: 2, categoryId: 1, name: 'متبل', nameEn: 'Muttabal', description: 'باذنجان مشوي مع طحينة', price: 3.00, image: '/images/muttabal.jpg', preparationTime: 5, isAvailable: true, ingredients: ['باذنجان', 'طحينة', 'ليمون'], allergens: ['سمسم'] },
  { id: 3, categoryId: 1, name: 'تبولة', nameEn: 'Tabbouleh', description: 'سلطة بقدونس طازجة', price: 3.50, image: '/images/tabbouleh.jpg', preparationTime: 10, isAvailable: true, ingredients: ['بقدونس', 'طماطم', 'برغل', 'بصل'], allergens: ['قمح'] },
  { id: 4, categoryId: 1, name: 'فتوش', nameEn: 'Fattoush', description: 'سلطة خضراء مع خبز محمص', price: 4.00, image: '/images/fattoush.jpg', preparationTime: 10, isAvailable: true, ingredients: ['خس', 'طماطم', 'خيار', 'خبز'], allergens: ['قمح'] },
  
  // Main Dishes
  { id: 5, categoryId: 2, name: 'منسف', nameEn: 'Mansaf', description: 'أرز بالخروف واللبن', price: 12.00, image: '/images/mansaf.jpg', preparationTime: 30, isAvailable: true, ingredients: ['لحم خروف', 'أرز', 'لبن', 'لوز'], allergens: ['ألبان', 'مكسرات'] },
  { id: 6, categoryId: 2, name: 'مقلوبة', nameEn: 'Maqluba', description: 'أرز مقلوب بالدجاج والخضار', price: 9.00, image: '/images/maqluba.jpg', preparationTime: 25, isAvailable: true, ingredients: ['دجاج', 'أرز', 'باذنجان', 'قرنبيط'], allergens: [] },
  { id: 7, categoryId: 2, name: 'كبسة دجاج', nameEn: 'Chicken Kabsa', description: 'أرز بالدجاج والبهارات', price: 8.50, image: '/images/kabsa.jpg', preparationTime: 25, isAvailable: true, ingredients: ['دجاج', 'أرز', 'طماطم', 'بهارات'], allergens: [] },
  
  // Grills
  { id: 8, categoryId: 3, name: 'كباب', nameEn: 'Kebab', description: 'كباب لحم مشوي', price: 10.00, image: '/images/kebab.jpg', preparationTime: 20, isAvailable: true, ingredients: ['لحم بقر', 'بصل', 'بقدونس'], allergens: [] },
  { id: 9, categoryId: 3, name: 'شيش طاووق', nameEn: 'Shish Tawook', description: 'دجاج مشوي متبل', price: 8.00, image: '/images/tawook.jpg', preparationTime: 20, isAvailable: true, ingredients: ['دجاج', 'ثوم', 'ليمون'], allergens: [] },
  { id: 10, categoryId: 3, name: 'مشكل مشاوي', nameEn: 'Mixed Grill', description: 'تشكيلة مشاوي متنوعة', price: 15.00, image: '/images/mixed-grill.jpg', preparationTime: 25, isAvailable: true, ingredients: ['لحم', 'دجاج', 'كفتة'], allergens: [] },
  
  // Pastries
  { id: 11, categoryId: 4, name: 'فطيرة لحمة', nameEn: 'Meat Pie', description: 'فطيرة محشية باللحم', price: 2.50, image: '/images/meat-pie.jpg', preparationTime: 15, isAvailable: true, ingredients: ['عجين', 'لحم', 'بصل'], allergens: ['قمح'] },
  { id: 12, categoryId: 4, name: 'فطيرة جبنة', nameEn: 'Cheese Pie', description: 'فطيرة محشية بالجبنة', price: 2.00, image: '/images/cheese-pie.jpg', preparationTime: 15, isAvailable: true, ingredients: ['عجين', 'جبنة'], allergens: ['قمح', 'ألبان'] },
  
  // Desserts
  { id: 13, categoryId: 5, name: 'كنافة', nameEn: 'Kunafa', description: 'كنافة بالجبنة', price: 4.50, image: '/images/kunafa.jpg', preparationTime: 10, isAvailable: true, ingredients: ['كنافة', 'جبنة', 'قطر'], allergens: ['قمح', 'ألبان'] },
  { id: 14, categoryId: 5, name: 'بقلاوة', nameEn: 'Baklava', description: 'بقلاوة بالفستق', price: 4.00, image: '/images/baklava.jpg', preparationTime: 5, isAvailable: true, ingredients: ['عجين', 'فستق', 'قطر'], allergens: ['قمح', 'مكسرات'] },
  { id: 15, categoryId: 5, name: 'أم علي', nameEn: 'Om Ali', description: 'حلى بالحليب والمكسرات', price: 3.50, image: '/images/om-ali.jpg', preparationTime: 15, isAvailable: true, ingredients: ['رقائق', 'حليب', 'مكسرات'], allergens: ['قمح', 'ألبان', 'مكسرات'] },
  
  // Beverages
  { id: 16, categoryId: 6, name: 'عصير برتقال طازج', nameEn: 'Fresh Orange Juice', description: 'عصير برتقال طبيعي', price: 2.50, image: '/images/orange-juice.jpg', preparationTime: 5, isAvailable: true, ingredients: ['برتقال'], allergens: [] },
  { id: 17, categoryId: 6, name: 'ليموناضة', nameEn: 'Lemonade', description: 'ليموناضة طازجة', price: 2.00, image: '/images/lemonade.jpg', preparationTime: 5, isAvailable: true, ingredients: ['ليمون', 'نعناع'], allergens: [] },
  { id: 18, categoryId: 6, name: 'شاي بالنعناع', nameEn: 'Mint Tea', description: 'شاي أخضر بالنعناع', price: 1.50, image: '/images/mint-tea.jpg', preparationTime: 5, isAvailable: true, ingredients: ['شاي', 'نعناع'], allergens: [] },
  { id: 19, categoryId: 6, name: 'قهوة عربية', nameEn: 'Arabic Coffee', description: 'قهوة عربية بالهيل', price: 2.00, image: '/images/arabic-coffee.jpg', preparationTime: 5, isAvailable: true, ingredients: ['قهوة', 'هيل'], allergens: [] },
  { id: 20, categoryId: 6, name: 'عصير مانجو', nameEn: 'Mango Juice', description: 'عصير مانجو طبيعي', price: 3.00, image: '/images/mango-juice.jpg', preparationTime: 5, isAvailable: true, ingredients: ['مانجو'], allergens: [] },
  // fastfood
  { id: 21, categoryId: 7, name: 'برجر', nameEn: 'burger', description: 'برجر  باللحم', price: 7.50, image: '/images/meat-pie.jpg', preparationTime: 15, isAvailable: true, ingredients: ['عجين', 'لحم', 'بصل'], allergens: ['قمح'] }

];

// Orders
let orders = [
  {
    id: 1,
    tableId: 2,
    customerId: null,
    waiterId: 3,
    status: 'preparing',
    totalAmount: 25.50,
    notes: 'بدون بصل في التبولة',
    items: [
      { id: 1, menuItemId: 1, menuItemName: 'حمص بالطحينة', quantity: 2, unitPrice: 3.50, subtotal: 7.00, specialRequests: '' },
      { id: 2, menuItemId: 3, menuItemName: 'تبولة', quantity: 1, unitPrice: 3.50, subtotal: 3.50, specialRequests: 'بدون بصل' },
      { id: 3, menuItemId: 5, menuItemName: 'منسف', quantity: 1, unitPrice: 12.00, subtotal: 12.00, specialRequests: '' },
      { id: 4, menuItemId: 16, menuItemName: 'عصير برتقال طازج', quantity: 2, unitPrice: 2.00, subtotal: 3.00, specialRequests: '' }
    ],
    createdAt: new Date('2024-11-04T12:30:00'),
    updatedAt: new Date('2024-11-04T12:35:00')
  },
  {
    id: 2,
    tableId: 7,
    customerId: null,
    waiterId: 3,
    status: 'pending',
    totalAmount: 32.00,
    notes: '',
    items: [
      { id: 5, menuItemId: 10, menuItemName: 'مشكل مشاوي', quantity: 2, unitPrice: 15.00, subtotal: 30.00, specialRequests: '' },
      { id: 6, menuItemId: 17, menuItemName: 'ليموناضة', quantity: 2, unitPrice: 2.00, subtotal: 2.00, specialRequests: 'مع ثلج إضافي' }
    ],
    createdAt: new Date('2024-11-04T13:00:00'),
    updatedAt: new Date('2024-11-04T13:00:00')
  }
];

// Order History (Completed Orders)
let orderHistory = [
  {
    id: 100,
    tableId: 1,
    customerId: null,
    waiterId: 3,
    status: 'completed',
    totalAmount: 18.50,
    notes: '',
    items: [
      { id: 100, menuItemId: 7, menuItemName: 'كبسة دجاج', quantity: 1, unitPrice: 8.50, subtotal: 8.50, specialRequests: '' },
      { id: 101, menuItemId: 2, menuItemName: 'متبل', quantity: 2, unitPrice: 3.00, subtotal: 6.00, specialRequests: '' },
      { id: 102, menuItemId: 13, menuItemName: 'كنافة', quantity: 1, unitPrice: 4.00, subtotal: 4.00, specialRequests: '' }
    ],
    paymentMethod: 'cash',
    paidAmount: 20.00,
    changeAmount: 1.50,
    createdAt: new Date('2024-11-04T11:00:00'),
    completedAt: new Date('2024-11-04T11:45:00')
  },
  {
    id: 101,
    tableId: 3,
    customerId: null,
    waiterId: 3,
    status: 'completed',
    totalAmount: 27.00,
    notes: '',
    items: [
      { id: 103, menuItemId: 8, menuItemName: 'كباب', quantity: 2, unitPrice: 10.00, subtotal: 20.00, specialRequests: '' },
      { id: 104, menuItemId: 1, menuItemName: 'حمص بالطحينة', quantity: 1, unitPrice: 3.50, subtotal: 3.50, specialRequests: '' },
      { id: 105, menuItemId: 18, menuItemName: 'شاي بالنعناع', quantity: 2, unitPrice: 1.50, subtotal: 3.00, specialRequests: '' }
    ],
    paymentMethod: 'card',
    paidAmount: 27.00,
    changeAmount: 0,
    createdAt: new Date('2024-11-03T19:00:00'),
    completedAt: new Date('2024-11-03T19:50:00')
  }
];

// Inventory
let inventory = [
  { id: 1, itemName: 'دجاج', quantity: 50, unit: 'kg', minimumQuantity: 20, lastRestocked: new Date('2024-11-01') },
  { id: 2, itemName: 'لحم بقر', quantity: 30, unit: 'kg', minimumQuantity: 15, lastRestocked: new Date('2024-11-02') },
  { id: 3, itemName: 'لحم خروف', quantity: 25, unit: 'kg', minimumQuantity: 10, lastRestocked: new Date('2024-11-01') },
  { id: 4, itemName: 'أرز', quantity: 100, unit: 'kg', minimumQuantity: 30, lastRestocked: new Date('2024-10-28') },
  { id: 5, itemName: 'باذنجان', quantity: 15, unit: 'kg', minimumQuantity: 10, lastRestocked: new Date('2024-11-03') },
  { id: 6, itemName: 'طماطم', quantity: 20, unit: 'kg', minimumQuantity: 10, lastRestocked: new Date('2024-11-04') },
  { id: 7, itemName: 'خس', quantity: 10, unit: 'kg', minimumQuantity: 5, lastRestocked: new Date('2024-11-04') },
  { id: 8, itemName: 'بقدونس', quantity: 5, unit: 'kg', minimumQuantity: 3, lastRestocked: new Date('2024-11-03') },
  { id: 9, itemName: 'برتقال', quantity: 40, unit: 'kg', minimumQuantity: 15, lastRestocked: new Date('2024-11-03') },
  { id: 10, itemName: 'ليمون', quantity: 20, unit: 'kg', minimumQuantity: 8, lastRestocked: new Date('2024-11-02') }
];

// Reservations
let reservations = [
  { id: 1, tableId: 4, customerName: 'علي أحمد', customerPhone: '+962795555555', numberOfGuests: 6, date: new Date('2024-11-04'), time: '19:00', status: 'confirmed', notes: 'عيد ميلاد', createdAt: new Date('2024-11-01') },
  { id: 2, tableId: 6, customerName: 'ليلى خالد', customerPhone: '+962796666666', numberOfGuests: 8, date: new Date('2024-11-05'), time: '20:00', status: 'pending', notes: '', createdAt: new Date('2024-11-03') }
];

// Reviews
let reviews = [
  { id: 1, orderId: 100, customerName: 'محمود', rating: 5, comment: 'طعم رائع وخدمة ممتازة', createdAt: new Date('2024-11-04T12:00:00') },
  { id: 2, orderId: 101, customerName: 'فاطمة', rating: 4, comment: 'جيد جداً، لكن التوصيل كان بطيء قليلاً', createdAt: new Date('2024-11-03T20:00:00') }
];

// Analytics Data
let analytics = {
  dailySales: {
    today: 156.50,
    yesterday: 234.00,
    thisWeek: 1245.00,
    thisMonth: 4567.00
  },
  popularItems: [
    { itemId: 5, itemName: 'منسف', orderCount: 45, revenue: 540.00 },
    { itemId: 10, itemName: 'مشكل مشاوي', orderCount: 38, revenue: 570.00 },
    { itemId: 7, itemName: 'كبسة دجاج', orderCount: 42, revenue: 357.00 },
    { itemId: 1, itemName: 'حمص بالطحينة', orderCount: 67, revenue: 234.50 }
  ],
  peakHours: [
    { hour: 13, orderCount: 23 },
    { hour: 14, orderCount: 18 },
    { hour: 19, orderCount: 31 },
    { hour: 20, orderCount: 28 },
    { hour: 21, orderCount: 19 }
  ]
};

// Export all data
module.exports = {
  users,
  restaurant,
  tables,
  categories,
  menuItems,
  orders,
  orderHistory,
  inventory,
  reservations,
  reviews,
  analytics,
  
  // Helper functions to get next IDs
  getNextUserId: () => Math.max(...users.map(u => u.id)) + 1,
  getNextOrderId: () => Math.max(...orders.map(o => o.id), ...orderHistory.map(o => o.id)) + 1,
  getNextReservationId: () => Math.max(...reservations.map(r => r.id)) + 1,
  getNextReviewId: () => Math.max(...reviews.map(r => r.id)) + 1,
  getNextMenuItemId: () => Math.max(...menuItems.map(m => m.id)) + 1,
  getNextCategoryId: () => Math.max(...categories.map(c => c.id)) + 1
};