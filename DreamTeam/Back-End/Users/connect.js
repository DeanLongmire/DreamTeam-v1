function sendData() {
    const inputBox = document.getElementById('input-box');
    const inputValue = inputBox.value;
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/store-data', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({name: inputValue}));
  
    xhr.onload = function() {
      if (xhr.status !== 200) {
        console.error('Error:', xhr.status);
        return;
      }
      console.log(xhr.responseText);
    };
  }