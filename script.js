// Main Variables

const theInput = document.getElementById("input-repo");
const getButton = document.getElementById("get-button");
const reposData = document.getElementById("show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos function
function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        reposData.innerHTML = "";
        data.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          let urlRepo = document.createElement("a");
          let urlText = document.createTextNode("Show");
          urlRepo.appendChild(urlText);
          urlRepo.href = `https://github.com/${theInput.value}/${repo.name}`;
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
}
