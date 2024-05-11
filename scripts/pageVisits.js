const pageVisitsDisplay = document.querySelector(".visits");

let pageVisits = Number(window.localStorage.getItem('pageVisits-ls')) || 0;

if (pageVisits === 0) {
    pageVisitsDisplay.textContent = 0;
}
else {
    pageVisitsDisplay.textContent = pageVisits;
}

pageVisits++;

localStorage.setItem('pageVisits-ls', pageVisits);