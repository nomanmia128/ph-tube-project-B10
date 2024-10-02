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


const displayCategories = (data) => {
    console.log(data);
};

loadCategories();
