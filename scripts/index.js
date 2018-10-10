const input = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");
const userInfoBox = document.querySelector(".succes");
const errorBox = document.querySelector(".error");
const parent = document.querySelector(".repos");
const clientId = '7b64e29b7a19f6c1d9f5';
const clientSecret = '38b39ee8d79daa2a926ef8bcf1a185e6c2b87e15';

searchBtn.addEventListener("click", handleClick);

function handleClick() {
  let username = input.value;
  parent.innerHTML = '';
  userInfoBox.classList.remove('is-visible');
  errorBox.classList.remove('is-visible');

  if(username){
    getUser(username)
  }
}

function getUser(id) {
  let url = `http://api.github.com/users/${id}`
  fetch(`${url}?client_id=${clientId}&client_secret=${clientSecret}`)
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
  fetch(`${url}?client_id=${clientId}&client_secret=${clientSecret}`)
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