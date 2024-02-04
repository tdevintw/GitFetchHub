const mainContainer = document.getElementById('main');
let page = 1; // Initial page number
const perPage = 30; // Number of repositories per page
let apiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}`;

function fetchRepositories() {
    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error("Can't fetch data for the moment");
            } else {
                return res.json();
            }
        })
        .then(data => {
            const repositories = data.items;
            if (repositories.length === 0) {
                const repocontainer = document.createElement('div');
                repocontainer.innerHTML = `
                    <div class="error-div text-center">
                        <h2>There Is No Records For The Moment</h2>
                        <h2>T-T</h2>
                    </div>
               `
                ; 
        mainContainer.appendChild(repocontainer);
         return false;
            } else{
            repositories.forEach(repo => {
                const repocontainer = document.createElement('div');
                repocontainer.innerHTML = `
                    <div class="repo-div">
                        <div class="repo_img">
                            <img src="${repo.owner.avatar_url}" alt="repo_img">
                        </div>
                        <div class="repo-content">
                            <h2 class="repo-title">${repo.name}</h2>
                            <p class="description">${repo.description}</p>
                            <div class="repo-infos">
                                <button class="stars bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">stars:${repo.stargazers_count}</button>
                                <button class="issues bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">issues:${repo.open_issues_count}</button>
                                <p class="submitted">submitted 30 days ago by ${repo.owner.login}</p>
                            </div>
                        </div>
                    </div>
                `;
                mainContainer.appendChild(repocontainer);
            })};
        })
        .catch(error => {
            console.error("Error during API request", error);
        });
}

// Call fetchRepositories initially
fetchRepositories();

// Implement a "Load More" button for pagination
const loadMoreButton = document.getElementById('next');

loadMoreButton.addEventListener('click', () => {
    page++; // Increment page number
    const newApiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
    apiUrl = newApiUrl; // Update apiUrl with the new page
    fetchRepositories();
});




function searchRepositories(searchTerm) {

    if (searchTerm !== '') {
        page = 1; // Reset page number for new search
        apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
        mainContainer.innerHTML = ''; // Clear existing results
        fetchRepositories();
        
    }else{
        page = 1; // Reset page number for new search
        apiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
        mainContainer.innerHTML = ''; // Clear existing results
        fetchRepositories(); 
    }
}
