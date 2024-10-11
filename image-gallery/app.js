window.addEventListener('DOMContentLoaded', () => {
   let dataArr;
   const imgContainer = document.querySelector('.main__inner');
   const searchInput = document.querySelector('.search-input');
   const searchImg = document.querySelector('.search-wrap img');
   const pagination = document.querySelector('.pagination');
   const lastPage = document.querySelector('.last-page');
   const goBtn = document.querySelector('.go-to-page-btn');
   const inputPage = document.querySelector('.input-page');
   const randomBtn = document.querySelector('.get-random-btn');
   const largeImg = document.querySelector('.large-img');
   const largeModal = document.querySelector('.large');
   const largeModalClose = document.querySelector('.large__close');
   const arrows = document.querySelector('.pagination-arrows');
   const prevArrow = arrows.querySelector('.prev-btn');
   const nextArrow = arrows.querySelector('.next-btn');
   const nightModeSwitcher = document.querySelector('.switch__input')
   let currentPage = 1;
   searchInput.focus();

   getRandomContent();

   nightModeSwitcher.addEventListener('change', () => {
      if(nightModeSwitcher.checked) {
         
         nightMode()   
      } else {
         dayMode()    
      }      
   })

   randomBtn.addEventListener('click', () => {
      getRandomContent();
   })


   prevArrow.addEventListener('click', () => {
      if (currentPage > 1) {
         currentPage--;
         getContent(searchInput.value, currentPage);
         inputPage.value = currentPage;
      } else {
         currentPage = +lastPage.textContent;
         getContent(searchInput.value, currentPage);
         inputPage.value = currentPage;
      }
   })

   nextArrow.addEventListener('click', () => {
      if (currentPage < +lastPage.textContent) {
         currentPage++;
         getContent(searchInput.value, currentPage);
         inputPage.value = currentPage;
      } else {
         currentPage = 1;
         getContent(searchInput.value, currentPage);
         inputPage.value = currentPage;
      }
   })

   searchImg.addEventListener('click', () => {
      currentPage = 1;
      getContent(searchInput.value, currentPage);
      inputPage.value = currentPage;
   });
   searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
         currentPage = 1;
         getContent(searchInput.value, currentPage)
         inputPage.value = currentPage;
      }
   });

   goBtn.addEventListener('click', () => {
      currentPage = inputPage.value;
      getContent(searchInput.value, currentPage)
   })
   inputPage.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
         currentPage = inputPage.value;
         getContent(searchInput.value, currentPage)
      }
   })

   imgContainer.addEventListener('click', (e) => {
      const imagesOnPage = document.querySelectorAll('.image-small');

      imagesOnPage.forEach((item, i) => {
         if (e.target === item) {
            showLarge(i)
         }
      })
   })

   largeModalClose.addEventListener('click', () => {
      closeLarge()
   })

   largeModal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
         closeLarge()
      }

   })

   function showLarge(num) {
      console.dir(largeImg);
      largeImg.src = dataArr[num].urls.full;
      largeModal.style.display = 'block';
   }

   function closeLarge() {
      largeModal.style.display = 'none';
   }

   function renderPage(data) {
      imgContainer.innerHTML = '';
      console.log(data);
      if (Array.isArray(data)) {
         data.map(imageObj => {
            dataArr = data;
            imgContainer.innerHTML += `<div class="image-item">
                       <img class="image-small" src="${imageObj.urls.small}" alt="img">
                   </div>`;
         })
      } else {
         console.log(data);

         if (data.total_pages > 1 && data.total_pages <= 200) {
            lastPage.textContent = data.total_pages;
            pagination.style.visibility = 'visible';
            arrows.style.visibility = 'visible';

         } else if (data.total_pages > 200) {
            lastPage.textContent = 200;
            pagination.style.visibility = 'visible';
            arrows.style.visibility = 'visible';
         }

         else {
            console.log(data);

            pagination.style.visibility = 'hidden';
            arrows.style.visibility = 'hidden';

         }
         dataArr = data.results;
         data.results.map(imageObj => {
            imgContainer.innerHTML += `<div class="image-item">
                    <img class="image-small" src="${imageObj.urls.small}" alt="img">
                </div>`;
         })

      }
      console.log(dataArr);
   }

   async function getContent(searchQuery, page = 1) {
      const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=9&page=${page}&orientation=landscape&client_id=GEaQRjqktNIKDzLIvpfV51_dEGAMhge3KcX_vogg_LM`
      const response = await fetch(url);
      const data = await response.json();
      renderPage(data);
   }

   async function getRandomContent() {
      pagination.style.visibility = 'hidden';
      arrows.style.visibility = 'hidden';
      searchInput.value = ''
      const url = `https://api.unsplash.com/photos/random?count=9&orientation=landscape&client_id=GEaQRjqktNIKDzLIvpfV51_dEGAMhge3KcX_vogg_LM`;
      const response = await fetch(url);
      const data = await response.json();
      renderPage(data);
   }


   function nightMode() {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      document.querySelector('.header').style.backgroundColor = '#5b5b5b'
   }

   function dayMode() {
      document.body.style.backgroundColor = '';
      document.body.style.color = ''
      document.querySelector('.header').style.backgroundColor = ''
   }
})
