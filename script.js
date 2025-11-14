$(document).ready(function () {

    // === 1. Плавная прокрутка по навигации ===
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        $('html, body').animate({
            scrollTop: $(target).offset().top - 80
        }, 800);

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Активная ссылка при скролле
    $(window).on('scroll', function () {
        const scrollPos = $(window).scrollTop() + 100;
        $('.nav-link').each(function () {
            const section = $(this).attr('href');
            if ($(section).offset().top <= scrollPos && $(section).offset().top + $(section).outerHeight() > scrollPos) {
                $('.nav-link').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    // === 2. Переключение вкладок ===
    $('.tab-btn').on('click', function () {
        const tabId = $(this).data('tab');

        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        $('.tab-pane').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // === 3. Встроенные цитаты (без AJAX) ===
    const quotes = [
        {
            text: "Успех — это не ключ к счастью. Счастье — это ключ к успеху. Если вы любите то, что делаете, вы будете успешны.",
            author: "Альберт Швейцер"
        },
        {
            text: "Единственный способ делать отличную работу — любить то, что вы делаете.",
            author: "Стив Джобс"
        },
        {
            text: "Не бойтесь ошибок. Это доказательство того, что вы пытаетесь.",
            author: "Альберт Эйнштейн"
        },
        {
            text: "Будущее принадлежит тем, кто верит в красоту своих мечтаний.",
            author: "Элеонора Рузвельт"
        },
        {
            text: "Лучший способ предсказать будущее — создать его.",
            author: "Питер Друкер"
        }
    ];

    let currentQuoteIndex = -1;

    function showRandomQuote() {
        // Выбираем новую цитату (не повторяем предыдущую)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuoteIndex && quotes.length > 1);

        currentQuoteIndex = newIndex;

        const quote = quotes[currentQuoteIndex];
        $('.quote-text').fadeOut(200, function () {
            $(this).text(`«${quote.text}»`).fadeIn(300);
        });
        $('.quote-author').fadeOut(200, function () {
            $(this).text(`— ${quote.author}`).fadeIn(300);
        });
    }

    // Показываем первую цитату при загрузке
    showRandomQuote();

    // Кнопка "Обновить"
    $('#reload-quote').on('click', showRandomQuote);

    // === 4. Перетаскивание с jQuery UI ===
    $('.draggable-card').draggable({
        containment: '.draggable-container',
        cursor: 'move',
        opacity: 0.8,
        revert: 'invalid',
        start: function () {
            $(this).css('z-index', 1000);
        }
    });

    $('.draggable-container').droppable({
        accept: '.draggable-card',
        drop: function (event, ui) {
            ui.draggable.css('z-index', '');
        }
    });

});