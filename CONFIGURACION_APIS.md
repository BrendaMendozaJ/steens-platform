# 🔧 Guía de Configuración de APIs - STEENS

## 🚀 **Opción 1: Demo Rápido (SIN APIs externas)**

Si quieres probar STEENS inmediatamente sin configurar APIs:

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar
npm run dev

# ✅ ¡Ya funciona! El sistema usa moderación local robusta
```

**¿Qué incluye la moderación local?**
- Detección de insultos con variaciones (t0nt@, estupidaaa)
- Patrones de grooming específicos
- Sesgos de género en español
- Normalización de texto inteligente

---

## 🌟 **Opción 2: Con APIs Profesionales (Recomendado)**

Para máxima precisión, configura las APIs externas:

### **Paso 1: Perspective API (Google)**

1. **Ve a Google Cloud Console**
   ```
   https://console.cloud.google.com/
   ```

2. **Crear/Seleccionar Proyecto**
   - Clic en el dropdown del proyecto (arriba)
   - "New Project" o selecciona uno existente

3. **Habilitar Perspective API**
   - Menú lateral → "APIs & Services" → "Library"
   - Buscar: "Perspective API"
   - Clic en "ENABLE"

4. **Crear API Key**
   - "APIs & Services" → "Credentials"
   - "CREATE CREDENTIALS" → "API key"
   - Copiar la key generada

5. **Agregar a .env.local**
   ```bash
   NEXT_PUBLIC_PERSPECTIVE_API_KEY=AIzaSyC-tu-key-aqui
   ```

### **Paso 2: OpenAI API**

1. **Ve a OpenAI Platform**
   ```
   https://platform.openai.com/
   ```

2. **Crear cuenta/Iniciar sesión**

3. **Crear API Key**
   - Menú lateral → "API keys"
   - "Create new secret key"
   - Darle un nombre: "STEENS-Moderation"
   - Copiar la key (¡no la podrás ver después!)

4. **Agregar a .env.local**
   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=sk-tu-key-aqui
   ```

### **Paso 3: Verificar Configuración**

Tu archivo `.env.local` debe verse así:

```bash
# APIs de Moderación
NEXT_PUBLIC_PERSPECTIVE_API_KEY=AIzaSyC-tu-perspective-key
NEXT_PUBLIC_OPENAI_API_KEY=sk-tu-openai-key

# Sales de seguridad (puedes dejar estos valores)
NEXT_PUBLIC_HASH_SALT=steens-secure-salt-2024-demo
NEXT_PUBLIC_USER_SALT=steens-user-salt-2024-demo
HASH_SALT=steens-report-salt-2024-demo

NODE_ENV=development
```

### **Paso 4: Probar**

```bash
npm run dev
```

En el chat, verás:
- "Multi-API" en el indicador de seguridad
- Mayor precisión en detección
- Estadísticas de múltiples fuentes

---

## 🔍 **Cómo Verificar que Funciona**

### **Mensajes de Prueba:**

1. **Normal** ✅
   ```
   "Me encanta la programación en Python"
   ```

2. **Insulto con variación** ❌
   ```
   "eres t0nt@"
   ```

3. **Grooming** ❌
   ```
   "¿cuántos años tienes?"
   ```

4. **Sesgo de género** ❌
   ```
   "eso es muy difícil para una chica"
   ```

### **Indicadores Visuales:**

- **🟢 Protegido**: APIs funcionando
- **🔄 Verificando**: Analizando mensaje
- **Multi-API**: Usando servicios externos
- **Local**: Solo patrones locales

---

## 💰 **Costos de APIs**

### **Perspective API (Google)**
- **GRATIS**: 1,000 requests/día
- **Pagado**: $1 por 1,000 requests adicionales

### **OpenAI Moderation API**
- **GRATIS**: Completamente gratuita
- Sin límites para moderación

### **Recomendación**
Para una hackathon o demo: **Ambas APIs son prácticamente gratis**

---

## 🛠️ **Solución de Problemas**

### **Error: "API Key inválida"**
- Verifica que copiaste la key completa
- Asegúrate de que no hay espacios extra
- Reinicia el servidor: `Ctrl+C` y `npm run dev`

### **Error: "API no habilitada"**
- Ve a Google Cloud Console
- Verifica que Perspective API esté habilitada
- Puede tomar unos minutos en activarse

### **Error: "Quota exceeded"**
- Perspective API: Espera 24h o configura billing
- OpenAI: No debería pasar (es gratis)

### **Funciona sin APIs**
- El sistema tiene fallback robusto
- Moderación local es muy efectiva
- Perfecto para demos y desarrollo

---

## 🎯 **Para la Hackathon**

**Recomendación**: Usa la **Opción 1** (sin APIs) para:
- Demo rápido y confiable
- Sin dependencias externas
- Funcionalidad completa

**Usa APIs externas** solo si:
- Quieres mostrar integración profesional
- Tienes tiempo para configurar
- Necesitas máxima precisión

¡El sistema funciona excelente en ambos casos! 🚀