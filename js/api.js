const mainContainer = document.getElementById('main')
const apiUrl = 'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc';
fetch(apiUrl)
.then(res=>{
    if(!res.ok){
        throw new Error("Can't fetch data for the moment");
    }
    else{
        return res.json();
    }
})
.then(data => {
    const repositories = data.items;
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
                    <p class="submitted">submitted 30days ago by ${repo.owner.login}</p>
                </div>
            </div>
            </div>
        `;
        mainContainer.appendChild(repocontainer);
    });
})

 

.catch(error=> {
    console.error("error durning api request", error)
});