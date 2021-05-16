// const auth = "563492ad6f91700001000001e19bb36bf4e743c6ab90e897851c0573"; //no backend thats why it`s open
// const gallery = document.querySelector(".gallery");
// const searchInput = document.querySelector(".search-input");
// const submitBtn = document.querySelector(".submit-button");
// let searchValue = null;

// async function curatedPhotos() {
//   const dataFetch = await fetch(
//     "https://api.pexels.com/v1/curated?per_page=15",
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: auth,
//       },
//     }
//   );

//   const data = await dataFetch.json();
//   console.log(data.photos);
// }

// curatedPhotos();

class Photon {
  constructor() {
    this.auth = "563492ad6f91700001000001e19bb36bf4e743c6ab90e897851c0573";
    this.searchInput = document.querySelector(".search-input");
    this.submitBtn = document.querySelector(".submit-button");
    this.gallery = document.querySelector(".gallery");
    this.searchValue = null;
    this.fetchPictures();
    this.addListener();
  }

  fetchPictures = async () => {
    const dataFetch = await fetch(
      "https://api.pexels.com/v1/curated?per_page=15",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: this.auth,
        },
      }
    );
    const data = await dataFetch.json();
    data.photos.forEach((element) => {
      this.gallery.insertAdjacentHTML(
        "beforeend",
        this.getTempalte(element.src.large, element.photographer)
      );
    });
  };

  getTempalte = (src, name) => {
    return `
        <div class="gallery-img">
            <img src="${src}" alt="">
            <p>${name}</p>
        </div>
    `;
  };

  addListener = () => {
    this.submitBtn.addEventListener("click", this.searchPhotos);
  };

  searchPhotos = (e) => {
    e.preventDefault();
    this.searchValue = document.querySelector(".search-input").value;
  }

  
}

let start = new Photon();
