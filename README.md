# Agendamiento

## Instalar

Debe tener Node.js y NPM instalado.

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

Activar modo desarrollo en tu dispositivo Android.

Instalar Android-SDK (puede ser Android Studio completo) y luego configurar las rutas, por ejemplo:

```bash
export ANDROID_HOME=/home/felo/Android/Sdk
export PATH=${PATH}:/home/felo/Android/Sdk/platform-tools
```

(Esas lineas las puse en el archivo `/home/felo/.bashrc` en Linux)

O configurar el `PATH` en Windows si es que se usa Windows.

Finalmente ejecutar con:

```bash
ionic cordova run android
```

En caso de recibir errores por licencias, ver esta pregunta en StackOverflow https://stackoverflow.com/questions/40383323/cant-accept-license-agreement-android-sdk-platform-24/40383457#40383457 para resolverlo.

En caso que haya problema con cordova-plugin-local-notification usar el siguiente comando en la consola:
cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git --nofetch

En caso que no corra al ejecutar el proceso daemon:
https://stackoverflow.com/questions/40385165/ionic-android-build-failed-unable-to-start-the-daemon-process
