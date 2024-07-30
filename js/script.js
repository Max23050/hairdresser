document.addEventListener('DOMContentLoaded', function () {
    const categoryElems = document.querySelectorAll('.portfolio__categories-elem');
    const portfolioBlocks = document.querySelectorAll('.portfolio-block');

    categoryElems.forEach(elem => {
        elem.addEventListener('click', function () {
            // Удаляем класс активности со всех категорий
            categoryElems.forEach(cat => cat.classList.remove('category-active'));
            // Добавляем класс активности к текущей категории
            this.classList.add('category-active');

            // Получаем категорию, которая соответствует текущему элементу
            const category = this.getAttribute('data-category');

            // Скрываем все блоки портфолио
            portfolioBlocks.forEach(block => block.classList.remove('active-block'));
            // Показываем нужный блок портфолио
            document.querySelector(`.portfolio-${category}`).classList.add('active-block');
        });
    });

    const prevButtons = document.querySelectorAll('.portfolio__wrapper .prev-btn');
    const nextButtons = document.querySelectorAll('.portfolio__wrapper .next-btn');
    const prev = document.querySelectorAll('.reviews__wrapper .prev-btn');
    const next = document.querySelectorAll('.reviews__wrapper .next-btn');

    function updateDots(block, dots) {
        const totalDots = dots.length;
        const scrollLeft = block.scrollLeft;
        const maxScrollLeft = block.scrollWidth - block.clientWidth;
        const currentScrollPosition = (scrollLeft / maxScrollLeft) * (totalDots - 1);
        
        dots.forEach((dot, index) => {
            if (index <= currentScrollPosition) {
                dot.classList.add('dot-active');
            } else {
                dot.classList.remove('dot-active');
            }
        });
    }

    prevButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const parentBlock = this.closest('.portfolio-block');
            parentBlock.scrollBy({
                left: -300, // Регулируйте значение для управления шагом прокрутки
                behavior: 'smooth'
            });

            const dots = parentBlock.querySelectorAll('.dot');
            updateDots(parentBlock, dots);
        });
    });

    

    nextButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const parentBlock = this.closest('.portfolio-block');
            parentBlock.scrollBy({
                left: 300, // Регулируйте значение для управления шагом прокрутки
                behavior: 'smooth'
            });

            const dots = parentBlock.querySelectorAll('.dot');
            updateDots(parentBlock, dots);
        });
    });

    // Добавляем событие scroll для обновления точек при прокрутке
    portfolioBlocks.forEach(block => {
        block.addEventListener('scroll', function () {
            const dots = block.querySelectorAll('.dot');
            updateDots(block, dots);
        });
    });

    prev.forEach(btn => {
        btn.addEventListener('click', function () {
            const parentBlock = this.closest('.reviews__carousel');
            parentBlock.scrollBy({
                left: -300, // Регулируйте значение для управления шагом прокрутки
                behavior: 'smooth'
            });

            const dots = parentBlock.querySelectorAll('.dot');
            updateDots(parentBlock, dots);
        });
    });

    next.forEach(btn => {
        btn.addEventListener('click', function () {
            const parentBlock = this.closest('.reviews__carousel');
            parentBlock.scrollBy({
                left: 300, // Регулируйте значение для управления шагом прокрутки
                behavior: 'smooth'
            });

            const dots = parentBlock.querySelectorAll('.dot');
            updateDots(parentBlock, dots);
        });
    });

     // Добавляем событие scroll для обновления точек при прокрутке
    document.querySelector('.reviews__carousel').addEventListener('scroll', function () {
        const dots = document.querySelector('.reviews__carousel').querySelectorAll('.dot');
        updateDots(document.querySelector('.reviews__carousel'), dots);
    });

    document.querySelector('.fixed__languages-elem-mobile.language-active').addEventListener('click', function() {
        document.querySelector('.fixed__languages-mobile').classList.toggle('expanded');
    });

    document.addEventListener('click', function(e) {
        const languages = document.querySelector('.fixed__languages-mobile');
        if (!languages.contains(e.target)) {
            languages.classList.remove('expanded');
        }
    });

    // Функция для активации категории и открытия соответствующего блока
    function activateCategory(category) {
        const categoryElems = document.querySelectorAll('.portfolio__categories-elem');
        const portfolioBlocks = document.querySelectorAll('.portfolio-block');

        // Удаляем активный класс со всех категорий
        categoryElems.forEach(cat => cat.classList.remove('category-active'));
        // Добавляем активный класс к нужной категории
        const activeCategoryElem = document.querySelector(`.portfolio__categories-elem[data-category="${category}"]`);
        if (activeCategoryElem) {
            activeCategoryElem.classList.add('category-active');
            activeCategoryElem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }

        // Скрываем все блоки портфолио и показываем нужный
        portfolioBlocks.forEach(block => block.classList.remove('active-block'));
        const activeBlock = document.querySelector(`.portfolio-${category}`);
        if (activeBlock) {
            activeBlock.classList.add('active-block');
        }
    }

    // Добавляем обработчик на кнопку "Подробнее"
    const infoBtn = document.getElementById('scroll-to-portfolio');
    infoBtn.addEventListener('click', function () {
        // Прокрутка до блока портфолио
        const portfolioSection = document.querySelector('.portfolio');
        const offset = -100; // Регулируйте это значение для необходимого смещения
        const sectionPosition = portfolioSection.getBoundingClientRect().top + window.pageYOffset + offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });

        // Активация категории "Биозавивка"
        activateCategory('bio');
    });

    const headerHeight = document.querySelector('.fixedBlock').offsetHeight;
    const offset = 40; // Добавьте смещение, например, 20 пикселей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            var target = document.querySelector(this.getAttribute('href'));
            var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

});
