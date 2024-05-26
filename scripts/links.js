const baseUrl = "https://srejas.github.io/wdd230/";
const linksUrl = "https://srejas.github.io/wdd230/data/links.json"

async function getCourseLinks() {
    try {
        const response = await fetch(linksUrl);
        if (response.ok) {
            const data = await response.json();
            // displayResults(data);
            console.log(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}