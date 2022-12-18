# INSTALLATION
Run `npm i` in this folder

# RUN LOCALLY
Run `npm run dev` in this folder
After backend and frontend are up and running, you can navigate to `http://localhost:5173/` where you will be able to test the URRL application. You can also access swagger by navigating to `http://localhost:3000/api-docs`.

# RUN TESTS
Just run `npm run test` in this folder

# Remarques
- J'ai utilisé Svelte car c'est un framework que j'apprécie en ce moment et pour en discuter lors d'un éventuel entretien. J'aurais pu faire le test en React ou Angular ou même Vue
- Je m'étais fixé environ 6h pour faire le maximum, je ne peux pas dégager plus de temps sur un week-end de fin d'année.
- Avec plus de temps, j'aurais aimé faire une solution complètement "production ready" avec au moins une solution sous docker-compose qui aurait lancé une base de données type Postgres, un Redis pour le cache, etc...
- Je n'ai pas eu le temps de faire beaucoup de test unitaire. J'ai uniquement testé rapidement les deux classes vraiment utiles du backend.
- J'ai utilisé un limiteur d'accès aux APIs pour éviter qu'un bot puisse scanner tous les hash possibles
- Je n'ai pas trouvé beaucoup d'information utile sur la RFC7230 (en tout cas pas une lib qui supportait explicitement cette RFC et sans devoir lire toute la RFC), du coup je suis parti sur une regexp standard de validation d'URLs web (protocol http(s))
- Dans un souci de performance, il aurait été bon de mettre un cache (type nginx) devant le backend, mais le fait de devoir compter les accès à chaque URL nécessite de déporter le cache du côté d'un Redis plutôt. Bien que dans ce test, il n'y ai pas besoin d'un cache vu qu'on accède pas à une base de données.
- Dans le cas d'une API qui rencontrerai du succès, il faudrait stocker les URRLs dans un cluster de base de données répliquées sur différentes zones géographiques, avec un cluster cache Redis devant et avoir la possibilité de scaler horizontalement le backend (via des pods dans kubernetes par exemple) derrière des loadbalancers.
- J'ai choisi aussi d'ajouter un timestamp à chaque URRL créée car ainsi, on pourrait cleaner les URRLs qui sont trop anciennes ou même monétiser cette fonction: une option gratuite qui garde une URRL active 6 mois par exemple et une option payant qui la garde toujours (je n'ai pas codé le code qui permet de clean automatiquement au bout de X temps).
