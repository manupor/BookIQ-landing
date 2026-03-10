# CODECRAFTT - Landing Page Builder

Sistema completo de creación y gestión de landing pages con autenticación, base de datos PostgreSQL y deployment en Kubernetes.

## 🚀 Características

- ✅ **Autenticación completa** con Google OAuth y email/password
- ✅ **Base de datos PostgreSQL** con Prisma ORM
- ✅ **Dashboard de usuario** para gestionar landing pages
- ✅ **API RESTful** para CRUD de landing pages
- ✅ **Deployment en Kubernetes** con configuración completa
- ✅ **Docker** para containerización
- ✅ **NextAuth.js** para autenticación segura
- ✅ **Diseño moderno** con TailwindCSS y Framer Motion

## 📋 Requisitos

- Node.js 20+
- PostgreSQL 16+ (o Docker)
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd bookiq
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/bookiq?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-con-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

### 4. Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 5. Iniciar PostgreSQL (con Docker)

```bash
docker run --name bookiq-postgres \
  -e POSTGRES_USER=bookiq \
  -e POSTGRES_PASSWORD=changeme \
  -e POSTGRES_DB=bookiq \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 6. Ejecutar migraciones

```bash
npx prisma migrate dev
npx prisma generate
```

### 7. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
bookiq/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # Endpoints de autenticación
│   │   │   └── landing-pages/ # CRUD de landing pages
│   │   ├── auth/              # Páginas de login/signup
│   │   ├── dashboard/         # Dashboard del usuario
│   │   └── layout.tsx
│   ├── components/
│   │   ├── SessionProvider.tsx
│   │   └── LandingPage.tsx
│   ├── lib/
│   │   ├── auth.ts           # Configuración NextAuth
│   │   └── prisma.ts         # Cliente Prisma
│   └── types/
├── prisma/
│   └── schema.prisma         # Esquema de base de datos
├── k8s/                      # Configuración Kubernetes
│   ├── postgres-deployment.yaml
│   ├── app-deployment.yaml
│   └── ingress.yaml
├── Dockerfile
└── DEPLOYMENT.md             # Guía de deployment
```

## 🔐 Autenticación

El sistema soporta dos métodos de autenticación:

### 1. Google OAuth

Configura Google OAuth en [Google Cloud Console](https://console.cloud.google.com/):
1. Crea un proyecto
2. Habilita Google+ API
3. Crea credenciales OAuth 2.0
4. Agrega URIs de redirección autorizadas

### 2. Email/Password

Los usuarios pueden registrarse con email y password. Las contraseñas se hashean con bcrypt.

## 🗄️ Base de Datos

### Esquema Principal

- **User**: Usuarios del sistema
- **Account**: Cuentas OAuth vinculadas
- **Session**: Sesiones activas
- **LandingPage**: Landing pages creadas por usuarios

### Comandos Útiles

```bash
# Ver base de datos en Prisma Studio
npx prisma studio

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Resetear base de datos
npx prisma migrate reset
```

## 🚢 Deployment

### Opción 1: Kubernetes

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones completas.

```bash
# Build y push imagen Docker
docker build -t your-registry/bookiq:latest .
docker push your-registry/bookiq:latest

# Deploy en Kubernetes
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

### Opción 2: Docker Compose (Desarrollo)

```bash
docker-compose up -d
```

## 💰 Comparación de Costos

### Kubernetes + PostgreSQL
- **VPS (4GB RAM)**: $20-40/mes
- **Cloud Kubernetes**: $65-120/mes
- ✅ Sin límites de base de datos
- ✅ Control total

### Supabase
- **Pro Plan**: $25/mes base
- **Database**: $0.125/GB adicional
- ⚠️ Costos variables según uso

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Linter
npx prisma studio    # UI de base de datos
```

## 🔧 Tecnologías

- **Framework**: Next.js 16
- **Autenticación**: NextAuth.js
- **Base de datos**: PostgreSQL + Prisma
- **Estilos**: TailwindCSS
- **Animaciones**: Framer Motion
- **Validación**: Zod
- **Deployment**: Kubernetes + Docker

## 📚 Documentación Adicional

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía completa de deployment
- [Prisma Docs](https://www.prisma.io/docs/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Kubernetes Docs](https://kubernetes.io/docs/)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🆘 Soporte

Para problemas o preguntas:
- Abre un issue en GitHub
- Consulta [DEPLOYMENT.md](./DEPLOYMENT.md) para troubleshooting
