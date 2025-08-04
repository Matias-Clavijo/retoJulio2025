import axios from "axios";

// Configuración de API URL más robusta
const getApiBaseUrl = () => {
  // Si hay una variable de entorno específica, úsala
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // En desarrollo usa el proxy de Vite, en producción usa la URL completa
  return import.meta.env.DEV 
    ? "" 
    : "https://back-2025-gestion-stock-ventas.onrender.com";
};

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
  timeout: 30000, // 30 segundos de timeout
});

// Log de configuración para debugging
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    baseURL: API_BASE_URL,
    environment: import.meta.env.DEV ? 'development' : 'production',
    usingProxy: API_BASE_URL === '',
  });
}

// Interceptor para agregar token automáticamente a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y tokens expirados
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de CORS y conexión
    if (!error.response) {
      console.error('🚫 Network Error - Posible problema de CORS o conexión:', error.message);
      if (error.code === 'ERR_NETWORK') {
        console.error('💡 Sugerencia: Verificar configuración de CORS en el backend');
      }
    }
    
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirigir al login solo si no estamos ya en login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

const MOCK_PRODUCTS = {
  data: [
    {
      id: 1,
      name: "HP Notebook",
      description: "15'' i5 Notebook",
      purchasePrices: [
        { currency: "USD", value: 700 },
        { currency: "UY", value: 28000 }
      ],
      sealPrices: [
        { currency: "USD", value: 700 },
        { currency: "UY", value: 28000 }
      ],
      brand: { id: 1, name: "HP" },
      category: { id: 1, name: "Computing" },
      deposits: [ 
        {
          id: 1,
          name: "Depósito 1",
          description: "Depósito 1",
          location: "Montevideo, Uruguay",
          productCount: 3,
          associatedDate: "2002-09-30"
        },
        {
          id: 2,
          name: "Depósito 2",
          description: "Depósito 2",
          location: "Montevideo, Uruguay",
          productCount: 3,
          associatedDate: "2002-09-30"
        },
        {
          id: 3,
          name: "Depósito 3",
          description: "Depósito 3",
          location: "Montevideo, Uruguay",
          productCount: 3,
          associatedDate: "2002-09-30"
        },
        {
          id: 4,
          name: "Depósito 4",
          description: "Depósito 4",
          location: "Montevideo, Uruguay",
          productCount: 3,
          associatedDate: "2002-09-30"
        },
        {
          id: 5,
          name: "Depósito 5",
          description: "Depósito 5",
          location: "Montevideo, Uruguay",
          productCount: 3,
          associatedDate: "2002-09-30"
        }
      ]
    },
    {
      id: 2,
      name: "Dell Laptop",
      description: "17'' i7 Gaming Laptop",
      purchasePrices: [
        { currency: "USD", value: 700 },
        { currency: "UY", value: 28000 }
      ],
      sealPrices: [
        { currency: "USD", value: 700 },
        { currency: "UY", value: 28000 }
      ],
      brand: { id: 2, name: "Dell" },
      category: { id: 1, name: "Computing" },
      depositsCount: 2,
      deposits: [
        {
          id: 1,
          name: "Depósito 1",
          description: "Depósito 1",
          location: "Montevideo, Uruguay",
          productCount: 3,
          associatedDate: "2002-09-30"
        },
        {
          id: 2,
          name: "Depósito 2",
          description: "Depósito 2",
          location: "Montevideo, Uruguay",
          productCount: 3,
          associatedDate: "2002-09-30"
        }
      ]
    }
  ]
 }
  
  ;

