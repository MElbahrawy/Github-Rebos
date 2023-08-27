let input = document.querySelector(".user-input");
let btn = document.querySelector(".get-btn");
let dataBox = document.querySelector(".data");

btn.addEventListener("click", () => showData());

function showData() {
    if (input.value === "") {
        dataBox.innerHTML = `<span>Please Enter a username</span>`;
    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then((Response) => Response.json())
            .then((data) => {
                dataBox.innerHTML = `<span> Number of repositories are ${data.length} </span>`;
                data.forEach((repo) => {
                    let mainDiv = document.createElement("div");
                    mainDiv.className = "repo-data";
                    // add name
                    let repoName = document.createElement("p");
                    let repoNameText = document.createTextNode(repo.name);
                    repoName.appendChild(repoNameText);
                    mainDiv.appendChild(repoName);
                    // For links
                    let links = document.createElement("div");
                    links.className = "links";
                    // add Demo
                    let demo = document.createElement("a");
                    demo.className = "demo";
                    demo.href = `https://github.com/MElbahrawy/${repo.name}`;
                    demo.target = "_blank";
                    let demoText = document.createTextNode("Demo ");
                    demo.appendChild(demoText);
                    links.appendChild(demo);
                    // add Live
                    if (repo.homepage) {
                        let live = document.createElement("a");
                        live.className = "live";
                        live.href = repo.homepage;
                        live.target = "_blank";
                        let LiveText = document.createTextNode("- Live");
                        live.appendChild(LiveText);
                        links.appendChild(live);
                    }
                    mainDiv.appendChild(links);
                    dataBox.appendChild(mainDiv);
                });
            })
            .catch(() => {
                dataBox.innerHTML = "<span>Username Not Found!</span>";
            });
    }
}
