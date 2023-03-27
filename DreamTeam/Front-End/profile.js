/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
    alert("You have been logged out");
}

/*
function createLi() {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = input.value;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit my information';
  
    li.appendChild(span);
    li.appendChild(label);
    li.appendChild(editBtn);
    return li;
  }
*/
/*Working on allowing user to edit name and email*/
/*ul.addUserInfo('click', (event) => {
    if(event.target.tagname === 'BUTTON'){
        const button = event.target;
        const li = button.parentNode;
        const span = li.parentNode;

        if(button.textContent === 'Edit my information'){
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = text;
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'Save my information';
        }
    }
});*/

function saveEdits(){
    
}