const inputElement = document.querySelector('#favchap');
const buttonElement = document.querySelector('button');
const listElement = document.querySelector('#list');

let chaptersArray = getChapterList() || [];

chaptersArray.forEach((chapter) => {
    displayList(chapter);
});

buttonElement.addEventListener('click', () => {
    if (inputElement.value != "") {
        displayList(inputElement.value);
        chaptersArray.push(inputElement.value);

        setChapterList();

        inputElement.value = "";
        inputElement.focus();
    }
});

function displayList(item) {
    const newFav = document.createElement('li');
    const deleteButton = document.createElement('button');

    newFav.textContent = item;
    deleteButton.textContent = `❌`;

    newFav.append(deleteButton);
    listElement.appendChild(newFav);
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', () => {
        listElement.removeChild(newFav);
        deleteChapter(newFav.textContent);
        inputElement.focus();
    });
        
    inputElement.focus();
}

function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}