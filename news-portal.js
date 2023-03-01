const fetchCategories = () => {
    const URL = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(URL)
        .then(res => res.json())
        .then(data => showCategories(data.data));
}

const showCategories = (data) => {
    const categoriesContainer = document.getElementById('categories-container')
    data.news_category.forEach(singleData => {
        // console.log(singleData);
        /* option 1: advanced */
        // categoriesContainer.innerHTML += `<a class="nav-link" href="#">${singleData.category_name}</a>`;
        const container = document.createElement('p');
        container.innerHTML = `
        <a class="nav-link" href="#" onclick="fetchCategoryNews('${singleData.category_id}', '${singleData.category_name}')">${singleData.category_name}</a>
        `;
        categoriesContainer.appendChild(container);
    });
}

// fetch all newses available in a category
const fetchCategoryNews = (categoryId, categoryName) => {
    // console.log(categoryId);
    const URL = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(URL)
        .then(res => res.json())
        .then(data => showAllNews(data.data, categoryName));
}

const showAllNews = (data, categoryName) => {
    console.log(data, categoryName);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = categoryName;

    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';
    data.forEach(singleNews => {
        console.log(singleNews);
        const { image_url, title, details } = singleNews;
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0,260)}....</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(card);
    })
}

