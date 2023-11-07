# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Debugging

1. Need to convert js -> jsx
2. Need to install
3. $ npm i react-router-dom
4. Install axios: alvinlim@coolhandsg-iMac frontend % npm i axios
5. Install react-fontawesome
   1. alvinlim@coolhandsg-iMac frontend % npm i @fortawesome/react-fontawesome
   2. alvinlim@coolhandsg-iMac frontend % npm i @fortawesome/free-solid-svg-icons
   3. alvinlim@coolhandsg-iMac frontend % npm i @fortawesome/fontawesome-svg-core
6. Set the vite port from default 51XX to 3000
   1. "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
    This seems to help!

7. Issue with url of host moving from react -> vite
   1. React port = 3000
   2. Vite port = 5173
   3. Instead of changing the port address I changed to settings in Vite inside the vite.config.js
   export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000
  }
})

## Added date-fns

alvinlim@coolhandsg-iMac frontend % npm i date-fns

## For Add Item how to avoid filling up the 'Quantity' field

If we want components to be controlled via state then we have to type in the value as there is only the state control in the value parameter.

Alternatively if we disable the state control by removing the value parameter in the input, we can use the following code to fill in the default value for quantity.  The value can no longer be manually added.
Alternatively we can just remove it.

  document.getElementById("quantity").value = 0;

