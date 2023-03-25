/*New way to login, still have to work out bug of letting it
 go through with no pw*/
 let input = document.querySelector(".dynprog-input");
 let button = document.querySelector(".create_league");
 create_league.disabled = true;
 input.addEventListener("change", stateHandle);
 
 function stateHandle(){
   if(document.querySelector(".dynprog-input").value === ""){
     create_league.disabled = true;
   }
   else{
     create_league.disabled = false;
   }
 }