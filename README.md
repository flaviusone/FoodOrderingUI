##Install and start server:
1. npm install
2. npm start

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
