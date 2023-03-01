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
}

