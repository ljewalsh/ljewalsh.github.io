let spans = document.querySelectorAll('.upside_down_arc span')
let mytop = 130

var i;

for (i=0;i<8;i++){
    spans[i].style.top = mytop + 'px'
    mytop = mytop + 11
}

for (i=8;i<spans.length;i++){
    mytop = mytop - 11
    spans[i].style.top = mytop + 'px'
}
