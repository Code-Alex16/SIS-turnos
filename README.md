# Proyecto HEP-SIS

Proyecto frontend para la gestión de pantallas y modificación de interfaces del HEP.

## Indice:
 - **Requistos**
 - **Instalacion y Ejecucion**
 - **Subir Cambios**
 - **Estructura del poryecto**

## 📋 Requisitos Previos

Asegúrate de tener instalado en tu entorno local:

- **Node.js**: Versión `24.14.0 LTS` o superior.
- **Git**: Puedes usar Git en línea de comandos o **GitHub Desktop**.

## 🚀 Cómo Usar (Instalación y Ejecución)

Sigue estos pasos para levantar el entorno de desarrollo local:

### 1. Clona el repositorio

```bash
git clone https://github.com/Code-Alex16/HEP-SIS.git
```

### 2. Accede a la carpeta del proyecto

```bash
cd HEP-SIS
```

### 3. Instala las dependencias

```bash
npm install
```

### 4. Ejecuta el proyecto en modo desarrollo

```bash
npm run dev
```

## 🧭 Nota sobre el Enrutamiento

Ya se han configurado rutas iniciales para el acceso a interfaces específicas.  
Puedes agregar nuevas rutas en el directorio correspondiente según vaya creciendo la aplicación.
para acceder a una ruta solo escribela al final del localhost ejemplo
**Localhost:5127/{ruta} ->** Localhost:5127/login

## 💻 Como Subir Cambios

### Ver y Crear una nueva rama
Cada funcionalidad debe ir en su propia rama, pueden crearla con linea de comando en git:

```bash
git checkout -b feature/{nombre-funcionalidad}
```

ejemplo:

```bash
git checkout -b feature/Login
git checkout -b feature/SalaEspera
git checkout -b feature/TriajeEmergencia
```

### Ver ramas
Al desplegarse la lista de las rams aquella que tenga el simbolo "*" esa es la rama en la que estas
posicionado.

```bash
git branch
git branch -r
git branch -a
```
ejemplo:

```bash
*feature/login
 main
```

### Subir la rama al repositorio
Una vez hecha tu funcionalidad, subelas con:

```bash
git push origin feature/{nombre-funcionalidad}
```

Dirigete al Github y Crea un Pull Request (PR), para su revision de conflictos y hacer un merge mas adelante

## 📁 Estructura del Proyecto

El proyecto está organizado de la siguiente manera dentro de la carpeta `src/`:

### `/components/layout`

Contiene componentes reutilizables generales que se comparten a lo largo de todas las páginas de la aplicación, por ejemplo:

- `Header`
- `Navbar`
- `Footer`

### `/feature`

Directorio destinado a la separación de páginas por estructura.

**Regla general:**  
Se crea un directorio con el nombre de la página (por ejemplo, `Login`). Dentro de este, se construyen los componentes, hooks y páginas propias de esa misma interfaz, encapsulando así su lógica única.

### `/hooks`

Funciones personalizadas (*Custom Hooks*) para el manejo de datos y lógica.  
Pueden ser:

- De uso general para toda la aplicación
- Específicas de una funcionalidad

### `/router`

Configuración de las rutas de acceso para navegar entre las diferentes interfaces del sistema.

### `/styles`

Diseños y hojas de estilo globales.

**Recomendación:**  
Es preferible trabajar con CSS individualizado o modularizado para los componentes específicos y usar esta carpeta solo para estilos generales.

## 🗂️ Estructura general

```text
src/
├── components/
│   └── layout/
├── feature/
├── hooks/
├── router/
└── styles/
```

## 🗂️ Estructura para feature

```text
{Nombre}/
├── components/
├── hooks/ (Optional)
├── Pages/
└── styles/ (optional)
```