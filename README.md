# STEENS Platform - Plataforma STEM para Chicas

Una plataforma educativa diseñada para empoderar a las chicas en áreas STEM con herramientas de aprendizaje, comunidad y ciberseguridad.

## 🚀 Características

- **Dashboard Personalizado**: Feed inteligente y módulos de aprendizaje
- **Test Vocacional**: Evaluación personalizada con IA para descubrir intereses STEM
- **Sistema de Mentorías**: Conexión con estudiantes universitarias en áreas STEM
- **Módulos de Ciberseguridad**: Educación interactiva sobre seguridad digital
- **Comunidad**: Espacio seguro para compartir y conectar
- **Sistema de Avatares**: Personalización con profesionales STEM diversas

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Autenticación**: JWT con localStorage
- **Despliegue**: AWS Amplify
- **APIs**: OpenAI (opcional), Perspective API (opcional)

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone [tu-repo-url]
cd steens-mvp

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 🌐 Despliegue en AWS Amplify

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - STEENS Platform"
   git branch -M main
   git remote add origin [tu-repo-github]
   git push -u origin main
   ```

2. **Conecta con Amplify**:
   - Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Selecciona GitHub y autoriza
   - Selecciona tu repositorio
   - Amplify detectará automáticamente que es Next.js

3. **Configuración automática**:
   - Amplify usará el archivo `amplify.yml` incluido
   - El build se ejecutará automáticamente

### Opción 2: Deploy Manual

1. **Crear el build**:
   ```bash
   npm run build
   ```

2. **Subir a Amplify**:
   - Ve a AWS Amplify Console
   - Click "Deploy without Git provider"
   - Sube la carpeta `.next`

## 🔧 Variables de Entorno en Amplify

En la consola de Amplify, ve a "Environment variables" y agrega:

```
NEXT_PUBLIC_HASH_SALT=steens-secure-salt-2024-demo
NEXT_PUBLIC_USER_SALT=steens-user-salt-2024-demo
NODE_ENV=production
```

## 🎯 Funcionalidades Principales

### Dashboard
- Feed personalizado con algoritmo de recomendaciones
- Módulos de aprendizaje interactivos
- Sistema de puntos y medallas

### Test Vocacional
- 8 preguntas personalizadas basadas en perfil
- Análisis inteligente local (sin APIs externas)
- Recomendaciones de carreras STEM

### Ciberseguridad
- Módulos interactivos sobre seguridad digital
- Consejos prácticos para chicas
- Sistema de evaluación gamificado

### Mentorías
- Conexión con estudiantes universitarias
- Filtros por área STEM y universidad
- Sistema de solicitudes

## 🔒 Seguridad

- Autenticación JWT
- Validación de datos en cliente
- Sanitización de contenido
- Configuración segura para producción

## 📱 Responsive Design

- Diseño mobile-first
- Optimizado para tablets y desktop
- Componentes accesibles

## 🎨 Diseño

- Gradientes personalizados STEENS
- Animaciones suaves
- Componentes glassmorphism
- Paleta de colores inclusiva

## 📄 Licencia

Este proyecto fue desarrollado para el Hackathon IA + Cyber 2024.

---

**¡Lista para empoderar a la próxima generación de mujeres STEM!** 🚀👩‍💻