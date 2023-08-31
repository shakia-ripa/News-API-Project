const handleCategory = async () => {
    const tabContainer = document.getElementById('tab-container');

    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    let categories = data.data.news_category;
    // categories = categories.slice(0, 3);
    categories.forEach((category) => {
        const div = document.createElement('div');
        
        div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')" class="tab md:text-base lg:text-xl">${category.category_name}</a>
            `;
        tabContainer.appendChild(div);

    });
};

const handleLoadNews = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await res.json();

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.data.forEach((news) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-auto bg-base-100 shadow-xl">
        <figure><img src=${news?.image_url} alt="News" /></figure>
        <div class="card-body">
            <h2 class="card-title">
                ${news?.title.slice(0, 40)}
                <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
            </h2>
            <p>${news?.details.slice(0, 50)}</p>
            <h3 class="font-semibold">Views: ${news?.total_view ? news?.total_view : "No Views"}</h3>

            <div class="card-footer flex justify-between mt-8">
                <div class="flex">
                    <div>
                        <div class="avatar online">
                            <div class="w-14 rounded-full">
                                <img src=${news?.author?.img} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>${news?.author?.name}</h6>
                        <small>${news?.author?.published_date}</small>
                    </div>

                </div>
                <div class="card-detaild-btn">
                    <button onclick="showDetails('${news._id}')"
                        class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                        Details
                    </button>
                </div>
            </div>
        </div>
    </div>
        `;
        cardContainer.appendChild(div);
    })
}

const showDetails = async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await res.json();
    const details = data.data[0];
    console.log(data.data[0]);
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    modalContainer.innerHTML = '';
    
    div.innerHTML = `

<dialog id="my_modal_1" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box">
  <div class="card w-auto bg-base-100 p-6 overflow-auto">
  <div class="space-y-4">
  <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
  <figure><img class="w-4/5" src=${details?.thumbnail_url} alt="News" /></figure>
  <h3 class="font-bold text-lg">${details?.title}</h3>
  <p class="py-4">${details?.details}</p>
  </div>

    <small>
    <h3 class="font-bold text-lg">${details?.author?.name}</h3>
    <p>${details?.author?.published_date}</p>
    </small>
    
  </form>
</dialog>

    
    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="">
      
      </form>
    </dialog>
    `;
    modalContainer.appendChild(div);

    const modal = document.getElementById('my_modal_1');
    modal.showModal();
}


handleLoadNews('01');

handleCategory();