document.addEventListener('DOMContentLoaded', function() {
      var track = document.querySelector('.carrusel-track');
      var prevBtn = document.querySelector('.carrusel-btn.prev');
      var nextBtn = document.querySelector('.carrusel-btn.next');

      if (track && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', function() {
          track.scrollBy({ left: 340, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', function() {
          track.scrollBy({ left: -340, behavior: 'smooth' });
        });
      }
    });