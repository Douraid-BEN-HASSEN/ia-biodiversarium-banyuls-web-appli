
# Web appli pour la détection d'espèces

## Description générale
Interface web responsive qui permet de réaliser deux fonctionnalités : <br/>
1 ) Prendre une photo une / des espèces ( végétaux et animaux) , interoger l'intelligence artificielle via une API, et obtenir l'identification des espèces sur la photo. <br/>
Par la suite, l'interface proposera à l'utilisateur une liste sous forme de grilles de toutes les espèces détectées. L'utilisateur pourra cliquer sur l'une des espèces afin d'afficher une modale contenant une documentation de l'espèce sélectionnée. <br/>
2 ) Sans prendre de photos, l'utilisateur peut faire une recherche parmi toutes les espèces identifiables, et accéder à une page de documentation sur l'espèce recherchée. 

## Routes utilisées sur l'API pour les requêtes 
1) {API_URL}/api/mobile/analyze : POST : Prends en paramètre une image en base 64 <br/> Renvoie la réponse de l'analyse de l'image par L'API ( éléments détectés, position, et valeur de certitude pour l'élément sélectionné).   <br/>
2) {API_ URL}/api/species/${scientific_name} : GET : Prends en paramètre le nom scientifique d'une espèce. <br/> Renvoie la documentation propre à l'espèce. Contient : la famille de l'espèce, l'id de l'espèce, une image en base64, le nom et de nom scientifique de l'espèce, le type de l'espèce et une description. <br/>
3) {API_ URL}/api/species : GET <br/> Renvoie la même chose que la requête précédente, mais pour toutes les espèces présentes dans la base de données. 

## Technologies utilisées 
1) React / Typescript pour le développement <br/>
2) Librairie Material UI pour faire des interfaces plus faciles ( les modales, les boutons, etc ... ) <br/>
3) Librairie AXIOS pour faire les requêtes à l'api
4) Utilisations des HOOKS de React

 ## Fonctionnalités de l'appli-web
 

 - Traduction en 3 langues différentes ( Français , Anglais, Catalan) 
 - Responsive (utilisable à la fois à l'horizontale comme à la verticale) 
 - Utilise des requêtes pour communiquer avec l'api qui permet par la suite de communiquer avec intelligence artificielle
 - Utilise la caméra du smartphone afin de prendre des photos
 - Sur ANDROID, peut être accessible comme une application, c'est à dire sur l'écran d'application du smartphone
 - Permet d’accéder à la doc de toutes les espèces sans prendre aucune photo. 
 - Le site web pourra être accessible pour tous les visiteurs de l'aquarium, le fait qu'il s'agisse d'un site web est un avantage car les visiteurs n'ont rien à installer pour profiter de l'application. 
 - Un Dockerfile est fourni sur le GIT afin de faciliter le déploiement de l'appli web. 
 
 ## Captures d'écran de l'application
 ![Screen 1](https://gitlab.imerir.com/ia-biodiversarium-banyuls/web-appli/-/raw/dev/screenshoots/1.png)
![Screen 2](https://gitlab.imerir.com/ia-biodiversarium-banyuls/web-appli/-/raw/dev/screenshoots/2.png)
![Screen 3](https://gitlab.imerir.com/ia-biodiversarium-banyuls/web-appli/-/raw/dev/screenshoots/3.png)
![Screen 4](https://gitlab.imerir.com/ia-biodiversarium-banyuls/web-appli/-/raw/dev/screenshoots/4.png)
