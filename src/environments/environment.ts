// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCrbTbVseU5_lKXaAAIPBPupwtsc5JE0O0",
    authDomain: "rb6-automation.firebaseapp.com",
    databaseURL: "https://rb6-automation.firebaseio.com",
    projectId: "rb6-automation",
    storageBucket: "rb6-automation.appspot.com",
    messagingSenderId: "969331683430"
  }
};
