```
  - assets - images (png/jpg/gif)
  - db - holds db.js, the database config file
  - fixtures - used in playground/cosmos for local isolated
  - playground - cosmos.js source/config files
  - routes - holds routes.js, the routes config file
  - src
    - components - react components
    - styles - components styles (less)
    - index.js - entry point for webpack
  - devServer.js - express server, now with webpack integration. Also loads playground env
  - index.html - what we render
  - webpack.config.dev.js - webpack config file for main prod env
  - webpack.config.playground.js - webpack config file for playground env
```

##Install and start server:
1. npm install
2. npm start -> localhost:3000
3. (optional) npm run playground -> localhost:8989

##REST API

```js
--> post (/login, {username:""})
<--{status:"done",user:{username:"", _id:"", name:"",orders:[{_id:"", name:"", price:int}]}}/{status:"error"}

-->get(/get_rooms)
<--{status:done, rooms:{_id:"", hourLimit:type.date, name:""}}/{status:"error"}

-->post(/join_room, {userId:"", roomId:""})
<--{status:"done",restaurant:{_id:"", pageUrl:"", name:"", imgUrl:"", deliveryTime:"", minimumOrder:"", menu:
                    [{name:"", price:int, description:"", quality:""}]}}/{status:"eror"}

-->post(/orders_info, {roomId:""})
<--{status:"done", users:[{username:"", _id:"", name:"",orders:[{_id:"", name:"", price:int}]]}}/{status:"error"}

-->post(/submit_order, {userId:"", orders:[{name:"", price:int}]}
<--{status:"done"}/{status:"error"}
```
