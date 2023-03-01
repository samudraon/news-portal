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
    // console.log(data, categoryName);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = categoryName;

    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';
    data.forEach(singleNews => {
        // console.log(singleNews);
        const { _id, image_url, title, details, author, total_view } = singleNews;
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-8 d-flex flex-column">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 200)}....</p>
                    <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
                        <div class="d-flex gap-2">
                            <img src="${author.img}" class="img-fluid rounded-circle" height="40" width="40">
                            <div>
                            <p class="m-0 p-0">${author.name}</p>
                            <p class="m-0 p-0">${author.published_date}</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="fas fa-eye"></i>
                            <p class="m-0 p-0">${total_view}</p>
                        </div>
                        <div>
                            <i class="fas fa-star"></i>
                        </div>
                        <div>
                            <i class="fas fa-arrow-right" onclick="fetchNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(card);
    })
}

const fetchNewsDetails = newsId => {
    const URL = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(URL)
        .then(res => res.json())
        .then(data => showNewsDetail(data.data[0]))
}

const showNewsDetail = newsDetail => {
    const { _id, image_url, title, details, author, total_view, others_info } = newsDetail;
    document.getElementById('modal-body').innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
        <div class="col-md-12">
            <img src="${image_url}" class="img-fluid rounded-start" alt="">
        </div>
        <div class="col-md-12 d-flex flex-column">
            <div class="card-body">
                <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ? 'Trending' : 'Not Trending'}</span></h5>
                <p class="card-text">${details}</p>
                <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
                    <div class="d-flex gap-2">
                        <img src="${author.img}" class="img-fluid rounded-circle" height="40" width="40">
                        <div>
                        <p class="m-0 p-0">${author.name}</p>
                        <p class="m-0 p-0">${author.published_date}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fas fa-eye"></i>
                        <p class="m-0 p-0">${total_view}</p>
                    </div>
                    <div>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
        `
}