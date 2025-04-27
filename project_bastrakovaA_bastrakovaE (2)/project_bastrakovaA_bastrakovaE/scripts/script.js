
    /*Алгоритм обработки клика на стрелочки для пролистывания карточек:
    *   1. Ждем загрузки страницы.
    *   2. Находим все карусели. (Карусель - блок с карточками)
    *   3. Для каждой карусели:
    *     •  Находим кнопки "вперед" и "назад" и карточки. Если что-то не нашли - пропускаем эту карусель.
    *     •  Определяем ширину карточки.
    *     •  Считаем, что карусель в начале (позиция = 0).
    *     •  Кнопка "вперед": Клик - двигаем карусель вправо на ширину карточки, если есть куда двигать.
    *     •  Кнопка "назад": Клик - двигаем карусель влево на ширину карточки, если есть куда двигать.
    *     •  Следим, чтобы кнопки "вперед/назад" отключались, когда достигнут край карусели.
    *   4. Конец
    *   Блок-схема: /images/block-schema.PNG
    */
'use strict';
/* Создание объктов для карточек Вид Туризма*/
  const tourismTypes = {
  attractions: {
    title: "По достопримечательностям",
    image: "images/dostoprim.jpg",
    shortDesc: "Добро пожаловать в увлекательный мир российских достопримечательностей!",
    fullDesc: "Мамаева кургана в Волгограде. Этот величественный мемориал посвящен героям Сталинградской битвы и славен своей грандиозной статуей «Родина-мать». Прогулка по кургану дарит не только впечатляющие виды на город, но и глубокое погружение в историю. Перемещаемся в Санкт-Петербург, где расположился Эрмитаж – один из крупнейших художественных музеев мира. Его роскошные залы содержат коллекции от античности до современного искусства, а великолепие архитектуры Дворца Екатерины восхищает своей изысканностью. Прогуливаясь по этому культурному сокровищу, вы окажетесь в сердце искусства и истории. Кремль в Москве – еще одно сердце нашей страны. Это не только резиденция президента, но и настоящая крепость с впечатляющими соборами и знаменитыми курантами на Спасской башне. Прогулка по его территории позволит вам окунуться в атмосферу древнерусского зодчества и богатой истории. И, наконец, Екатерининский дворец в Царском Селе – жемчужина барокко. Его великолепные залы и знаменитая Янтарная комната поражают воображение и заставляют затаить дыхание. Здесь можно ощутить атмосферу императорской России и насладиться красотой парков и садов, окружающих дворец. Каждая из этих достопримечательностей рассказывает свою уникальную историю, и все они ждут вас, чтобы открыть свои двери и подарить незабываемые впечатления!"
  },
  nature: {
    title: "По чудесам природы",
    image: "images/By_the_wonders_of_nature.jpg",
    shortDesc: "Путешествуйте по чудесам природы России и откройте для себя уникальные уголки, которые оставят вас в полном восторге!",
    fullDesc: "Байкал, самое глубокое пресноводное озеро на планете, впечатляет своей кристально чистой водой и великолепными пейзажами. Насладитесь живописными прогулками по берегам и удивитесь разнообразию его флоры и фауны. Бархат Сарыкум – загадочный бархан, где мягкие песчаные дюны сменяются зелеными оазисами. Ваши глаза засияют от красоты этой местности, а шум ветра в бархане создаст атмосферу сказки. Долина Гейзеров – одно из немногих мест на Земле, где можно увидеть бурлящие природные источники. Это захватывающее зрелище не оставит равнодушным ни одного путешественника и позволит вам прикоснуться к необыкновенной силе природы. Эльтон – соленое озеро, знаменитое своими целебными грязями и фантастическими закатами. Откройте для себя эти чудеса и воспользуйтесь возможностью оздоровления в самом сердце природы. Сулакский каньон — один из самых глубоких каньонов Европы, который поражает своими величественными скалами и яркой бирюзовой водой. Прогулки по его кромке подарят незабываемые эмоции и возможность сделать потрясающие фотографии. Собирайте чемоданы и отправляйтесь к источникам вдохновения и красоты!"
  },
  family: {
    title: "Семейный отдых",
    image: "images/Family_holidays.jpg",
    shortDesc: "Приглашаем вас в увлекательное путешествие к резиденции Деда Мороза!",
    fullDesc: "Окунитесь в атмосферу зимней сказки и волшебства, где оживают новогодние традиции. В этом необычном месте вы сможете познакомиться с самим Дедом Морозом и его верной помощницей Снегурочкой, посетить уютные мастерские, где создаются подарки для детей, и принять участие в увлекательных мастер-классах. Не упустите возможность прогуляться по сказочным зимним пейзажам, насладиться снежными забавами и посетить ярмарку, где можно приобрести необычные сувениры и лакомства. Сюда можно приехать всей семьей и окунуться в мир сказки, радости и волшебства. Подарите себе и своим близким незабываемые моменты среди зимней сказки!"
  },
  eco: {
    title: "Экотуризм",
    image: "images/Ecotourism.jpg",
    shortDesc: "Байкал — одно из величайших природных чудес мира, приглашает вас в захватывающие эко туры, обещающие уникальные приключения и погружение в дикие красоты.",
    fullDesc: "Это удивительное озеро, охраняемое ЮНЕСКО, поражает своей кристально чистой водой и живописными пейзажами. Исследуйте уединенные пляжи, величественные скалы и удивительные подводные ландшафты. Во время тура у вас будет возможность увидеть уникальные виды местной флоры и фауны, включая нерпу и омуль. Прогулки по живописным экотропам подарят вам потрясающие виды на горные хребты и леса, а также фотомоменты, которые останутся с вами навсегда. Посетите бурятские поселения, где вас встретят традиции и кулинарные деликатесы местной культуры. Экологические туры на Байкале — это не только возможность насладиться природой, но и внести вклад в ее сохранение. Приезжайте и откройте для себя магию этого уникального уголка планеты!"
  },
  cultural: {
    title: "Культурные и гастрономические туры",
    image: "images/Cultural_and_gastronomic_tours.jpg",
    shortDesc: "Отправьтесь в уникальное путешествие на Новый год в Осетию, где традиции встречают современные праздники!",
    fullDesc: "Вас ждёт незабываемая атмосфера горного края, захватывающие зимние пейзажи и уникальная культура. В программе тура – встречи с местными жителями, которые поделятся своими осетинскими обычаями и кулинарными секретами. Традиционные новогодние блюда и мастер-классы подарят вам море эмоций и впечатлений. Тур включает в себя экскурсии по историческим местам и живописным уголкам Осетии, где каждая деталь погрузит вас в волшебство зимы. Создайте незабываемые воспоминания о праздниках в уникальной обстановке гор, где сбываются мечты, и дух веселья витает в воздухе!"
  },
  wellness: {
    title: "Оздоровительные поездки",
    image: "images/Wellness_trips.jpg",
    shortDesc: "Приглашаем вас в тур 'Целебные воды Кавказа', где природа дарит здоровье и радость!",
    fullDesc: "Откройте для себя уникальные минеральные источники, знаменитые на весь мир своими целебными свойствами. Вас ждёт расслабляющий отдых в современных курортах и спа-салонах, где вы сможете насладиться процедурами на основе природных вод. В программе тура – увлекательные экскурсии по живописным уголкам Кавказа, знакомство с местной культурой и традициями, а также возможность попробовать вкуснейшие блюда национальной кухни. Погрузитесь в атмосферу гармонии и оздоровления, вдохните чистый горный воздух и насладитесь великолепными пейзажами. Подарите себе здоровье и новые впечатления с туром 'Целебные воды Кавказа'!"
  }
};
/*Использование функции for in */
function renderTourismTypes() {
  /*Находим контейнер для карточек*/
  const carouselContainer = document.querySelector('.tipturisma .cards');
  carouselContainer.innerHTML = ''; 

  for (const type in tourismTypes) {
    if (tourismTypes.hasOwnProperty(type)) {
      const item = tourismTypes[type];
      const cardTemplate = `
        <li class="card">
          <img class="card__img" src="${item.image}" alt="${item.title}" width="100" height="150">
          <h3 class="card__title">${item.title}</h3>
          <p class="card__short-description">${item.shortDesc}</p>
          <p class="card__description" style="display:none">${item.fullDesc}</p>
        </li>
      `;
      carouselContainer.insertAdjacentHTML('beforeend', cardTemplate);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTourismTypes();
  // Создаем модальное окно для карточек
  const modal = document.createElement('div');
  modal.className = 'card-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modal.style.zIndex = '1000';
  modal.style.overflow = 'auto';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'card-modal-content';
  modalContent.style.display = 'flex';
  modalContent.style.maxWidth = '900px';
  modalContent.style.margin = '50px auto';
  modalContent.style.backgroundColor = '#fff';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '10px';
  modalContent.style.position = 'relative';
  
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.position = 'absolute';
  closeBtn.style.right = '20px';
  closeBtn.style.top = '10px';
  closeBtn.style.fontSize = '28px';
  closeBtn.style.cursor = 'pointer';
  
  const imgContainer = document.createElement('div');
  imgContainer.style.flex = '0 0 40%';
  imgContainer.style.paddingRight = '20px';
  
  const textContainer = document.createElement('div');
  textContainer.style.flex = '1';
  
  const modalImg = document.createElement('img');
  modalImg.style.width = '100%';
  modalImg.style.height = 'auto';
  modalImg.style.borderRadius = '5px';
  
  const modalTitle = document.createElement('h3');
  modalTitle.style.marginTop = '0';
  
  const modalDescription = document.createElement('p');
  
  imgContainer.appendChild(modalImg);
  textContainer.appendChild(modalTitle);
  textContainer.appendChild(modalDescription);
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(imgContainer);
  modalContent.appendChild(textContainer);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Закрытие модального окна
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Обработчик клика для всех карточек
  function setupCardClickHandler(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      // Для разных типов карточек используем разные селекторы
      const imgElement = card.querySelector('.card__img, .card__img-nap, .card__img-events');
      const titleElement = card.querySelector('.card__title');
      const descriptionElement = card.querySelector('.card__description');
      
      if (imgElement && titleElement && descriptionElement) {
        modalImg.src = imgElement.src;
        modalImg.alt = titleElement.textContent;
        modalTitle.textContent = titleElement.textContent;
        modalDescription.textContent = descriptionElement.textContent;
        
        modal.style.display = 'block';
      }
    });
  }

  // Обработка всех каруселей на странице
  const carouselContainers = document.querySelectorAll('.section');

  carouselContainers.forEach(carouselContainer => {
    const cardsContainer = carouselContainer.querySelector('.cards');
    const prevButton = carouselContainer.querySelector('.arrows__button-prev');
    const nextButton = carouselContainer.querySelector('.arrows__button-next');
    const cards = cardsContainer ? cardsContainer.querySelectorAll('.card') : [];

    if (!cardsContainer || !prevButton || !nextButton || cards.length === 0) {
      console.warn('Не найдены элементы карусели в:', carouselContainer);
      return;
    }

    const cardWidth = cards[0].offsetWidth;
    const cardMarginRight = parseInt(window.getComputedStyle(cards[0]).marginRight);
    let scrollPosition = 0;

    function scrollForward() {
      const maxScrollLeft = cardsContainer.scrollWidth - cardsContainer.offsetWidth;
      const cardFullWidth = cardWidth + cardMarginRight;
      if (scrollPosition < maxScrollLeft) {
        scrollPosition += cardFullWidth;
        cardsContainer.scroll({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }

    function scrollBackward() {
      const cardFullWidth = cardWidth + cardMarginRight;
      if (scrollPosition > 0) {
        scrollPosition -= cardFullWidth;
        cardsContainer.scroll({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }

    nextButton.addEventListener('click', scrollForward);
    prevButton.addEventListener('click', scrollBackward);

    function updateButtonsVisibility() {
      const maxScrollLeft = cardsContainer.scrollWidth - cardsContainer.offsetWidth;
      prevButton.disabled = scrollPosition <= 0;
      nextButton.disabled = scrollPosition >= maxScrollLeft;
    }

    updateButtonsVisibility();

    cardsContainer.addEventListener('scroll', () => {
      scrollPosition = cardsContainer.scrollLeft;
      updateButtonsVisibility();
    });

    // Обработчик клика по карточкам
    cards.forEach(setupCardClickHandler);
  });

  // Обработка карточек вне каруселей (если такие есть)
  const standaloneCards = document.querySelectorAll('.card:not(.section .card)');
  standaloneCards.forEach(setupCardClickHandler);
});