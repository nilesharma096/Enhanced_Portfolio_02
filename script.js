// Fetch JSON content dynamically for Achievements & Personal page lists
document.addEventListener("DOMContentLoaded", () => {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      // Load achievements
      const achList = document.getElementById('achievements-list');
      if (achList && data.achievements) {
        achList.innerHTML = data.achievements
          .map(item => `<li>${item}</li>`)
          .join('');
      }

      // Load personal info lists
      if (data.personal) {
        const hobbiesList = document.getElementById('hobbies-list');
        const roleModelsList = document.getElementById('rolemodels-list');
        const booksList = document.getElementById('books-list');
        const websitesList = document.getElementById('websites-list');

        if (hobbiesList)
          hobbiesList.innerHTML = data.personal.hobbies.map(h => `<li>${h}</li>`).join('');
        if (roleModelsList)
          roleModelsList.innerHTML = data.personal.roleModels.map(r => `<li>${r}</li>`).join('');
        if (booksList)
          booksList.innerHTML = data.personal.books.map(b => `<li>${b}</li>`).join('');
        if (websitesList)
          websitesList.innerHTML = data.personal.websites.map(w => `<li>${w}</li>`).join('');
      }
    })
    .catch(console.error);

  // Simple fade-in scroll animation for elements with data-animate
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedEls.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(el);
  });
});
