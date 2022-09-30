async function getPhotos() {
  // let response = await fetch("photo.json");
  let response = await fetch("https://pixabay.com/api/?key=24194223-7c2f2d1f20c592a1f12e67655&q=yellow+flowers&image_type=photo");
  let photos = await response.json();
  console.log(photos.hits)
  return photos.hits;
}

function getMyPhotosHtml(photos) {
  let myPhotosHtml = photos.map((photo) => {
      return `<img class="my-photo" src="${photo.webformatURL}" alt="${photo.user}" />`;
    })
    .join("");
  return `<div class="my-photos">${myPhotosHtml}</div>`;
}

//  src="https://picsum.photos/id/${photos[2].id}/300/300" />

getPhotos().then((photos) => {
  let myPhotosHtml = getMyPhotosHtml(photos);
  document.body.innerHTML = `<div class="my-gallery">
        <img id="my-selected-photo" class="my-photo" src="${photos.webformatURL}" />
        ${myPhotosHtml}
    </div>`;

  let myPhotoImgs = Array.from(document.getElementsByClassName("my-photo"));
  myPhotoImgs.forEach((photoImg) => {
    photoImg.addEventListener("click", (e) => {
      let selectedPhotoSrc =
        photoImg.src.substr(0, photoImg.src.length - 7) + `300/300`;
      let selectedPhoto = document.getElementById("my-selected-photo");
      selectedPhoto.src = selectedPhotoSrc;
      selectedPhoto.style.display = "inline";
    });
  });
});