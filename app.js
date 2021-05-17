
class Photon {
  constructor() {
    this.auth = "563492ad6f91700001000001e19bb36bf4e743c6ab90e897851c0573";
    this.searchInput = document.querySelector(".search-input");
    this.submitBtn = document.querySelector(".submit-button");
    this.gallery = document.querySelector(".gallery");
    this.searchValue = null;
    this.moreBtn = document.querySelector(".more");
    this.renderStartPictures();
    this.addListener();
    this.page = 1;
  }

  getApiData = async (url) => {
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: this.auth,
      },
    });

    if(dataFetch.status){
      return await dataFetch.json();
    }else{
      alert('No responce from Server :(')
    }
  };

  renderStartPictures = async () => {
    
    const data = await this.getApiData(
      "https://api.pexels.com/v1/curated?page=1&per_page=15"
    );
    data.photos.forEach((element) => {
      console.log(element);
      this.gallery.insertAdjacentHTML(
        "beforeend",
        this.getTempalte({
          src: element.src.large,
          name: element.photographer,
          link: element.src.original,
          small: element.src.small,
          large: element.src.large,
          big: element.src.medium
        })
      );
    });
  };

  getTempalte = ({ src, name, link,small,large,big }) => {
    return `
      <div class="gallery-img">
        <div class='gallery-info'>
          <p>${name}</p>
          <a href=${link} target='_blank'>Download</a>
        </div>
        <div class="gallery-download">
          <span>Download</span>
          <a href='${big}' target='_blank'>Big</a>
          <a href='${small}' target='_blank'>Small</a>
          <a href='${large}' target='_blank'>Large</a>
          <a href='${link}' target='_blank'>Origin</a>
        </div>
        <img src="${src}" alt="">
      </div>
    `;
  };

  addListener = () => {
    this.submitBtn.addEventListener("click", this.searchPhotos);
    this.moreBtn.addEventListener("click", this.loadMore);
  };

  searchPhotos = async (e) => {
    this.page = 1;
    e.preventDefault();
    this.searchValue = document.querySelector(".search-input").value;
    
    if(this.searchValue == ''){
      alert('please put correct request')
      return
    }
    const data = await this.getApiData(
      `https://api.pexels.com/v1/search/?page=1&per_page=15&query=${this.searchValue}`
    );
    this.clear();
    data.photos.forEach((element) => {
      
      this.gallery.insertAdjacentHTML(
        "beforeend",
        this.getTempalte({
          src: element.src.large,
          name: element.photographer,
          link: element.src.original,
          small: element.src.small,
          large: element.src.large,
          big: element.src.medium,
        })
      );
    });
  };

  clear = () => {
    this.gallery.innerHTML = "";
    this.searchInput.value = "";
  };

  loadMore = async ()=>{
    this.page ++;
    let data = null;
    if(!this.searchValue){
      data = await this.getApiData(
        `https://api.pexels.com/v1/curated?page=${this.page}&per_page=15`
      );
    }else{
      data =  await this.getApiData(
      `https://api.pexels.com/v1/search/?page=${this.page}&per_page=15&query=${this.searchValue}`)
    }

    data.photos.forEach((element) => {
      this.gallery.insertAdjacentHTML(
        "beforeend",
        this.getTempalte({
          src: element.src.large,
          name: element.photographer,
          link: element.src.original,
        })
      );
    });
  }
}

let start = new Photon();
