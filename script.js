
// ----------------------------login page---------------


// Function to set user information in local storage
function setUserInfo(username) {
   localStorage.setItem("username", username);
}

// Function to get user information from local storage
function getUserInfo() {
   return localStorage.getItem("username");
}

// Function to clear user information from local storage
function clearUserInfo() {
   localStorage.removeItem("username");
}

// Function to handle the login
function login() {
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;

   let p1 = document.getElementById("username-p");
   let p2 = document.getElementById("password-p");


   if (username == "" && password == "") {
      alert("Fill Compelete Details")
   }
   else if (username != "virendra" && password == "1234") {
      p1.innerHTML = "Invailed Username"
      p2.innerHTML = ""
   }
   else if (username == "virendra" && password != "1234") {
      p2.innerHTML = "Invailed Password"
      p1.innerHTML = ""
   }
   else if (username == "virendra" && password == "1234") {
      p1.innerHTML = ""
      p2.innerHTML = ""
      setUserInfo(username);
      window.location.href = "http://127.0.0.1:5501/index.html#"
   }
   else {
      alert("Enter Vailed Details")
   }
}

// Function to handle the logout
function logout() {
   // Clear user information from local storage
   clearUserInfo();
   // Redirect to the login page
   window.location.href = "login.html";
}

// Function to update the button text on the home page
function updateButtonText() {
   var logoutButton = document.getElementById("login-button");
   if (logoutButton) {
      var username = getUserInfo();
      if (username) {
         logoutButton.innerHTML = username.toUpperCase();
      }
   }
}

// Call the function to update the button text when the script is loaded
updateButtonText();


// -------------data-----------------


let linkdata = "https://newsapi.org/v2/everything?q="
// let apidata = "1d3a0eefa97b499d8fbc4ee93eeb40b7"
let apidata = "3382e3a95064477897b8ab2cfabc0160"

// Set the number of items to display per page
var itemsPerPage = 12;

// Initialize the current page
var currentPage = 1;

// Function to change the current page
function changePage(pageNumber) {
   currentPage = pageNumber;
   asyncronus()
   generatePagination();
}


window.addEventListener("load", () => asyncronus("india"))

const asyncronus = async (item) => {
 try {
   let fulldata = await fetch(`${linkdata}${item}&apiKey=${apidata}`)
   let Fulldata = await fulldata.json()
   let articals = await Fulldata.articles
   generatePagination(articals)

   // pagination code
   var startIndex = (currentPage - 1) * itemsPerPage;
   var endIndex = startIndex + itemsPerPage;

   let card = document.getElementById("card")
   const ele = (element) => {
      if (!element.urlToImage) {
         return `
            <div class = "col-lg-3 col-md-6">
            <div class = "card" href = "${element.url}">
            <img src="https://img.favpng.com/22/4/6/india-the-hindu-hinduism-editorial-om-png-favpng-MYMwBGxLeN6AMmeTDi99zs8ji_t.jpg" alt="" class=" img-fluid card-img-top">
            <div id="card-text">
                <a href = "${element.url}"><h4 id="card-title">${element.title}</h4></a>
                <h6 id="card-date">${element.publishedAt}</h6>
                <p id="card-description">${element.description}</p>
            </div>
            </div>
            </div>
            `
      }
      else {
         return `
         <div class = "col-lg-3 col-md-6">
            <div class = "card">
               <img src="${element.urlToImage}" alt="" class=" img-fluid card-img-top">
               <div id="card-text">
               <a href = "${element.url}"><h4 id="card-title">${element.title}</h4></a>
               <h6 id="card-date">${element.publishedAt}</h6>
               <p id="card-description">${element.description}</p>
             </div>
            </div>
         </div>
         `
      }
   }

   let filter = articals.slice(startIndex,endIndex)
   let d = filter.map(ele)
   card.innerHTML = d.join('')
 } catch (error) {
   console.log(error)
 } 
}



// Function to generate pagination buttons
function generatePagination(articals) {

   var totalPages = Math.ceil(articals.length / itemsPerPage);
   var paginationHtml = '';

   // Previous button
   if (currentPage > 1) {
       paginationHtml += '<button class = "pagebuttons" onclick="changePage(' + (currentPage - 1) + ')">Previous</button>';
   }

   // Numbered buttons
   for (var i = 1; i <= 2; i++) {
       paginationHtml += '<button class = "pagebuttons" onclick="changePage(' + i + ')">' + i + '</button>';
   }

   // Next button
   if (currentPage < totalPages) {
       paginationHtml += '<button class = "pagebuttons" onclick="changePage(' + (currentPage + 1) + ')">Next</button>';
   }

   const elm =document.getElementById('pagination').innerHTML = paginationHtml;
}



// Initial display

generatePagination();


function topic(item) {
   asyncronus(item);
}

let searchicon = document.getElementById("search-icon");
let searchvalue = document.getElementById("search-1");
function search() {
   asyncronus(document.getElementById("search-1").value)
}
