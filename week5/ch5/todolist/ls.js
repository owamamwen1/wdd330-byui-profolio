
 function localStoreSet (todo1,todo2){
    return localStorage.setItem(`${todo1}`, JSON.stringify(todo2));
 }

function localStoreGet (todo){
    return localStorage.getItem(`${todo}`)
 }

export default {localStoreSet,localStoreGet};