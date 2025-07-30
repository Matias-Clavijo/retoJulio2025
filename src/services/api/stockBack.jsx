/* eslint-disable no-unused-vars */
// Mock API services for the stock management system
// eslint-disable-next-line no-unused-vars
const mockProducts = [
  {
    id: 1,
    name: "HP Notebook",
    description: "15'' i5 Notebook",
    prices: [
      { currency: "USD", value: 700 },
      { currency: "UY", value: 28000 }
    ],
    brand: { id: 1, name: "HP" },
    category: { id: 1, name: "Computing" },
    depositsCount: 3,
    deposits: [ "Depósito 1", "Depósito 2", "Depósito 3", "Depósito 4", "Depósito 5", "Depósito 6", "Depósito 7", "Depósito 8", "Depósito 9", "Depósito 10" ]
  },
  {
    id: 2,
    name: "Dell Laptop",
    description: "17'' i7 Gaming Laptop",
    prices: [
      { currency: "USD", value: 1200 },
      { currency: "UY", value: 48000 }
    ],
    brand: { id: 2, name: "Dell" },
    category: { id: 1, name: "Computing" },
    depositsCount: 2,
    deposits: [ "Depósito 1", "Depósito 2", "Depósito 3" ]
  }
];

const mockBrands = [
  {
    id: 1,
    name: "HP",
    description: "Technology",
    country: "USA",
    createdAt: "2023-05-10T14:30:00Z",
    associatedProductCount: 2
  },
  {
    id: 2,
    name: "Dell",
    description: "Computer Technology",
    country: "USA",
    createdAt: "2023-06-15T09:20:00Z",
    associatedProductCount: 1
  }
];

const mockCategories = [
  { id: 1, name: "Computing", productsCount: 3 },
  { id: 2, name: "Electronics", productsCount: 5 }
];

const mockDeposits = [
  {
    id: 1,
    name: "Central Warehouse",
    description: "Main warehouse",
    location: "Montevideo, Uruguay",
    productCount: 3,
    associatedDate: "2002-09-30"
  },
  {
    id: 2,
    name: "Depósito Norte",
    description: "Zona norte",
    location: "Montevideo, Uruguay",
    productCount: 5,
    associatedDate: "2002-09-30"
  }
];

const mockProviders = [
  {
    id: 1,
    type: "Persona",
    firstName: "Juan",
    lastName: "Pérez",
    phone: "+598 92 123 456",
    email: "juan@delta.com",
    associatedDate: "2006-09-30"
  },
  {
    id: 2,
    type: "Empresa",
    firstName: "TechCorp",
    lastName: "S.A.",
    phone: "+598 91 987 654",
    email: "contacto@techcorp.com",
    associatedDate: "2010-03-15"
  }
];

const mockUsers = [
  {
    id: 1,
    firstName: "Lucía",
    lastName: "Gómez",
    email: "lucia.gomez@example.com",
    phone: "+598 93 456 789"
  }
];

const mockSales = [
  {
    id: 1,
    date: "2025-07-22",
    price: {
      value: 1234,
      currency: "USD"
    },
    product: {
      id: 1,
      count: 1
    },
    paymentMethod: "Efectivo",
    reseller: "Juan Pérez"
  },
  {
    id: 2,
    date: "2025-07-23",
    price: {
      value: 2150,
      currency: "USD"
    },
    product: {
      id: 2,
      count: 1
    },
    paymentMethod: "Tarjeta",
    reseller: "María González"
  },
  {
    id: 3,
    date: "2025-07-22",
    price: {
      value: 850,
      currency: "USD"
    },
    product: {
      id: 1,
      count: 1
    },
    paymentMethod: "Mercado pago",
    reseller: "Carlos López"
  },
  {
    id: 4,
    date: "2025-07-21",
    price: {
      value: 3200,
      currency: "USD"
    },
    product: {
      id: 2,
      count: 2
    },
    paymentMethod: "Apple pay",
    reseller: "Ana Martínez"
  },
  {
    id: 5,
    date: "2025-07-20",
    price: {
      value: 1800,
      currency: "USD"
    },
    product: {
      id: 1,
      count: 1
    },
    paymentMethod: "Paypal",
    reseller: "Roberto Silva"
  },
  {
    id: 6,
    date: "2025-07-19",
    price: {
      value: 950,
      currency: "USD"
    },
    product: {
      id: 2,
      count: 1
    },
    paymentMethod: "Efectivo",
    reseller: "Lucía Rodríguez"
  },
  {
    id: 7,
    date: "2025-07-18",
    price: {
      value: 2700,
      currency: "USD"
    },
    product: {
      id: 1,
      count: 2
    },
    paymentMethod: "Mercadopago",
    reseller: "Diego Fernández"
  }
];

