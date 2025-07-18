# SGS-EAA

This project is a Vue 3 application built with Vite, which likely focuses on some specific business logic related to SGS. It includes features such as data export configuration and UI styling for document display.

## Table of Contents
- [Recommended IDE Setup](#recommended-ide-setup)
- [Project Setup](#project-setup)
- [Customize Configuration](#customize-configuration)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [Project Structure](#project-structure)
- [Functionality Highlights](#functionality-highlights)

## Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup
### Install Dependencies
```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Compile and Minify for Production
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

## Customize Configuration
See [Vite Configuration Reference](https://vite.dev/config/).

## Dependencies
- **element-plus**: ^2.10.3, a popular UI component library for Vue 3.
- **pinia**: ^3.0.3, the official store for Vue 3.
- **vue**: ^3.5.17, the core Vue.js framework.
- **vue-router**: ^4.5.1, the official router for Vue.js.
- **xlsx-js-style**: ^1.2.0, used for Excel file operations with style support.

## DevDependencies
- **@vitejs/plugin-vue**: ^6.0.0, Vite plugin for Vue 3.
- **vite**: ^7.0.0, a build tool that aims to provide a faster and leaner development experience for modern web projects.
- **vite-plugin-vue-devtools**: ^7.7.7, Vue DevTools integration for Vite.

## Project Structure
- **src**: Contains the source code of the application.
  - **components**: Vue components used in the application. For example, `Main.vue` includes data export configuration and UI styling for document display.
  - **router**: Router configuration for the application.
  - **App.vue**: The root component of the application.
  - **main.js**: The entry point of the application, where the Vue app is created and plugins are installed.
- **docs**: The output directory for the production build.
- **index.html**: The main HTML file that serves as the entry point for the application.
- **package.json**: Defines project dependencies, scripts, and other metadata.
- **package-lock.json**: Locks down the exact versions of installed packages.
- **vite.config.js**: Configuration file for Vite.

## Functionality Highlights
### Data Export
In `src/components/Main.vue`, there is code for exporting data to an Excel file. It combines data from different modules (base information, test cycle, test clauses, test samples, required documents) and configures the column widths and cell styles for the exported Excel file.

### Document Display
The `Main.vue` component also includes a section for displaying the required documents for starting the test. Users can toggle the display of the document list and download the latest versions of relevant documents by clicking on the links.

This README provides an overview of the project, including setup instructions, dependencies, project structure, and functionality highlights. You can further customize it based on the specific requirements and features of your project.