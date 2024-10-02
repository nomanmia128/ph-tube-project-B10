console.log('video fill is uplot');
// 1 - Fetch, Load and show Categories on html

// create loadCategories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));

};

// Create DisplyCategories
const displayCategories = (categories) => {
     const catgoryContainer = document.getElementById('categories')

    categories.forEach((item) => {
        console.log(item);
        // create a button
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        // add button to catagory container
        catgoryContainer.appendChild(button);
    })
};

loadCategories();
