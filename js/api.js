//the main container of the div repos
const mainContainer = document.getElementById('main');
// Initial page number
let page = 1; 
 // Number of repositories per page
const perPage = 30;
//url of the api that we will fetch for the first time it will give us 30 repos at page 1
let apiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
//function used to fetch repository based on the given apuurl
function fetchRepositories() {
    //send requets to the server to fetch data from  apiUrl 
    fetch(apiUrl)
    //establish cases of server responses to our request
        .then(res => {
            //if request wassn't accepted by the server 
            if (!res.ok) {
                throw new Error("Can't fetch data for the moment");
            } else {
                //if the server is accepted
                return res.json();
            }
        })
        //data returned by the server . the data is returned as a json data.
        .then(data => {
            //establish data cases
            const repositories = data.items;
            //in case that the server returns no data 
            if (repositories.length === 0) {
                const repocontainer = document.createElement('div');
                repocontainer.innerHTML = `
                    <div class="error-div text-center">
                        <h2>There Is No Records For The Moment</h2>
                        <h2>T-T</h2>
                    </div>
               `
                ; 
        //we use the append to specify where teh created div will placed
        mainContainer.appendChild(repocontainer);
        // we retun a value to exit the code
            } else{
            //if the server returns a data
            repositories.forEach(repo => {
                created_at = repo.created_at.replace("Z", " ").replace("T", " ");
                const repocontainer = document.createElement('div');
                //we create a div (a signle div present a repo container)  and then we fill the the diw ith the repo informations
                repocontainer.innerHTML = `
                    <div class="repo-div">
                        <div class="repo_img">
                            <a title="Vist Repository" href="${repo.html_url}"><img src="${repo.owner.avatar_url}" alt="repo_img"></a>
                        </div>
                        <div class="repo-content">
                            <h2 class="repo-title">${repo.name}</h2>
                            <p class="description">${repo.description}</p>
                            <div class="repo-infos">
                            <button class="stars bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">stars:${repo.stargazers_count}</button>
                            <button class="issues bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">issues:${repo.open_issues_count}</button>
                            
                                <p class="submitted">Created At : ${created_at} by ${repo.owner.login}</p>
                            </div>
                        </div>
                    </div>
                `;
                mainContainer.appendChild(repocontainer);
            })};
            //we call here the prevBtn function which is used to show or hide the prev btn
            prevBtn();
            nextBtn()

        })
        //in case an error have been occured
        .catch(error => {
            console.error("error found durning api request", error);
        });
}

//this is the first line to run when we call our js file . the fetchrepo function here will be opned with the default params : page 1  
fetchRepositories();

// Implement a next button for pagination
const next = document.getElementById('next');
//when click the next btn we will move to the next page
next.addEventListener('click', () => {
    // Increment page number
    page++; 
    //in this line i remove the &page=${page} from the paiuri  to avoid any unexpected error.
    apiUrl.replace("&page=${page}","")
    /*now we add the &page=${page} but this time the page variable increased by 1 . so if we suppose that i didnt  
    remove the &page=${page} the api url will be like :
    https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}
    at the initial entry of the website it will be like : 
    https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=1&per_page=$30
    and if i click next :     https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=1&per_page=30&page=2
    this may lead to unecpected behavior .
    */
    apiUrl = `${apiUrl}&page=${page}`;
    //clear the main inner content so the new content will be upload instead o fthe old content if we want to keep the old content we can remove this line
    mainContainer.innerHTML = ''; 
    //we call the function again but this time with a modified apirul (page number have been increased by 1)
    fetchRepositories();
});

//function that establish the logic of either show the btn or not .
function prevBtn(){ 
    const prev = document.getElementById('prev');
    //if there is no previuos page we will hide the btn . 
    if(page==1){
        
        prev.style.display = "none";
    }
    else{
        //if page > 1 that means a prev page exist.
        prev.style.display = "inline-block";
    }
}



//same logic of the the next btn click . the only difference is that we decrease the number of page var by 1
prev.addEventListener('click', () => {
   
    page--; // Increment page number
    apiUrl.replace("&page=${page}","")
    apiUrl = `${apiUrl}&page=${page}`
    mainContainer.innerHTML = ''; 
    fetchRepositories();
   
});

function getInput(){
    let value =  document.getElementById('input-search').value;
    searchRepositories(value);
    return value;
  }


  const click = document.getElementById('click');

  click.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      getInput();
  });
  




//the search funxtion 
function searchRepositories(searchTerm) {
   
    if (searchTerm !== '') {
        // Reset page number for new search
        page = 1; 
        apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}+in:name,login&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
        mainContainer.innerHTML = ''; 
        fetchRepositories();
          
    }else{
         // if search input is empty we will back to the initial staus
        // Reset page number for new search
        page = 1; 
        apiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
        mainContainer.innerHTML = ''; 
        fetchRepositories(); 
    }
}


//logic of next btn 

function nextBtn(){
    /*create new apiurl to seperate between the actual apiurl and the apiurl used to check next page
     if i dont sepearte them when i will increase page it will be increased in the origin url and when i click at next btn it will
     skip a page */
    let nexApiUrl = apiUrl;
    nextpage = page +1 ;
    nexApiUrl.replace("&page=${page}","")
    nexApiUrl = `${nexApiUrl}&page=${nextpage}`
    
    fetch(nexApiUrl)
    //establish cases of server responses to our request
        .then(res2 => {
            //if request wassn't accepted by the server 
            if (!res2.ok) {
                throw new Error("Can't fetch data for the moment");
            } else {
                //if the server is accepted
                return res2.json();
            }
        })
        //data returned by the server . the data is returned as a json data.
        .then(Nextdata => {
            //establish data cases
            const nextRepositories = Nextdata.items;
            //in case that the server returns no data for the next page no need to next button 
            if (nextRepositories.length === 0) {
             next.style.display = "none";
            } else{
            //if the next page have exist data
            next.style.display = "inline-block";
            }})
        };

