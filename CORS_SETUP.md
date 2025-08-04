# 🌐 Configuración CORS para Producción

Esta guía explica cómo configurar CORS correctamente para el despliegue en producción.

## 📋 **Configuración Actual**

### Frontend (Vite + React)
- **Desarrollo**: Proxy de Vite redirige `/api` y `/auth` al backend
- **Producción**: Peticiones directas a `https://back-2025-gestion-stock-ventas.onrender.com`

### Configuración Dinámica de API
```javascript
const getApiBaseUrl = () => {
  // Prioridad: Variable de entorno -> Detección automática
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  return import.meta.env.DEV 
    ? "" // Usa proxy de Vite
    : "https://back-2025-gestion-stock-ventas.onrender.com";
};
```

## 🔧 **Configuración Requerida en el Backend**

### 1. Headers CORS Básicos
```javascript
// Ejemplo para Express.js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://tu-frontend.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

### 2. Configuración con cors package
```javascript
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:5173', // Desarrollo
    'https://tu-frontend.vercel.app', // Producción
    'https://tu-dominio.com' // Dominio personalizado
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

## 🌍 **Variables de Entorno**

### Crear archivo `.env`
```bash
# Configuración de la API
VITE_API_BASE_URL=https://back-2025-gestion-stock-ventas.onrender.com
VITE_APP_ENV=production

# Para desarrollo local (opcional)
# VITE_API_BASE_URL=http://localhost:8080
# VITE_APP_ENV=development
```

### Crear archivo `.env.local` (desarrollo)
```bash
# Solo para desarrollo local
VITE_API_BASE_URL=
VITE_APP_ENV=development
```

### Crear archivo `.env.production` (producción)
```bash
# Para builds de producción
VITE_API_BASE_URL=https://back-2025-gestion-stock-ventas.onrender.com
VITE_APP_ENV=production
```

## 🚀 **Configuración por Plataforma**

### Vercel
1. Ir a Project Settings → Environment Variables
2. Agregar:
   - `VITE_API_BASE_URL`: `https://back-2025-gestion-stock-ventas.onrender.com`
   - `VITE_APP_ENV`: `production`

### Netlify
1. Ir a Site Settings → Environment Variables
2. Agregar las mismas variables que Vercel

### GitHub Pages / Otros
1. Configurar en el workflow de CI/CD:
```yaml
env:
  VITE_API_BASE_URL: https://back-2025-gestion-stock-ventas.onrender.com
  VITE_APP_ENV: production
```

## 🔍 **Diagnóstico y Debugging**

### 1. Verificar Configuración
Abre DevTools → Console y busca:
```
🔧 API Configuration: {
  baseURL: "https://back-2025-gestion-stock-ventas.onrender.com",
  environment: "production",
  usingProxy: false
}
```

### 2. Errores Comunes de CORS
- **Error**: `Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy`
- **Solución**: Configurar `Access-Control-Allow-Origin` en el backend

- **Error**: `ERR_NETWORK`
- **Solución**: Verificar que el backend esté ejecutándose y sea accesible

### 3. Testing CORS
```bash
# Probar desde el navegador
curl -H "Origin: https://tu-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With, Content-Type, Authorization" \
     -X OPTIONS \
     https://back-2025-gestion-stock-ventas.onrender.com/api/products
```

## ✅ **Checklist de Producción**

- [ ] **Backend**: CORS configurado para el dominio del frontend
- [ ] **Frontend**: Variables de entorno configuradas
- [ ] **Deployment**: Variables de entorno configuradas en la plataforma
- [ ] **Testing**: Peticiones funcionan desde el dominio de producción
- [ ] **Monitoring**: Logs de errores configurados
- [ ] **Fallback**: Manejo de errores de red implementado

## 🛠️ **Herramientas Útiles**

### 1. CORS Tester
```javascript
// Agregar al DevTools Console para probar
fetch('https://back-2025-gestion-stock-ventas.onrender.com/api/products', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
}).then(r => console.log('CORS OK:', r.status)).catch(e => console.error('CORS Error:', e));
```

### 2. Network Inspector
- Verificar headers de respuesta en Network tab
- Buscar `Access-Control-Allow-Origin` en response headers

## 📝 **Notas Importantes**

1. **Desarrollo vs Producción**: El proxy de Vite solo funciona en desarrollo
2. **Wildcards**: Evitar `Access-Control-Allow-Origin: *` en producción
3. **Credentials**: Si usas cookies/auth, configurar `credentials: true`
4. **Preflight**: Los requests complejos requieren OPTIONS preflight
5. **Cache**: Los browsers pueden cachear respuestas CORS

---

**⚠️ Recuerda**: CORS es una restricción del navegador, no del servidor. El servidor debe explícitamente permitir los orígenes del frontend. 