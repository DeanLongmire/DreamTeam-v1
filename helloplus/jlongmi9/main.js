let temperature = {
    f: 72,
    c: function() {
        let c = (this.f - 32) * 5/9;
        return parseFloat(c.toPrecision(3));
    }
}

document.getElementById("F").innerHTML = temperature.f + "&deg;F";
document.getElementById("C").innerHTML = temperature.c() + "&deg;C";

function increase() {
    temperature.f++;
    document.getElementById("F").innerHTML = temperature.f + "&deg;F";
    document.getElementById("C").innerHTML = temperature.c() + "&deg;C";
}
function decrease() {
    temperature.f--;
    document.getElementById("F").innerHTML = temperature.f + "&deg;F";
    document.getElementById("C").innerHTML = temperature.c() + "&deg;C";
}