const MOCK_BRANDS = [
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

const MOCK_CATEGORIES = [
  { id: 1, name: "Computing", productsCount: 3 },
  { id: 2, name: "Electronics", productsCount: 5 }
];

const MOCK_DEPOSITS = [
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

const MOCK_PROVIDERS = [
  {
    id: 1,
    name: "Juan Pérez",
    phone: "+598 92 123 456",
    email: "juan@delta.com",
    address: "Av. 18 de Julio 1234, Montevideo",
    associatedDate: "2006-09-30"
  },
  {
    id: 2,
    name: "TechCorp S.A.",
    phone: "+598 91 987 654",
    email: "contacto@techcorp.com",
    address: "World Trade Center, Montevideo",
    associatedDate: "2010-03-15"
  }
];

const MOCK_USERS = [
  {
    id: 1,
    firstName: "Lucía",
    lastName: "Gómez",
    email: "lucia.gomez@example.com",
    phone: "+598 93 456 789"
  }
];

const MOCK_SALES = [
  {
    id: 1,
    date: "2025-07-22",
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
    product: {
      id: 1,
      count: 2
    },
    paymentMethod: "Mercadopago",
    reseller: "Diego Fernández"
  }
];

const MOCK_STOCK_MOVEMENTS = [
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



export const productsAPI = {
  getProducts: async () => {
    try {
      return await apiClient.get('/api/products').then(response => {
        console.log(response);
        return response.data;
      });
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error fetching products" };
    }
  },

  // POST /api/products
  createProduct: async (productData) => {
    try {
      console.log(productData);
      const apiData = {
        name: productData.nombre,
        description: productData.descripcion,
        purchasePrice: {
          currency: productData.preciosCompra[0].moneda,
          value: productData.preciosCompra[0].precio
        },
        salePrice: {
          currency: productData.preciosVenta[0].moneda,
          value: productData.preciosVenta[0].precio
        },
        brand: {
          id: productData.marca
        },
        category: {
          id: productData.categoria
        }
      };
      console.log(apiData);

      const response = await apiClient.post('/api/products', apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error creating product:", error);
      return { success: false, error: "Error creating products" };
    }
  },

  // PUT /api/products/{id}
  updateProduct: async (id, productData) => {
    try {
      console.log(productData);
      const apiData = {
        name: productData.nombre,
        description: productData.descripcion,
        purchasePrice: {
          currency: productData.preciosCompra[0].moneda,
          value: productData.preciosCompra[0].precio
        },
        salePrice: {
          currency: productData.preciosVenta[0].moneda,
          value: productData.preciosVenta[0].precio
        },
        brand: {
          id: productData.marca
        },
        category: {
          id: productData.categoria
        }
      };

      console.log(apiData);

      const response = await apiClient.put(`/api/products/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error updating product:", error);
      return { success: false, error: "Error updating product" };
    }
  },

  // DELETE /api/products/{id}
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/api/products/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error deleting product" };
    }
  }
};

export const brandsAPI = {
  // GET /api/brands
  getBrands: async () => {
    try {
      return await apiClient.get('/api/brands').then(response => {
        console.log(response);
        return response.data;
      });
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error fetching brands" };
    }
  },

  // POST /api/brands
  createBrand: async (brandData) => {
    try {
      const apiData = {
        name: brandData.nombre,
        description: brandData.descripcion,
        country: brandData.pais
      };

      const response = await apiClient.post('/api/brands', apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error creating brand" };
    }
  },

  // PUT /api/brands/{id}
  updateBrand: async (id, brandData) => {
    try {
      console.log(brandData);
      const apiData = {
        name: brandData.name,
        description: brandData.description,
        country: brandData.country
      };


      const response = await apiClient.put(`/api/brands/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error)
      return { success: false, error: "Error updating brand" };
    }
  },

  // DELETE /api/brands/{id}
  deleteBrand: async (id) => {
    try {
      const response = await apiClient.delete(`/api/brands/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error)
      return { success: false, error: "Error deleting brand" };
    }
  }
};

export const categoriesAPI = {
  getCategories: async () => {
    try {
      return await apiClient.get('/api/categories').then(response => {
        console.log(response);
        return response.data;
      });
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error fetching categories" };
    }
  },

  createCategory: async (categoryData) => {
    try {
      const apiData = {
        name: categoryData.nombre,
        description: categoryData.descripcion
      };
      const response = await apiClient.post('/api/categories', apiData);
      return { success: true, data: response.data };
    } catch {
      return { success: false, error: "Error creating category" };
    }
  },

  // PUT /categories/{id}
  updateCategory: async (id, categoryData) => {
    try {
      console.log(categoryData);
      const apiData = {
        name: categoryData.name
      };
      const response = await apiClient.put(`/api/categories/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error)
      return { success: false, error: "Error updating category" };
    }
  },

  // DELETE /categories/{id}
  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/api/categories/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error)
      return { success: false, error: "Error deleting category" };
    }
  }
    
};

// DEPÓSITOS
export const depositsAPI = {
  // GET /api/deposits
  getDeposits: async () => {
    try {
      return await apiClient.get('/api/deposits').then(response => {
        console.log(response);
        return response.data;
      });
    } catch {
      return { success: false, error: "Error fetching deposits" };
    }
  },

  // POST /deposits
  createDeposit: async (depositData) => {
    try {
      const apiData = {
        name: depositData.nombre,
        description: depositData.descripcion, 
        location: depositData.ubicacion
      };
      console.log(apiData);
      const response = await apiClient.post("/api/deposits", apiData);
      return {success: true, data: response.data};
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error creating deposit" };
    }
  },

  // PUT /deposits/{id}
  updateDeposit: async (id, depositData) => {
    try {
      console.log(depositData);
      const apiData = {
        name: depositData.name,
        description: depositData.description,
        location: depositData.location
      };
      console.log(apiData);
      const response = await apiClient.put(`/api/deposits/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error updating deposit" };
    }
  },

  // DELETE /deposits/{id}
  deleteDeposit: async (id) => {
    try {
      const response = await apiClient.delete(`/api/deposits/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error deleting deposit" };
    }
  }
};

// STOCK
export const stockAPI = {
  // GET /api/stock
  getStock: async (page = 1, items = 10) => {
    try {
      const response = await apiClient.get(`/api/stock?page=${page}&items=${items}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching stock:", error);
      return { success: false, error: "Error fetching stock" };
    }
  },

  // POST /api/stock
  createStock: async (stockData) => {
    try {
      // The stockData already comes in the correct format from DialogAddStock
      console.log("Creating stock entry:", stockData);
      const response = await apiClient.post('/api/stock', stockData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error creating stock:", error);
      return { success: false, error: "Error creating stock entry" };
    }
  },

  // PUT /api/stock/{id}
  updateStock: async (id, stockData) => {
    try {
      // Ensure the data is in the correct format
      const apiData = {
        product: {
          id: parseInt(stockData.product?.id || stockData.productId)
        },
        deposit: {
          id: parseInt(stockData.deposit?.id || stockData.depositId)
        },
        quantity: parseInt(stockData.quantity)
      };

      console.log("Updating stock entry:", apiData);
      const response = await apiClient.put(`/api/stock/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error updating stock:", error);
      return { success: false, error: "Error updating stock entry" };
    }
  },

  // DELETE /api/stock/{id}
  deleteStock: async (id) => {
    try {
      const response = await apiClient.delete(`/api/stock/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error deleting stock:", error);
      return { success: false, error: "Error deleting stock entry" };
    }
  },

  // PUT /deposits/{depositId}/products/{productId} - Legacy function kept for compatibility
  updateStockLegacy: async (depositId, productId, stockData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock implementation - in real scenario would update stock count
      return { success: true, data: { depositId, productId, ...stockData } };
    } catch {
      return { success: false, error: "Error updating stock" };
    }
  }
};

// PROVEEDORES
export const providersAPI = {
  // GET /api/providers
  getProviders: async () => {
    try {
      return await apiClient.get('/api/providers').then(response => {
        console.log(response);
        return response.data;
      })
    } catch (error) {
      console.log(error);
      return { success: false, error: "Error fetching providers" };
    }
  },

  // POST /api/providers
  createProvider: async (providerData) => {
    try {
      const apiData = {
        name: providerData.nombre,
        phone: providerData.telefono,
        email: providerData.email,
        address: providerData.direccion
      };

      console.log(apiData);

      const response = await apiClient.post('/api/providers', apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error creating provider:", error);
      return { success: false, error: "Error creating provider" };
    }
  },

  // PUT /api/providers/{id}
  updateProvider: async (id, providerData) => {
    try {
      const apiData = {
        name: providerData.nombre,
        phone: providerData.telefono,
        email: providerData.email,
        address: providerData.direccion
      };

      console.log(apiData);
      const response = await apiClient.put(`/api/providers/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error updating provider:", error);
      return { success: false, error: "Error updating provider" };
    }
  },

  // DELETE /api/providers/{id}
  deleteProvider: async (id) => {
    try {
      const response = await apiClient.delete(`/api/providers/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error deleting provider:", error);
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
      const user = MOCK_USERS.find(u => u.id === id);
      if (!user) {
        return { success: false, error: "User not found" };
      }
      return { success: true, data: user };
    } catch {
      return { success: false, error: "Error fetching user" };
    }
  },

  // POST /signup
  signup: async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newUser = {
        id: MOCK_USERS.length + 1,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      };
      MOCK_USERS.push(newUser);
      return { success: true, data: newUser };
    } catch {
      return { success: false, error: "Error creating user" };
    }
  },

  // PUT /users/{id}
  updateUser: async (id, userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = MOCK_USERS.findIndex(u => u.id === id);
      if (index === -1) {
        return { success: false, error: "User not found" };
      }
      MOCK_USERS[index] = { ...MOCK_USERS[index], ...userData };
      return { success: true, data: MOCK_USERS[index] };
    } catch {
      return { success: false, error: "Error updating user" };
    }
  }
};

// VENTAS
export const salesAPI = {
  // GET /api/sales
  getSales: async (page = 1, items = 10) => {
    try {
      const response = await apiClient.get(`/api/sales?page=${page}&items=${items}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching sales:", error);
      return { success: false, error: "Error fetching sales" };
    }
  },

  // POST /api/sales
  createSale: async (saleData) => {
    try {
      const apiData = {
        date: new Date(saleData.fecha || saleData.date).toISOString(),
        products: saleData.product.map(producto => ({
          id: parseInt(producto.id),
          count: parseInt(producto.cantidad || 1)
        })),
        paymentMethod: saleData.metodoPago || saleData.paymentMethod,
        reseller: saleData.revendedor || saleData.reseller,
      };

      console.log("Creating sale:", apiData);
      const response = await apiClient.post('/api/sales', apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error creating sale:", error);
      return { success: false, error: "Error creating sale" };
    }
  },

  // PUT /api/sales/{id}
  updateSale: async (id, saleData) => {
    try {
      const apiData = {
        date: new Date(saleData.fecha || saleData.date).toISOString(),
        products: saleData.product.map(producto => ({
          id: parseInt(producto.id),
          count: parseInt(producto.cantidad || 1)
        })),
        paymentMethod: saleData.metodoPago || saleData.paymentMethod,
        reseller: saleData.revendedor || saleData.reseller,
        price: parseFloat(saleData.precio || saleData.price || saleData.total || 0),
        currency: saleData.moneda || saleData.currency || 'USD'
      };

      console.log("Updating sale:", apiData);
      const response = await apiClient.put(`/api/sales/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error updating sale:", error);
      return { success: false, error: "Error updating sale" };
    }
  },

  // DELETE /api/sales/{id}
  deleteSale: async (id) => {
    try {
      const response = await apiClient.delete(`/api/sales/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error deleting sale:", error);
      return { success: false, error: "Error deleting sale" };
    }
  }
};

// MOVIMIENTOS DE STOCK
export const stockMovementsAPI = {
  // GET /api/stock/movements
  getStockMovements: async () => {
    try {
      const response = await apiClient.get(`/api/stock-movement`);
      return response.data;
    } catch (error) {
      console.log("Error fetching stock movements:", error);
      return { success: false, error: "Error fetching stock movements" };
    }
  },

  // POST /api/stock/movements
  createStockMovement: async (movementData) => {
    try {
      const apiData = {
        type: movementData.tipo === 'Entrada' ? 'ENTRY' : movementData.tipo === 'Transferencia' ? 'TRANSFER' : 'EXIT',
        product: {
          id: parseInt(movementData.productId)
        },
        originDeposit: {
          id: parseInt(movementData.depositId)
        },
        destinationDeposit: {
          id: parseInt(movementData.depositId)
        },
        quantity: parseInt(movementData.cantidad)
      };

      console.log("Creating stock movement:", apiData);
      const response = await apiClient.post('/api/stock-movement', apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error creating stock movement:", error);
      return { success: false, error: "Error creating stock movement" };
    }
  },

  // PUT /api/stock/movements/{id}
  updateStockMovement: async (id, movementData) => {
    try {
      const apiData = {
        type: movementData.tipo === 'Entrada' ? 'ENTRY' : movementData.tipo === 'Transferencia' ? 'TRANSFER' : 'EXIT',
        product: {
          id: parseInt(movementData.productId)
        },
        originDeposit: {
          id: parseInt(movementData.depositId)
        },
        destinationDeposit: {
          id: parseInt(movementData.depositId)
        },
        quantity: parseInt(movementData.cantidad)
      };
    
      console.log("Updating stock movement:", apiData);
      const response = await apiClient.put(`/api/stock-movement/${id}`, apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error updating stock movement:", error);
      return { success: false, error: "Error updating stock movement" };
    }
  },

  // DELETE /api/stock/movements/{id}
  deleteStockMovement: async (id) => {
    try {
      const response = await apiClient.delete(`/api/stock-movement/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error deleting stock movement:", error);
      return { success: false, error: "Error deleting stock movement" };
    }
  }
};

// AUTENTICACIÓN
export const authAPI = {
  // POST /auth/register
  register: async (userData) => {
    try {
      const apiData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      };

      const response = await apiClient.post('/auth/register', apiData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error registering user:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Error creating user account" 
      };
    }
  },

  login: async (credentials) => {
    try {
      const apiData = {
        email: credentials.email,
        password: credentials.password
      };

      const response = await apiClient.post('/auth/login', apiData);
      return response
    } catch (error) {
      console.log("Error logging in:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Error logging in" 
      };
    }
  }
};

export default {
  authAPI,
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
