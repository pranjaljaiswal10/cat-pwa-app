import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push , onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://realtime-database-478f6-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app= initializeApp(appSettings);//create  firabse instance(conection b/w app and firebase service)
const database= getDatabase(app);
const shoppingListInDB=ref(database,"shoppingLists")//("which databse","reference")

//change in db
onValue(shoppingListInDB,function(snapshot){
    if(snapshot.exists()){
let shoppingListArray=Object.entries(snapshot.val());
ul.innerHTML="";
for(let i=0;i<shoppingListArray.length;i++)
{
    let currentItem=shoppingListArray[i];

    addList(currentItem);
}
    }
else
{
    ul.innerHTML="";
    ul.innerHTML+="<li>No item's is exit in databse,please add item</li>"
}
})


const inputText = document.getElementById("input-field");
const button = document.getElementById("add-button");
const ul=document.getElementById("shopping-list");

function addList(item){
    let itemValue=item[1];
    let itemId=item[0];
    let li=document.createElement("li");
    li.textContent=itemValue;
    li.addEventListener("dblclick",()=>{
    let exactLocationofStoryInDB= ref(database,`shoppingLists/${itemId}`)
    remove(exactLocationofStoryInDB);
    })
    ul.appendChild(li);
}
function clearInputField(){
   inputText.value="";
}

button.addEventListener("click",()=>{
    let inputValue=inputText.value;
    addList(inputValue);
    clearInputField();
    push(shoppingListInDB,inputValue);//add what data(where,what)
    
})