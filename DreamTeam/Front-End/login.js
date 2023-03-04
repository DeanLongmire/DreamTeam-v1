/*Login JS to make users complete all fields have to fix functionality
still moves on even if fields aren't actually filled*/
document.getElementById("Login").onclick = function() {
    let allAreFilled = true;
    document.getElementById("sign-in").querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (i.type === "radio") {
    let radioValueCheck = false;
    document.getElementById("sign-in").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
    if (r.checked) radioValueCheck = true;
    })
      allAreFilled = radioValueCheck;
      return;
    }
    if (!i.value) { allAreFilled = false;  return; }
  })
  if (!allAreFilled) {
    alert('Fill all the fields');
  }
};