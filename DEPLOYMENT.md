# Guide de Déploiement - SpaceX App 
Ce guide vous explique comment déployer l'application SpaceX sur différentes plateformes.

# Cloner le projet
 git clone https://github.com/AbdouDIOP41/SpaceX.git
 cd SpaceX

## Déploiement sur Vercel
1. Installer Vercel CLI si ce n'est pas encore fait :
   npm install -g vercel
   
2. Se connecter à Vercel :
   vercel login

3. Depuis le dossier du projet, lancer le déploiement :
   vercel
   

##  Déploiement sur Netlify
1. Installer Netlify CLI :
   npm install -g netlify-cli
   
2. Se connecter à Netlify :
   netlify login
   
3. Construire l'application :
   npm run build
   
4. Déployer :
   netlify deploy --prod --dir=dist
   

## Déploiement sur GitHub Pages
1. Installer `gh-pages` :
   npm install gh-pages --save-dev
   
2. Ajouter dans `package.json` :
   json
   "scripts": {
      "deploy": "gh-pages -d dist"
   }
   
3. Construire et déployer :
   npm run build
   npm run deploy
   

##  Déploiement avec Docker
1. Créer un `Dockerfile` :
   dockerfile
   FROM node:18
   WORKDIR /app
   COPY . .
   RUN npm install && npm run build
   CMD ["npx", "http-server", "dist"]
   
2. Construire et exécuter l'image :
   docker build -t spacex-app .
   docker run -p 8080:8080 spacex-app
   

##  Déploiement sur un VPS (Linux)
1. Copier les fichiers sur le serveur :
   scp -r * user@your-server-ip:/var/www/spacex-app
   
2. Se connecter au serveur :
   ssh user@your-server-ip
   
3. Installer les dépendances et démarrer :
   cd /var/www/spacex-app
   npm install
   npm run build
   pm2 start npm --name "spacex-app" -- start
   

Ton application est maintenant en ligne !

