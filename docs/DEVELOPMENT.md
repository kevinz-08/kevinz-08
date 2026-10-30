# Desarrollo del portafolio

Guía técnica del portafolio web de Kevin Santiago Gutiérrez Amorocho.

🔗 Demo: https://portafolio-kevin-santiago.vercel.app/

## 🛠 Tecnologías

- React 18 + Vite
- Tailwind CSS
- Responsive Design
- Figma (prototipado UI/UX)
- Adobe Photoshop
- Git y GitHub

## 📁 Estructura del proyecto

```
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx            # punto de entrada
│   ├── App.jsx             # componente principal
│   ├── index.css           # estilos globales con Tailwind
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Technologies.jsx
│   │   ├── AboutMe.jsx
│   │   ├── ContactForm.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   ├── useTheme.js
│   │   ├── useTypewriter.js
│   │   ├── useScrollSpy.js
│   │   ├── useCounter.js
│   │   └── useParallax.js
│   ├── img/
│   └── fonts/
```

## ✨ Funcionalidades

- 🌗 Alternancia entre tema claro y oscuro
- 🎯 Navegación fluida con scroll suave
- 📍 Indicador visual de la sección activa en el menú
- 🎨 Animaciones al hacer scroll (scroll reveal)
- 🖼️ Efecto Parallax en imagen de bienvenida
- 📱 Totalmente responsive en móviles y tablets
- 🧾 Formulario de contacto funcional

## 🚀 Cómo ejecutar el proyecto

```bash
git clone https://github.com/kevinz-08/kevinz-08.git
cd kevinz-08
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run preview   # previsualizar el build
```

> Si el repositorio conserva su nombre anterior, ajusta la URL de `git clone`.

## 📝 Otros documentos

- [MIGRATION_GUIDE.md](../MIGRATION_GUIDE.md) — notas de la migración a React + Tailwind
- [README_REACT.md](../README_REACT.md) — resumen de la versión React
- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) — sistema de diseño

## 📄 Licencia

[MIT](../LICENSE)
