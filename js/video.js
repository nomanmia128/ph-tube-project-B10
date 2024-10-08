console.log('video fill is uplot');

function getTimeString(time){
    // get Hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSecond = time  % 3600; 
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second age`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for(let btn of buttons){
    btn.classList.remove("active");
  }
}

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

const loadCategoriesVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) =>{
      // sobaike active class remove korao
      removeActiveClass();
      // id er class k active korao
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
}

const loadDetails = async (videoId) => {
  console.log(videoId);
  const uri =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  disPlayDetails(data.video);
}
const disPlayDetails = (video) => {
  console.log(video);
  const detailContainer = document.getElementById("modal-content");
  
  detailContainer.innerHTML =`
  <img src=${video.thumbnail} />
  <p>${video.description}</p>
  `;

  // way-1
  // document.getElementById("showModalData").click();
  // way-2
  document.getElementById("coustomModal").showModal();
};

// const cardDemo ={
    
//         "category_id": "1003",
//         "video_id": "aaae",
//         "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
//         "title": "Inside Amy Schumer",
//         "authors": [
//             {
//                 "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
//                 "profile_name": "Amy Schumer",
//                 "verified": ""
//             }
//         ],
//         "others": {
//             "views": "3.6K",
//             "posted_date": "15147"
//         },
//         "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
// }

const displayVideos = (videos) => {
   const videoContainer = document.getElementById('videos')
   videoContainer.innerHTML = "";

   if(videos.length == 0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[400px] flex flex-col gap-5 justfy-center items-center">
    <img src="acses/Icon.png"/>
    <h2 class="text-center font-bold">
    No Content Here in this Categery
    </h2>
    </div>
    `;
    return;
   }
   else{
    videoContainer.classList.add("grid");
   }

   videos.forEach((video) => {
    console.log(video);
    const card = document.createElement('div');
    card.classList = 'card card-compact';
    card.innerHTML = 
    `
    <figure class="h-[200px] relative">
    <img
      src= ${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" : ` <span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
      }
     
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
        ${
            video.authors[0].verified === true
            ? `<img class="w-5" src ="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ""
        }
        </div>
        <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
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
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =
        `
        <button id="btn-${item.category_id}" onclick ="loadCategoriesVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `;

        // add button to catagory container
        catgoryContainer.append(buttonContainer);
    })
};

loadCategories();
loadVideos();
