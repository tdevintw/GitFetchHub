<h1 align="center"> GitFetchHub: </h1> <br>
<img align="center" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"></img>
<h2> Description :</h2>
   
  In this project i consume an api using api.github.com to build a simple project where at the main page (home)  repositories are showed in order of stars . <br>
  

   <h2> Features:  </h2><br>
  1- Ability to see most popular repositories on github based on stars.<br>
  2- Abilty to search an api by repository name or owner.<br>
  3- Using pagination to enhance page response speed , each page can contains up to 30 reposiotry . the page contains also a next button and  a previous button to control the  pagination . <br>
  4- Each repository contains information like reposiotry name , number of stars , numbers of issues (forks) , creation date,  owner name and owner image. <br>

 <h2> How Things work :</h2><br>


  1- First of all , i use tailwind to style the page and to color the html blocks using classes and to bring some wonderful predifined sections like navbar and search bar.<br>
  2- Now for the api , i use fetch() method , which is a method in js used to send a request to a server , in hope  that the server will return some useful data. we use also .then() and .catch to establish  all possible cases like  if(!res.ok) (means that the request wasn't accepted by the server)...etc<br>
  3- If the response is accepted by the server we will get a data as a json data which is the acronym of java script object notation , so the data is returned as an object which contains many arrays.<br>
  4- I also use many condition statments to establish cases like repositories.length ===0 which  will return no record if true .....etc.<br>
  5- For the logic of the pagination i use 2 buttons next and prev , each time we click the button the apiurl reset and the we recall the function fetchRepositories() .i also add cases for pagination so if im in page 1 prev btn will be disapair and if there is no repository in the next page the next button wont be displayed .<br> 
  6- For the search button i also use the same logic as pagination when i click search i send the input value to the function to take it and reset the apiUrl and finally as expected recalling the fetchRepositories() again with the new api .<br>

<h2> What I Learn From this Project :</h2>
1-Frist of all i learn about APIs , what is an api and how we can consume it.<br>
2-I also learn about json : what is json and why most if not all APIs are as json data , and how to handle json data using javascript.<br>
3-I develop my js knowledge , with using fetch() method to send the request to the server and also the DOM to manipulate the logic of the code ,and to fill the html container with the right data.<br>
4-Also , i develop problem solving skill, since i need to find problems or solution of errors or bugs , or to add a feature and the best example is the next button pagination to control either the button will be displayed or not .<br>
  More explaination about the code  is on the comments . <br>
  Happy Coding :star_struck:	
