const input = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");
const userInfoBox = document.querySelector(".succes");
const errorBox = document.querySelector(".error");
const parent = document.querySelector(".repos");


searchBtn.addEventListener("click", () => {
  let username = input.value;
  parent.innerHTML = '';
  errorBox.classList.remove('is-visible');
  
  if(username){
    getUsers(username)
  }
});

function getUsers(username) {
  fetch(`http://api.github.com/users/${username}`)
  .then(data => data.json())
  .then(result => result.login ? printUserInfo(result) : printError())
  .catch(err => console.log(err.toString()))
};

function printUserInfo(user) {
  let username = document.getElementById("username");
  let fullName = document.getElementById("full-name");
  let bio = document.getElementById("bio");

  username.innerHTML =`@${user.login}`;
  fullName.innerHTML = user.name;
  bio.innerHTML = user.bio;

  userInfoBox.classList.add('is-visible');

  getRepos(user)
  
}

function getRepos(user) {
  let url = `https://api.github.com/users/${user.login}/repos`;
  fetch(url)
  .then(data => data.json())
  .then(result => {
    result.forEach(repo => {
      createDomElement(repo)
    });
  })
  .catch(err => console.log(err.toString()));
}

function createDomElement(data) {
  let newElem = document.createElement('div');

  newElem.innerHTML = `<a href="${data.html_url}" target="_blank"><p>${data.name}</p></a><div><i class="fas fa-star">${data.stargazers_count}</i><i class="fas fa-code-branch">${data.forks_count}</i></div>`;

  newElem.classList.add("repo");

  parent.appendChild(newElem);
}

function printError() {
  userInfoBox.classList.remove('is-visible');
  errorBox.classList.add('is-visible');
}