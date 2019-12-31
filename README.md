# Beton Liga Manager

This project is a built with [GRANDstack](https://grandstack.io) (GraphQL, Angular, Apollo, Neo4j Database). There are two components, the UI application (a Angluar app) and the API app (GraphQL server).

### Dobrodosli u Beton Liga Manager-a, sajt koji je dizajniran da omoguci lako pretrazivanje igraca, timova i desavanja u lokalnoj prijateljskoj amaterskoj fudbalskoj ligi.
### Isto tako, ova platforma ima mogucnost dodavanja novih timova, igraca, utakmica, stadiona... 
### Ovo je veb sajt koje ce vam pruziti uvid u najtacniju i najopsezniju statistiku koju ste videli za vasu omiljenu ligu i prikazati najinteresantnije podatke vezane za nju koji ce, biti zabavni kako igracima u ligi tako i posmatracima i navijacima.
### Svet amaterskog malog fudbala je na klik od tebe, istrazi ga slobodno!
![](grandStack.jpg)
## Neo4j
### Local setup
1. [Download Neo4j Server](https://neo4j.com/download-center/#community)
2. Unzip
3. cd ./bin && run cmd there
4. Run command: neo4j console
5. Go to localhost:7474
6. Username && password: neo4j
7. Set new password to root

### [`/api`](./api)

*Install dependencies*

```
cd ./PraviUI && npm install
cd ./api && npm install
```

*Start API server*
```
cd ./api && npm start
```

![](api/img/graphql-playground.png)

### [`/ui`](./praviUI)

This will start the GraphQL API in the foreground, so in another terminal session start the UI development server:

*Start UI server*
```
cd ./praviUI && ng serve
```

![](praviUI/BetonMangerUI.jpg)

See [the project releases](https://github.com/grand-stack/grand-stack-starter/releases) for the changelog.

This project is licensed under the Apache License v2.
Copyright (c) 2018 Neo4j, Inc.