const mockStockMovements = [
  {
    id: 1,
    type: "IN",
    product: {
      id: 1,
      name: "HP Notebook",
      description: "15'' i5 Notebook"
    },
    deposit: {
      id: 1,
      name: "Central Warehouse",
      description: "Main warehouse"
    },
    referenceId: 1,
    quantity: 50,
    date: "2025-07-24T10:00:00Z",
    user: {
      id: 1,
      firstName: "Lucía",
      lastName: "Gómez"
    }
  },
  {
    id: 2,
    type: "OUT",
    product: {
      id: 2,
      name: "Dell Laptop",
      description: "17'' i7 Gaming Laptop"
    },
    deposit: {
      id: 2,
      name: "Depósito Norte",
      description: "Zona norte"
    },
    referenceId: 2,
    quantity: 10,
    date: "2025-07-24T10:00:00Z",
    user: {
      id: 1,
      firstName: "Lucía",
      lastName: "Gómez"
    }
  }
];

// Helper function to create paginated response
const createPaginatedResponse = (data, page = 1, items = 10) => {
  const startIndex = (page - 1) * items;
  const endIndex = startIndex + items;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: paginatedData,
    pagination: {
      page: page,
      items: items,
      count: paginatedData.length,
      totalCount: data.length
    }
  };
};

// PRODUCTOS
export const productsAPI = {
  // GET /products
  getProducts: async (page = 1, items = 10) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return createPaginatedResponse(mockProducts, page, items);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return { success: false, error: "Error fetching products" };
    }
  },

  // POST /products
  createProduct: async (productData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newProduct = {
        id: mockProducts.length + 1,
        ...productData,
        depositsCount: 0
      };
      mockProducts.push(newProduct);
      return { success: true, data: newProduct };
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return { success: false, error: "Error creating product" };
    }
  },

  // PUT /products/{id}
  updateProduct: async (id, productData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        return { success: false, error: "Product not found" };
      }
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return { success: true, data: mockProducts[index] };
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return { success: false, error: "Error updating product" };
    }
  },

  // DELETE /products/{id}
  deleteProduct: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        return { success: false, error: "Product not found" };
      }
      mockProducts.splice(index, 1);
      return { success: true };
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return { success: false, error: "Error deleting product" };
    }
  }
};

// MARCAS
export const brandsAPI = {
  // GET /brands
  getBrands: async (page = 1, items = 10) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createPaginatedResponse(mockBrands, page, items);
    } catch (error) {
      return { success: false, error: "Error fetching brands" };
    }
  },

  // POST /brands
  createBrand: async (brandData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newBrand = {
        id: mockBrands.length + 1,
        ...brandData,
        createdAt: new Date().toISOString(),
        associatedProductCount: 0
      };
      mockBrands.push(newBrand);
      return { success: true, data: newBrand };
    } catch (error) {
      return { success: false, error: "Error creating brand" };
    }
  },

  // PUT /brands/{id}
  updateBrand: async (id, brandData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockBrands.findIndex(b => b.id === id);
      if (index === -1) {
        return { success: false, error: "Brand not found" };
      }
      mockBrands[index] = { ...mockBrands[index], ...brandData };
      return { success: true, data: mockBrands[index] };
    } catch (error) {
      return { success: false, error: "Error updating brand" };
    }
  },

  // DELETE /brands/{id}
  deleteBrand: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockBrands.findIndex(b => b.id === id);
      if (index === -1) {
        return { success: false, error: "Brand not found" };
      }
      mockBrands.splice(index, 1);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error deleting brand" };
    }
  }
};

