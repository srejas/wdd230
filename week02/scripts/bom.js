const inputElement = document.querySelector('#favchap');
const buttonElement = document.querySelector('button');
const listElement = document.querySelector('#list');

buttonElement.addEventListener('click', () => {
    if (inputElement.value != "") {
        const newFav = document.createElement('li');
        const deleteButton = document.createElement('button');

        newFav.textContent = inputElement.value;
        deleteButton.textContent = `❌`;

        newFav.append(deleteButton);
        listElement.appendChild(newFav);

        deleteButton.addEventListener('click', () => {
            listElement.removeChild(newFav);
            inputElement.focus();
        });
        
        inputElement.focus();
        inputElement.value = '';
    }
    else {
        inputElement.focus();
    }
});