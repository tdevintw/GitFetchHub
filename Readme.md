<h1>GetHubFetch :</h1> <br>
![alt text](https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png)

<h2>Description :</h2>
   
  in this project i consume an api from api.github.com to build a simple project where at the main page home all the repositories show in order of stars . <br>
  

   <h2>**Features:**  :</h2><br>
  1- ability to see most popular repos on github based on stars.<br>
  2- abilty to search an api by repo name or owner.<br>
  3- using pagination to enhance page response speed , each page can contains 30 repo . the page contains also a next button and previous button to control pagination . <br>
  4- each repo contains informations like repo name , number of stars n numbers of issues (forks) , cerat date,  owner name and owner image. <br>

 <h2>**How Things work :</h2><br>


  1- first of all i use tailwind to style the page and to color the html blocks using classes dn to bring some wonderful predifined sections like navbar and search bar.<br>
  2- now for the api i use fetch() method , which is a method in js used to send a request to a server , hoping that the server will return some useful data. we use also .then() and .catch to establish use cases and all cases possible like  if(!res.ok) (means that the res wasn't accepted by the server).<br>
  3- if the res is accepted by the server we will get a data as a json data which is the acronym os java script object notation , so the data is returned as a object that contains many arrays.<br>
  4- i also use many condition statments to establish cases like repositories.length ===0 ; will return no record .....etc.<br>
  5- for the logic of the pagination i use 2 btns next and prev each time we click the btn the apiurl reset and the we recall the function fetchRepositories() .i also add cases for pagination so if im in page 1 prev btn will be disapair and if there is no repos in the next page the next btn wont be displayed .<br> 
  6- for the search btn i also use the same logic as pagination when i click search i send the input value to the function to take it and reset the apiUrl and finally as expected recallingthe fetchRepositories() again with the new api .<br>

  more explaination is on the comments . <br>
  **Happy Coding**
