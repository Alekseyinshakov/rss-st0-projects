document.addEventListener("DOMContentLoaded", () => {
   // Burger menu

   const menu = document.querySelector('.nav-mobile');
   const burger = document.querySelector('.burger');
   const darkLayer = document.querySelector('.dark-layer');
   const nav_item = document.querySelectorAll('.nav_item');

   burger.addEventListener('click', (e) => {
      if (burger.classList.contains('burger-active')) {
         hideMobileMenu()
      } else {
         showMobileMenu()
      }
   })

   darkLayer.addEventListener('click', hideMobileMenu)

   nav_item.forEach(item => {
      item.addEventListener('click', hideMobileMenu)
   })

   function showMobileMenu() {
      burger.classList.add('burger-active')
      menu.classList.add('nav-mobile-active');
      darkLayer.style.display = '';
      document.body.style.overflow = 'hidden';
   }

   function hideMobileMenu() {
      burger.classList.remove('burger-active')
      menu.classList.remove('nav-mobile-active')
      darkLayer.style.display = 'none';
      document.body.style.overflow = '';
   }

   // MAIN SLIDER************************************************************



   fetch('js/pets.json')
      .then((response) => {
         return response.json();
      })
      .then((data) => {

         if (document.querySelector('.pets__cards')) {
            pagination(data);
         }
         if (document.querySelector('.pets__line')) {
            slider(data);
         }
         modal(data)
      });

   function slider(data) {

      const petsContainer = document.querySelector('.pets__line');
      let cardsPerSlide = 0;
      calculateCardsPerSlide();

      function calculateCardsPerSlide() {
         if (window.innerWidth <= 760) {
            cardsPerSlide = 1;
         } else if (window.innerWidth < 1237) {
            cardsPerSlide = 2;
         } else {
            cardsPerSlide = 3;
         }
         createSlider(cardsPerSlide)
      }


      function createSlider(n) {

         let animals = [...data]
         let visibleCars = [];
         let prevCards = [];
         for (let i = 0; i < n; i++) {
            const randomIndex = Math.floor(Math.random() * animals.length);
            visibleCars.push(animals[randomIndex]);
            animals.splice(randomIndex, 1);
         }
         console.log(visibleCars);
         console.log(animals);


         function render(cards, dir) {
            if (dir === 'rightBTN') {
               console.log('rightBTN');

               petsContainer.style.transform = 'translateX(-100%)';

               setTimeout(() => {
                  petsContainer.style.transition = ''

                  petsContainer.innerHTML = '';
                  cards.forEach(card => {
                     petsContainer.innerHTML += `<div class="pets-item">
                                  <img src="${card.img}" alt="${card.name}">
                                  <div class="pets-item__name">${card.name}</div>
                                  <button class="pets-item__btn">Learn more</button>
                              </div>`
                  })

                  petsContainer.style.transform = 'translateX(100%)'
                  setTimeout(() => {
                     petsContainer.style.transition = 'transform 0.6s'
                     petsContainer.style.transform = '';
                  }, 50);


               }, 500);

            } else if (dir === 'leftBTN') {
               petsContainer.style.transform = 'translateX(100%)';

               setTimeout(() => {
                  petsContainer.style.transition = ''

                  petsContainer.innerHTML = '';
                  cards.forEach(card => {
                     petsContainer.innerHTML += `<div class="pets-item">
                                  <img src="${card.img}" alt="${card.name}">
                                  <div class="pets-item__name">${card.name}</div>
                                  <button class="pets-item__btn">Learn more</button>
                              </div>`
                  })

                  petsContainer.style.transform = 'translateX(-100%)'
                  setTimeout(() => {
                     petsContainer.style.transition = 'transform 0.6s'
                     petsContainer.style.transform = '';
                  }, 50);


               }, 500);
            }

            else {
               petsContainer.innerHTML = '';
               cards.forEach(card => {
                  petsContainer.innerHTML += `<div class="pets-item">
                            <img src="${card.img}" alt="${card.name}">
                            <div class="pets-item__name">${card.name}</div>
                            <button class="pets-item__btn">Learn more</button>
                        </div>`
               })
               petsContainer.style.transition = 'transform 0.6s'
            }

         }

         render(visibleCars);

         let pets__arrow_right = document.querySelector('.pets__arrow_right');
         let pets__arrow_left = document.querySelector('.pets__arrow_left');

         pets__arrow_left.addEventListener('click', () => {
            if (prevCards.length !== 0) {
               visibleCars = [...prevCards];
               prevCards = [];
               render(visibleCars, 'leftBTN');
            } else {
               let visibleCarsCopy = [...visibleCars]
               visibleCars = []
               animals = [...data]
               for (let i = 0; i < n; i++) {
                  const randomIndex = Math.floor(Math.random() * animals.length);
                  if (visibleCarsCopy.includes(animals[randomIndex])) {
                     i--;
                     continue;
                  } else {
                     visibleCars.push(animals[randomIndex]);
                     animals.splice(randomIndex, 1);
                  }
               }
               render(visibleCars, 'leftBTN');
            }
         })

         pets__arrow_right.addEventListener('click', () => {
            prevCards = [...visibleCars];
            visibleCars = [];
            animals = [...data]
            for (let i = 0; i < n; i++) {
               const randomIndex = Math.floor(Math.random() * animals.length);
               if (prevCards.includes(animals[randomIndex])) {
                  i--;
                  continue;
               } else {
                  visibleCars.push(animals[randomIndex]);
                  animals.splice(randomIndex, 1);
               }
            }
            render(visibleCars, 'rightBTN');
         })
      }





      window.addEventListener('resize', function () {
         if (cardsPerSlide === 1 && window.innerWidth > 760) {
            calculateCardsPerSlide();
         } else if (cardsPerSlide === 2 && window.innerWidth >= 1237) {
            calculateCardsPerSlide();
         } else if (cardsPerSlide === 3 && window.innerWidth < 1237) {
            calculateCardsPerSlide();
         } else if (cardsPerSlide === 2 && window.innerWidth <= 760) {
            calculateCardsPerSlide();
         }
      });
   }

   // PAGINATION*****************************************************************

   function pagination(data) {
      let cardsPerPage = 0;
      let totalPages = 0;
      let activePage = 0;

      let array48 = [];
      let Array48prepareted = [];


      for (let i = 0; i < 6; i++) {
         array48 = [...array48, ...data]
      }


      Array48prepareted = [];
      for (let i = 0; i < array48.length; i++) {
         let arr48copy = [...array48]
         const randomIndex = Math.floor(Math.random() * arr48copy.length);
         if (Array48prepareted.slice(-7).includes(arr48copy[randomIndex])) {
            i--;
            continue;
         } else {
            Array48prepareted.push(arr48copy[randomIndex]);
            arr48copy.splice(randomIndex, 1)
         }
      }

      Array48prepareted = [...getRandomArray(Array48prepareted.slice(0, 6)), //6
      ...getRandomArray(Array48prepareted.slice(6, 8)), // 2
      ...getRandomArray(Array48prepareted.slice(8, 12)), // 4
      ...getRandomArray(Array48prepareted.slice(12, 16)), // 4
      ...getRandomArray(Array48prepareted.slice(16, 18)), // 2
      ...getRandomArray(Array48prepareted.slice(18, 24)), // 6 repit

      ...getRandomArray(Array48prepareted.slice(24, 30)), // 6
      ...getRandomArray(Array48prepareted.slice(30, 32)), // 2
      ...getRandomArray(Array48prepareted.slice(32, 36)), // 4
      ...getRandomArray(Array48prepareted.slice(36, 40)), // 4
      ...getRandomArray(Array48prepareted.slice(40, 42)), // 2
      ...getRandomArray(Array48prepareted.slice(42, 48)), // 6
      ]




      function getRandomArray(arr) {
         for (let i = 0; i < arr.length; i++) {
            let n = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[n]] = [arr[n], arr[i]];
         }
         return arr;
      }


      const next_page_btn = document.querySelector('.next_page_btn')
      const prev_page_btn = document.querySelector('.prev_page_btn')
      const currentPageElem = document.querySelector('.page_btn')
      const firstPageBtn = document.querySelector('.first_page_btn')
      const lastPageBtn = document.querySelector('.last_page_btn')
      const petsContainer = document.querySelector('.pets__cards')
      calculateCardsPerPage();

      next_page_btn.addEventListener('click', () => {
         nextPage()
      })

      prev_page_btn.addEventListener('click', () => {
         prevPage()
      })

      firstPageBtn.addEventListener('click', () => {
         activePage = 1;
         goToPage()
      })

      lastPageBtn.addEventListener('click', () => {
         activePage = totalPages;
         goToPage()
      })

      function render() {
         totalPages = 48 / cardsPerPage;
         activePage = 1;
         goToPage(activePage)
         console.log(`render... totalpages:${totalPages}`);



      }
      function goToPage() {
         currentPageElem.textContent = activePage;
         if (activePage >= totalPages) {
            next_page_btn.classList.add('inactive')
            lastPageBtn.classList.add('inactive')
         }
         if (activePage < totalPages) {
            next_page_btn.classList.remove('inactive')
            lastPageBtn.classList.remove('inactive')
         }
         if (activePage < 2) {
            prev_page_btn.classList.add('inactive')
            firstPageBtn.classList.add('inactive')
         }
         if (activePage > 1) {
            prev_page_btn.classList.remove('inactive')
            firstPageBtn.classList.remove('inactive')
         }

         petsContainer.innerHTML = '';
         let cardsToShow = [];
         for (let i = 0; i < cardsPerPage; i++) {


            const element = Array48prepareted[(cardsPerPage * activePage) - cardsPerPage + i];
            cardsToShow.push(element)
         }

         cardsToShow.forEach(card => {
            petsContainer.innerHTML += `<div class="pets-item">
                        <img src="${card.img}" alt="woody">
                        <div class="pets-item__name">${card.name}</div>
                        <button class="pets-item__btn">Learn more</button>
                    </div>`
         })


      }


      function nextPage() {
         if (activePage < totalPages) {
            activePage++;
            goToPage()
         }


      }

      function prevPage() {
         if (activePage > 1) {
            activePage--
            goToPage()
         }
      }




      window.addEventListener('resize', function () {
         if (cardsPerPage === 3 && window.innerWidth > 639) {
            calculateCardsPerPage()
         } else if (cardsPerPage === 6 && window.innerWidth >= 901) {
            calculateCardsPerPage()
         } else if (cardsPerPage === 8 && window.innerWidth < 901) {
            calculateCardsPerPage()
         } else if (cardsPerPage === 6 && window.innerWidth <= 639) {
            calculateCardsPerPage()
         }
      });
      function calculateCardsPerPage() {
         if (window.innerWidth <= 639) {
            cardsPerPage = 3;
         } else if (window.innerWidth < 901) {
            cardsPerPage = 6;
         } else {
            cardsPerPage = 8;
         }
         render()
      }

   }



   // POPUP*****************************************

   function modal(data) {
      let cardsContainer;
      const modalWindow = document.querySelector('.popup');
      const modalContent = document.querySelector('.popup__inner')
      let modalClose = document.querySelector('.popup__close-btn')

      if (document.querySelector('.pets__line')) {
         cardsContainer = document.querySelector('.pets__line')
      }
      if (document.querySelector('.pets__cards')) {
         cardsContainer = document.querySelector('.pets__cards')
      }

      cardsContainer.addEventListener('click', (e) => {
         if (e.target.closest('.pets-item')) {
            showModal(e.target.closest('.pets-item').querySelector('.pets-item__name').innerHTML)
         }
      })

      modalWindow.addEventListener('click', (e) => {
         if (e.target === e.currentTarget) {
            closeModal()
         }

      })


      function closeModal() {
         modalWindow.style.display = ''
      document.body.style.overflow = '';

      }

      function showModal(name) {
         let currentObj = {};
         data.forEach(obj => {
            if (obj.name === name) {
               currentObj = obj
            }
         })
         console.log(currentObj);

         modalContent.innerHTML = `<div class="popup__close-btn">
                <img src="img/close-svg.png" alt="">
            </div>
            <img src="${currentObj.img}" alt="" class="popup__img">
            <div class="popup__descr">
                <div class="popup__title">${currentObj.name}</div>
                <div class="popup__subtitle">${currentObj.type} - ${currentObj.breed}</div>
                <div class="popup__text">${currentObj.description}</div>
                <ul class="popup__list">
                    <li>Age: <span class="popup__list-span">${currentObj.age}</span></li>
                    <li>Inoculations: <span class="popup__list-span">${currentObj.inoculations}</span></li>
                    <li>Diseases: <span class="popup__list-span">${currentObj.diseases}</span></li>
                    <li>Parasites: <span class="popup__list-span">${currentObj.parasites}</span></li>
                </ul>
            </div>`
         modalWindow.style.display = 'flex';
      document.body.style.overflow = 'hidden';


         modalClose = document.querySelector('.popup__close-btn');
         modalClose.addEventListener('click', () => {
            closeModal()
         })

      }

   }
















});