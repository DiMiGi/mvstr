# Movistar

## Instalar

Debe tener Node.js y NPM installado

Asegurarse que estos comandos arrojen alguna version:

```bash
node -v
npm -v
```

Luego instalar Ionic y Cordova globalmente con (puede requerir `sudo`)

```bash
npm install -g ionic cordova
```

## Ejecutar

### Modo Desarrollo

Ejecutar en el navegador.

```bash
ionic serve
```

### En Android

Activar modo desarrollo en Android.

En caso de recibir errores por licencias, ver esta pregunta en StackOverflow https://stackoverflow.com/questions/40383323/cant-accept-license-agreement-android-sdk-platform-24/40383457#40383457 para resolverlo.

Instalar Android-SDK (puede ser Android Studio completo) y luego configurar las rutas, por ejemplo:

```bash
export ANDROID_HOME=/home/felo/Android/Sdk
export PATH=${PATH}:/home/felo/Android/Sdk/platform-tools
```

Finalmente ejecutar con:

```bash
ionic cordova run android
```