// CATEGORÍAS
export const categoriesAPI = {
  // GET /categories
  getCategories: async (page = 1, items = 10) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createPaginatedResponse(mockCategories, page, items);
    } catch (error) {
      return { success: false, error: "Error fetching categories" };
    }
  },

  // POST /categories
  createCategory: async (categoryData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newCategory = {
        id: mockCategories.length + 1,
        ...categoryData,
        productsCount: 0
      };
      mockCategories.push(newCategory);
      return { success: true, data: newCategory };
    } catch (error) {
      return { success: false, error: "Error creating category" };
    }
  },

  // PUT /categories/{id}
  updateCategory: async (id, categoryData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockCategories.findIndex(c => c.id === id);
      if (index === -1) {
        return { success: false, error: "Category not found" };
      }
      mockCategories[index] = { ...mockCategories[index], ...categoryData };
      return { success: true, data: mockCategories[index] };
    } catch (error) {
      return { success: false, error: "Error updating category" };
    }
  },

  // DELETE /categories/{id}
  deleteCategory: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockCategories.findIndex(c => c.id === id);
      if (index === -1) {
        return { success: false, error: "Category not found" };
      }
      mockCategories.splice(index, 1);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error deleting category" };
    }
  }
};

// DEPÓSITOS
export const depositsAPI = {
  // GET /deposits
  getDeposits: async (page = 1, items = 10) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createPaginatedResponse(mockDeposits, page, items);
    } catch (error) {
      return { success: false, error: "Error fetching deposits" };
    }
  },

  // POST /deposits
  createDeposit: async (depositData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newDeposit = {
        id: mockDeposits.length + 1,
        ...depositData,
        productCount: 0,
        associatedDate: new Date().toISOString().split('T')[0]
      };
      mockDeposits.push(newDeposit);
      return { success: true, data: newDeposit };
    } catch (error) {
      return { success: false, error: "Error creating deposit" };
    }
  },

  // PUT /deposits/{id}
  updateDeposit: async (id, depositData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockDeposits.findIndex(d => d.id === id);
      if (index === -1) {
        return { success: false, error: "Deposit not found" };
      }
      mockDeposits[index] = { ...mockDeposits[index], ...depositData };
      return { success: true, data: mockDeposits[index] };
    } catch (error) {
      return { success: false, error: "Error updating deposit" };
    }
  },

  // DELETE /deposits/{id}
  deleteDeposit: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockDeposits.findIndex(d => d.id === id);
      if (index === -1) {
        return { success: false, error: "Deposit not found" };
      }
      mockDeposits.splice(index, 1);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error deleting deposit" };
    }
  }
};

// STOCK
export const stockAPI = {
  // PUT /deposits/{depositId}/products/{productId}
  updateStock: async (depositId, productId, stockData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock implementation - in real scenario would update stock count
      return { success: true, data: { depositId, productId, ...stockData } };
    } catch (error) {
      return { success: false, error: "Error updating stock" };
    }
  }
};

// PROVEEDORES
export const providersAPI = {
  // GET /providers
  getProviders: async (page = 1, items = 10) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createPaginatedResponse(mockProviders, page, items);
    } catch (error) {
      return { success: false, error: "Error fetching providers" };
    }
  },

  // POST /providers
  createProvider: async (providerData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newProvider = {
        id: mockProviders.length + 1,
        ...providerData,
        associatedDate: new Date().toISOString().split('T')[0]
      };
      mockProviders.push(newProvider);
      return { success: true, data: newProvider };
    } catch (error) {
      return { success: false, error: "Error creating provider" };
    }
  },

  // PUT /providers/{id}
  updateProvider: async (id, providerData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProviders.findIndex(p => p.id === id);
      if (index === -1) {
        return { success: false, error: "Provider not found" };
      }
      mockProviders[index] = { ...mockProviders[index], ...providerData };
      return { success: true, data: mockProviders[index] };
    } catch (error) {
      return { success: false, error: "Error updating provider" };
    }
  },

  // DELETE /providers/{id}
  deleteProvider: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProviders.findIndex(p => p.id === id);
      if (index === -1) {
        return { success: false, error: "Provider not found" };
      }
      mockProviders.splice(index, 1);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error deleting provider" };
    }
  }
};

