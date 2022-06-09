//Inputs:
var bookmarkNameInput = document.getElementById('bookmarkName')
var bookmarkURLInput = document.getElementById('bookmarkURL')

var websites

//if local storage is still empty:
if (localStorage.getItem('WebsitesList') == null) {
  var websites = []
} else {
  websites = JSON.parse(localStorage.getItem('WebsitesList'))
  displayWebsites()
}

function addBookmark() {
  var website = {
    bName: bookmarkNameInput.value,
    bURL: bookmarkURLInput.value,
  }
  websites.push(website)

  //console.log(websites)

  //Local storage:
  localStorage.setItem('WebsitesList', JSON.stringify(websites))

  displayWebsites()

  clearInputs()
}

//Display websites:
function displayWebsites() {
  var box = ``
  for (var i = 0; i < websites.length; i++) {
    box += `
    <div class="row item" > 
      <h3> ${websites[i].bName} <h3>
      <a href="${websites[i].bURL}" target="_blank"> <button class="btn btn-primary"> visit </button> </a> 
      <button class="btn btn-warning" onclick="retrieveData(${i})"> Update </button>
      <button class="btn btn-danger" onclick="deleteBookmark(${i})"> Delete </button>
    </div>
    `
  }
  document.getElementById('bookmarkList').innerHTML = box
}

//Clear inputs:
function clearInputs() {
  bookmarkNameInput.value = ''
  bookmarkURLInput.value = ''
}

//Delete website:
function deleteBookmark(siteIndex) {
  websites.splice(siteIndex, 1)
  displayWebsites()
  localStorage.setItem('box', JSON.stringify(websites))
}

//Update website:
//1- Retrieve data:
function retrieveData(siteIndex) {
  bookmarkNameInput.value = websites[siteIndex].bName
  bookmarkURLInput.value = websites[siteIndex].bURL

  //2- change button from submit -> update
  document.getElementById('buttonsContainer').innerHTML = `
  <button class="btn btn-warning my-4" onclick="updateBookmark(${siteIndex})"> Update bookmark </button>
  `
}

//3- Upadte website:
function updateBookmark(siteIndex) {
  //a-
  websites[siteIndex].bName = bookmarkNameInput.value
  websites[siteIndex].bURL = bookmarkURLInput.value

  //b-
  displayWebsites()

  //c-
  localStorage.setItem('box', JSON.stringify(websites))

  //d-
  clearInputs()

  //e- Change button update -> submit
  document.getElementById('buttonsContainer').innerHTML = `
  <button onclick="addBookmark()" class="btn btn-primary my-4">
            Submit
          </button>
  `
}

//Search Bookmark
function searchBookmark(searchValue) {
  searchOutput = ``
  for (var i = 0; i < websites.length; i++) {
    if (websites[i].bName.toLowerCase().includes(searchValue.toLowerCase()) ) {
      searchOutput += `
      <div class="row item" > 
      <h3> ${websites[i].bName} <h3>
      <a href="${websites[i].bURL}" target="_blank"> <button class="btn btn-primary"> visit </button> </a> 
      <button class="btn btn-warning" onclick="retrieveData(${i})"> Update </button>
      <button class="btn btn-danger" onclick="deleteBookmark(${i})"> Delete </button>
    </div>    
      `
    }
  }
  document.getElementById('bookmarkList').innerHTML = searchOutput
}
