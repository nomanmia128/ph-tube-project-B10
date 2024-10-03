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
const loadVideos = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const cardDemo ={
    
        "category_id": "1003",
        "video_id": "aaae",
        "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
        "title": "Inside Amy Schumer",
        "authors": [
            {
                "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
                "profile_name": "Amy Schumer",
                "verified": ""
            }
        ],
        "others": {
            "views": "3.6K",
            "posted_date": "15147"
        },
        "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
}

const displayVideos = (videos) => {
   const videoContainer = document.getElementById('videos')
   videos.forEach((video) => {
    console.log(video);
    const card = document.createElement('div');
    card.classList = 'card card-compact';
    card.innerHTML = 
    `
    <figure class="h-[200px]">
    <img
      src= ${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src = ${video.authors[0].profile_picture}/>
    </div>
    <div>
        <div>
          <h2 class="font-bold">${video.title}</h2>
        </div>
        <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        <img class="w-5" src ="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>
        </div>
        <p></p>
    </div>
  </div>
    `;
    videoContainer.append(card);
   })
}

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
loadVideos();
