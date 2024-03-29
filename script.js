// Main Variables

const theInput = document.getElementById("input-repo");
const getButton = document.getElementById("get-button");
const reposData = document.getElementById("show-data");
const result = document.getElementById("result");

getButton.onclick = function () {
  getRepos();
};

// Get Repos function
function getRepos() {
  const term = theInput.value;
  if (theInput.value === "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${term}/repos?per_page=100`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        reposData.innerHTML = "";
        result.innerHTML = `<h2>Search results for: ${term}</h2>`;
        data.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          let urlRepo = document.createElement("a");
          let urlText = document.createTextNode("Show");
          urlRepo.appendChild(urlText);
          urlRepo.href = `https://github.com/${term}/${repo.name}`;
          urlRepo.setAttribute("target", "_blank");
          mainDiv.appendChild(urlRepo);
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsText);
          mainDiv.appendChild(starsSpan);
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      });
  }
  // Clear search tag
  theInput.value = "";
}
