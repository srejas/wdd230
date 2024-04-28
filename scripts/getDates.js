const today = new Date();
let currentYear = today.getFullYear();
document.querySelector('#footerDate').textContent = currentYear;

document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;