// USUARIOS
export const usersAPI = {
  // GET /users/{id}
  getUser: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        return { success: false, error: "User not found" };
      }
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: "Error fetching user" };
    }
  },

  // POST /signup
  signup: async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newUser = {
        id: mockUsers.length + 1,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      };
      mockUsers.push(newUser);
      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, error: "Error creating user" };
    }
  },

  // PUT /users/{id}
  updateUser: async (id, userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) {
        return { success: false, error: "User not found" };
      }
      mockUsers[index] = { ...mockUsers[index], ...userData };
      return { success: true, data: mockUsers[index] };
    } catch (error) {
      return { success: false, error: "Error updating user" };
    }
  }
};

// VENTAS
export const salesAPI = {
  // GET /sales
  getSales: async (page = 1, items = 10) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const total = mockSales.reduce((sum, sale) => sum + sale.price.value, 0);
      const response = createPaginatedResponse(mockSales, page, items);
      response.total = total;
      response.currency = "USD";
      return response;
    } catch (error) {
      return { success: false, error: "Error fetching sales" };
    }
  },

  // POST /sales
  createSale: async (saleData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newSale = {
        id: mockSales.length + 1,
        ...saleData
      };
      mockSales.push(newSale);
      return { success: true, data: newSale };
    } catch (error) {
      return { success: false, error: "Error creating sale" };
    }
  },

  // PUT /sales/{id}
  updateSale: async (id, saleData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockSales.findIndex(s => s.id === id);
      if (index === -1) {
        return { success: false, error: "Sale not found" };
      }
      mockSales[index] = { ...mockSales[index], ...saleData };
      return { success: true, data: mockSales[index] };
    } catch (error) {
      return { success: false, error: "Error updating sale" };
    }
  },

  // DELETE /sales/{id}
  deleteSale: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockSales.findIndex(s => s.id === id);
      if (index === -1) {
        return { success: false, error: "Sale not found" };
      }
      mockSales.splice(index, 1);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error deleting sale" };
    }
  }
};

// MOVIMIENTOS DE STOCK
export const stockMovementsAPI = {
  // GET /stock/movements
  getStockMovements: async (page = 1, items = 10) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createPaginatedResponse(mockStockMovements, page, items);
    } catch (error) {
      return { success: false, error: "Error fetching stock movements" };
    }
  },

  // POST /stock/movements
  createStockMovement: async (movementData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newMovement = {
        id: mockStockMovements.length + 1,
        type: movementData.type.toUpperCase(),
        product: mockProducts.find(p => p.id === movementData.productId) || { id: movementData.productId, name: "Unknown Product" },
        deposit: mockDeposits.find(d => d.id === movementData.depositId) || { id: movementData.depositId, name: "Unknown Deposit" },
        referenceId: movementData.referenceDepositId,
        quantity: movementData.quantity,
        date: new Date().toISOString(),
        user: mockUsers[0] // Default user
      };
      mockStockMovements.push(newMovement);
      return { success: true, data: newMovement };
    } catch (error) {
      return { success: false, error: "Error creating stock movement" };
    }
  },

  // PUT /stock/movements/{id}
  updateStockMovement: async (id, movementData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockStockMovements.findIndex(m => m.id === id);
      if (index === -1) {
        return { success: false, error: "Stock movement not found" };
      }
      
      const updatedMovement = {
        ...mockStockMovements[index],
        type: movementData.type?.toUpperCase() || mockStockMovements[index].type,
        quantity: movementData.quantity || mockStockMovements[index].quantity,
        referenceId: movementData.referenceDepositId || mockStockMovements[index].referenceId
      };
      
      if (movementData.productId) {
        updatedMovement.product = mockProducts.find(p => p.id === movementData.productId) || updatedMovement.product;
      }
      
      if (movementData.depositId) {
        updatedMovement.deposit = mockDeposits.find(d => d.id === movementData.depositId) || updatedMovement.deposit;
      }
      
      mockStockMovements[index] = updatedMovement;
      return { success: true, data: updatedMovement };
    } catch (error) {
      return { success: false, error: "Error updating stock movement" };
    }
  },

  // DELETE /stock/movements/{id}
  deleteStockMovement: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockStockMovements.findIndex(m => m.id === id);
      if (index === -1) {
        return { success: false, error: "Stock movement not found" };
      }
      mockStockMovements.splice(index, 1);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error deleting stock movement" };
    }
  }
};

export default {
  productsAPI,
  brandsAPI,
  categoriesAPI,
  depositsAPI,
  stockAPI,
  providersAPI,
  usersAPI,
  salesAPI,
  stockMovementsAPI
};
