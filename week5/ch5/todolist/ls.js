
export default class localStores {
   localStoreSet (todo1,todo2){
      return localStorage.setItem(`${todo1}`, JSON.stringify(todo2));
   };
   
   localStoreGet (todo){
      return localStorage.getItem(`${todo}`)
   }
}