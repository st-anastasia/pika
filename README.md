# Pika 

Photo Editing Single Page Application

## Install

On MacOS install hombrew

```
brew tap mongodb/brew
brew install mongodb-community@3.2 node@12
export PATH="/usr/local/opt/node@12/bin:$PATH"
brew services start mongodb/brew/mongodb-community@3.2
npm install 
```

## Load Demo Data
```
node server/db/schema.js
node server/bin/seed-photos.js demo_images
```

## Run
```
npm run start
```
