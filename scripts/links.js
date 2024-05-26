const baseUrl = "https://srejas.github.io/wdd230/";
const linksUrl = "https://srejas.github.io/wdd230/data/links.json";

const courseCard = document.querySelector(".card");

async function getCourseLinks() {
    try {
        const response = await fetch(linksUrl);
        if (response.ok) {
            const data = await response.json();
            displayLinks(data.weeks);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}

function displayLinks(weeks) {
    const courseList = document.createElement('ul');

    weeks.forEach((week) => {
        const listItem = document.createElement('li');

        listItem.textContent = `${week.week}: `

        let finalLink = week.links.length - 1;

        week.links.forEach((link) => {
            const newLink = document.createElement('a');

            newLink.textContent = `${link.title}`;
            newLink.setAttribute('href', `${link.url}`);

            listItem.appendChild(newLink);

            if (link !== week.links[finalLink]) {
                const newSpan = document.createElement('span');
                newSpan.textContent = `|`
                listItem.appendChild(newSpan);
            }
        })

        courseList.appendChild(listItem);
        courseCard.appendChild(courseList);
    });
}

getCourseLinks();