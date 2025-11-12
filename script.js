var objects = [];
var angleCurrent = 0;
const plank = document.querySelector('.plank');
plank.addEventListener('click', function(event) {
    const middlePlank = plank.getBoundingClientRect().left + plank.offsetWidth / 2;
    if (event.clientX < middlePlank) {
        alert('Plank clicked on the left side!');
    } else {
        alert('Plank clicked on the right side!');
    }
});