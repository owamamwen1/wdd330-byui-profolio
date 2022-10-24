// fetch the json file as APIs
const URL = "./people.json";

const courseMate = document.getElementById("webfront");
webfront.innerHTML = "<p>Loading...";

fetch(URL)
  .then((response) => response.json())
  .then((mate) => courseMate.innerHTML = getCourseMate(mate));

  // function
const getCourseMate = (mate) => {
  const names = mate
    .map((person) => `<li>${person.name}</li>`)
    .join("\n");
  return `<ul>${names}</ul>`;
};