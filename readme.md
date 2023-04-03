# Description
Technical test for Statement by Volodymyr Hlushko (wllmdeemer@gmail.com)

# Dev environment
Gulp processes source files from `dev/src` to `assets` folder.

### Before you start
1. Make sure you've installed Nodejs and ShopifyCLI.
2. Run `npm install` from the `dev` folder.

### Sync with remote
* This theme is not connected to any store via GitHub.
* Run `shopify theme dev` from the root folder. It'll upload and sync the files with the store you're currently logged into.

### Build source files
* Run one of the following command from the `dev` folder:
    * `npm run dev` - watching and compiling the source files for development.
    * `npm run build` - compiling the source files for production.