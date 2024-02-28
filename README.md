# Orquest Signing Test

Prueba técnica basada en una aplicación de gestión de fichajes de empleados.

La aplicación se compone de varias secciones:

- Un panel principal de fichajes dónde se visualiza un resumen de todos los empleados en un mes seleccionado. A través de este panel se puede acceder al detalle de un empleado en concreto. Además, incluye un filtro para cambiar la visualización del resumen entre diaria o mensual y otro filtro para seleccionar el mes del cual se quiere obtener el resumen.
- Detalle de un empleado, donde se puede ver la información del empleado y un listado de todos los fichajes asociados al mismo.
- Pantalla de incidencias, la cual es un listado de todos aquellos fichajes incompletos.

Para acceder a la aplicación, el usuario deberá iniciar sesión en la página de login. Al ser una demo, cualquier email (bien formateado) y contraseña (al menos 6 caracteres), será dado por bueno, y por tanto se permitirá el acceso. La duración de esta sesión se ha fijado en 1 hora, tras lo cual, si el usuario realiza alguna operación, este será expulsado de la aplicación para que vuelva a iniciar sesión.

## Aspectos a tener en cuenta

- Durante el desarrollo de la aplicación, se ha asumido que para cada día solo hay una entrada y salida por empleado.
- Para mejorar el rendimiento, se debería añadir paginación o una lógica de scroll infinito a los listados/tablas para no cargar todos los resultados de golpe.
- Respecto a la usabilidad, se debería añadir un mensaje informativo en caso de que no hubiese datos (de empleados o de fichajes).
- En un entorno real, habría que capturar las excepciones generadas por el API, procesarlas e informar al usuario adecuadamente.
- Se han incluido algunas traducciones a modo de ejemplo, pero no se ha realizado una internacionalización completa de la aplicación por cuestiones de tiempo.

## Aspectos técnicos

Para trabajar en el desarrollo de esta aplicación se ha fijado la versión de Node a la v18. Para comenzar a desarrollar se puede ejecutar `nvm use` para utilizar esta versión. Si no se tiene instalada esta versión, se puede instalar mediante `nvm install` ya que estos comandos leen el fichero `.nvmrc` para saber la versión sobre la que actuar.

En los servicios desarrollados, se ha procurado usar un enfoque orientado a conectarse a una API externa, por eso se podrán encontrar `delays`, `timeouts` o más métodos de los que realmente podrían haber sido necesarios implementar en el servicio (e.g. obtener un empleado por ID o los fichajes asociados a un empleado) dada la naturaleza local del origen de datos.

### Stack tecnológico

|                 | Nombre     | Versión | URL                                 |
| --------------- | ---------- | ------- | ----------------------------------- |
| **Lenguaje**    | JavaScript | ES6     | n/a                                 |
| **Framework**   | Angular    | 17.2.0  | [angular.io](https://angular.io/)   |
| **Librería**    | Day.js     | 1.11.10 | [day.js.org](https://day.js.org/)   |
| **Librería**    | PrimeNG    | 17.8.0  | [primeng.org](https://primeng.org/) |
| **Herramienta** | ESLint     | 8.56.0  | [eslint.org](https://eslint.org/)   |
| **Herramienta** | Prettier   | 3.2.5   | [prettier.io](https://prettier.io/) |

### Variables de entorno
No se han utilizado variables de entorno por sencillez, pero en un entorno real deberían añadirse las variables necesarias, como por ejemplo la URL del API al que se ataca.

## Servidor de desarrollo

Para lanzar el servidor de desarrollo y acceder fácilmente a la aplicación, se debe ejecutar `npm start`, tras lo cual se debe acceder a la dirección `http://localhost:4200`.

## Traducciones

Los textos de la aplicación se encuentran por defecto en español, pero se han incluido algunas traducciones a inglés. Al lanzar la aplicación, se puede cambiar el idioma de la misma desde el selector de idioma que se encuentra en la barra de navegación (en la parte superior derecha). El funcionamiento de las traducciones solo es posible cuando se genera una compilación de la aplicación, no se puede probar con el servidor de desarrollo.

Para generar los ficheros de traducción, hay que ejecutar el comando `ng extract-i18n`, el cual extraerá las cadenas de texto que hayan sido marcadas para su traducción. El fichero resultante tendrá formato XLIFF por defecto y deberá copiarse a la carpeta `src/assets/locales` con el nombre `messages.{locale}.xlf` para que sea interpretado correctamente. En este caso, al haberse incluido únicamente el inglés como traducción, el nombre del fichero deberá ser `messages.en.xlf`.

## Linting y formateo

Se han incluido las herramientas 'eslint' y 'prettier' para mejorar la calidad de código y que incluyen una serie de reglas para organizar y formatear el código.
Para comprobar si hay errores en los ficheros hay que ejecutar `npm run lint` y si se quiere que la herramienta arregle automáticamente los errores (cuando sea posible), se debe ejecutar `npm run lint:fix`

## Compilación

Para obtener un paquete distribuible de la aplicación, se debe ejecutar el comando `npm run build`. El resultado se generará en la carpeta `dist/` y al contar la aplicación con traducciones, se crearán dos carpetas, una para cada idioma. Se puede utilizar un servidor de prueba para lanzar la aplicación y comprobar el correcto funcionamiento de la aplicación y las traducciones `npx serve dist/browser` y acceder a `http://localhost:3000/en` o `http://localhost:3000/es`

## Tests

Se han programado varios tests unitarios para comprobar el funcionamiento de la aplicación.
Para probar los tests hay que ejecutar `npm run test`. En caso de querer comprobar la cantidad de cobertura de los mismos, se debe ejecutar `npm run test -- --code-coverage`
