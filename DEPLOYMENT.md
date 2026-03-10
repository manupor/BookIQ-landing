# BookIQ - Deployment Guide

Este documento explica cómo desplegar BookIQ en Kubernetes con PostgreSQL.

## Requisitos Previos

- Cluster de Kubernetes (puede ser local con Minikube, o en la nube con GKE, EKS, AKS)
- kubectl configurado
- Docker instalado
- Cuenta de Google Cloud Console para OAuth (opcional)

## Configuración Inicial

### 1. Configurar Variables de Entorno

Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

Edita `.env` con tus valores:
```env
DATABASE_URL="postgresql://bookiq:your-password@postgres:5432/bookiq?schema=public"
NEXTAUTH_URL="https://tu-dominio.com"
NEXTAUTH_SECRET="genera-con-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

### 2. Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 3. Configurar Google OAuth (Opcional)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+
4. Ve a "Credenciales" → "Crear credenciales" → "ID de cliente de OAuth 2.0"
5. Configura las URIs de redirección:
   - `http://localhost:3000/api/auth/callback/google` (desarrollo)
   - `https://tu-dominio.com/api/auth/callback/google` (producción)
6. Copia el Client ID y Client Secret

## Desarrollo Local

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Iniciar PostgreSQL con Docker

```bash
docker run --name bookiq-postgres \
  -e POSTGRES_USER=bookiq \
  -e POSTGRES_PASSWORD=changeme \
  -e POSTGRES_DB=bookiq \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 3. Ejecutar Migraciones

```bash
npx prisma migrate dev
```

### 4. Generar Cliente de Prisma

```bash
npx prisma generate
```

### 5. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Deployment en Kubernetes

### 1. Construir la Imagen Docker

```bash
docker build -t your-registry/bookiq:latest .
docker push your-registry/bookiq:latest
```

### 2. Actualizar Configuración de Kubernetes

Edita `k8s/app-deployment.yaml` y reemplaza:
- `your-registry/bookiq:latest` con tu imagen
- Los secretos en `k8s/app-deployment.yaml`
- El dominio en `k8s/ingress.yaml`

### 3. Crear Secretos de Kubernetes

```bash
# Generar secret para NextAuth
kubectl create secret generic app-secret \
  --from-literal=DATABASE_URL="postgresql://bookiq:PASSWORD@postgres:5432/bookiq?schema=public" \
  --from-literal=NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  --from-literal=NEXTAUTH_URL="https://tu-dominio.com" \
  --from-literal=GOOGLE_CLIENT_ID="tu-client-id" \
  --from-literal=GOOGLE_CLIENT_SECRET="tu-client-secret"

# Generar secret para PostgreSQL
kubectl create secret generic postgres-secret \
  --from-literal=POSTGRES_USER=bookiq \
  --from-literal=POSTGRES_PASSWORD="$(openssl rand -base64 32)" \
  --from-literal=POSTGRES_DB=bookiq
```

### 4. Desplegar PostgreSQL

```bash
kubectl apply -f k8s/postgres-deployment.yaml
```

Espera a que PostgreSQL esté listo:
```bash
kubectl wait --for=condition=ready pod -l app=postgres --timeout=300s
```

### 5. Desplegar la Aplicación

```bash
kubectl apply -f k8s/app-deployment.yaml
```

### 6. Configurar Ingress (Opcional)

Si usas NGINX Ingress Controller:

```bash
# Instalar NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# Aplicar configuración de Ingress
kubectl apply -f k8s/ingress.yaml
```

### 7. Verificar el Deployment

```bash
# Ver pods
kubectl get pods

# Ver servicios
kubectl get services

# Ver logs de la aplicación
kubectl logs -l app=bookiq-app -f

# Ver logs de PostgreSQL
kubectl logs -l app=postgres -f
```

## Costos Estimados

### Opción 1: Kubernetes en Cloud (GKE/EKS/AKS)
- **Cluster pequeño**: $50-100/mes
- **PostgreSQL (1 replica)**: Incluido en el cluster
- **Load Balancer**: $15-20/mes
- **Total estimado**: $65-120/mes

### Opción 2: Kubernetes Local (Minikube/k3s)
- **VPS (4GB RAM, 2 CPU)**: $20-40/mes
- **Total estimado**: $20-40/mes

### Comparación con Supabase
- **Supabase Pro**: $25/mes + $0.125/GB de base de datos
- **Con 10GB**: ~$26.25/mes
- **Con 50GB**: ~$31.25/mes

**Ventajas de Kubernetes + PostgreSQL:**
- ✅ Más control sobre la infraestructura
- ✅ Escalabilidad horizontal
- ✅ Sin límites de base de datos
- ✅ Más económico a largo plazo

## Mantenimiento

### Backups de PostgreSQL

```bash
# Crear backup
kubectl exec -it deployment/postgres -- pg_dump -U bookiq bookiq > backup.sql

# Restaurar backup
kubectl exec -i deployment/postgres -- psql -U bookiq bookiq < backup.sql
```

### Actualizar la Aplicación

```bash
# Construir nueva imagen
docker build -t your-registry/bookiq:v2 .
docker push your-registry/bookiq:v2

# Actualizar deployment
kubectl set image deployment/bookiq-app bookiq=your-registry/bookiq:v2

# Verificar rollout
kubectl rollout status deployment/bookiq-app
```

### Escalar la Aplicación

```bash
# Escalar a 3 réplicas
kubectl scale deployment/bookiq-app --replicas=3

# Auto-scaling basado en CPU
kubectl autoscale deployment/bookiq-app --min=2 --max=10 --cpu-percent=80
```

## Troubleshooting

### La aplicación no se conecta a PostgreSQL

```bash
# Verificar que PostgreSQL esté corriendo
kubectl get pods -l app=postgres

# Verificar logs de PostgreSQL
kubectl logs -l app=postgres

# Verificar conectividad desde un pod
kubectl run -it --rm debug --image=postgres:16-alpine --restart=Never -- psql -h postgres -U bookiq -d bookiq
```

### Migraciones de Prisma fallan

```bash
# Ejecutar migraciones manualmente
kubectl exec -it deployment/bookiq-app -- npx prisma migrate deploy
```

### Ver logs de la aplicación

```bash
kubectl logs -l app=bookiq-app -f --tail=100
```

## Seguridad

1. **Cambiar contraseñas por defecto** en producción
2. **Usar HTTPS** con certificados SSL (Let's Encrypt con cert-manager)
3. **Configurar Network Policies** para limitar tráfico entre pods
4. **Actualizar regularmente** las imágenes de Docker
5. **Configurar backups automáticos** de PostgreSQL

## Monitoreo

Considera agregar:
- **Prometheus** para métricas
- **Grafana** para dashboards
- **Loki** para logs centralizados
- **Sentry** para error tracking

## Soporte

Para más información, consulta:
- [Documentación de Kubernetes](https://kubernetes.io/docs/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Documentación de NextAuth.js](https://next-auth.js.org/)
