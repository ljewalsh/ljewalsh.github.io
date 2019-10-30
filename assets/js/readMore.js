function onReadMore(index){
    const adjustedIndex = index - 1
    const readMoreElements = document.getElementsByClassName('default');
    const showMoreElements = document.getElementsByClassName('show');
    if (readMoreElements[adjustedIndex].innerHTML === 'Read more...'){
        readMoreElements[adjustedIndex].innerHTML = 'Read Less...'
        showMoreElements[adjustedIndex].style.display = 'block';
    }
    else {

        readMoreElements[adjustedIndex].innerHTML = 'Read more...'
        showMoreElements[adjustedIndex].style.display = 'none';

    }
}
