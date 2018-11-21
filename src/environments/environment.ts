// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDfTmRruNMgQK9cQw02Ip2cprt1gICi5-Y",
    authDomain: "biliccer-app.firebaseapp.com",
    databaseURL: "https://biliccer-app.firebaseio.com",
    projectId: "biliccer-app",
    storageBucket: "biliccer-app.appspot.com",
    messagingSenderId: "914755066738"
  }
};
