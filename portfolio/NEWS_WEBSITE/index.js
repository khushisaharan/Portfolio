const API_KEY= "b912b6f81e78478d9209fc229a98742d";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer= document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML=" ";

    articles.forEach((artical) => {
        if(!artical.urlToImage) return;
        const cardclone= newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardclone,artical);
        cardsContainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone, artical){
    const newsImage= cardclone.querySelector('#news-img');
    const newsTitle= cardclone.querySelector('#news-title');
    const newsSource= cardclone.querySelector('#news-source');
    const newsDesc= cardclone.querySelector('#news-desc');

    newsImage.src=artical.urlToImage;
    newsTitle.innerHTML= artical.title;
    newsDesc.innerHTML=artical.description;

    const date = new Date(artical.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML= `${artical.source.name} . ${date}`;
    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(artical.url, "_blank");
    })

}
let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

