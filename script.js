document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');
      const target = button.getAttribute('data-target');

      console.log(`Button clicked: ${filterValue}, Target: ${target}`);

      const list = document.querySelector(`.${target}-list`);
      if (!list) {
        console.error(`List for target ${target} not found.`);
        return;
      }

      const items = list.querySelectorAll(`.${target}`);
      const sortingType = document.querySelector(`#${target}-sorting-type`);
      
      if (sortingType) {
        sortingType.textContent = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
      } else {
        console.error(`Sorting type element for ${target} not found.`);
      }

      items.forEach(item => {
        const role = item.getAttribute('data-role');
        console.log(`Item role: ${role}, Filter value: ${filterValue}`);

        if (filterValue === 'all' || role === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const sections = ['character', 'weapons', 'traps', 'item', 'zones', 'misc'];
  
  sections.forEach(section => {
    const list = document.querySelector(`.${section}-list`);
    const items = list.querySelectorAll(`.${section}`);
    const showMoreButton = document.createElement('button');
    showMoreButton.classList.add('show-more-button');
    showMoreButton.textContent = 'Show More';
    
    if (items.length > 10) {
      items.forEach((item, index) => {
        if (index >= 10) {
          item.style.display = 'none';
        }
      });
      list.appendChild(showMoreButton);
    }

    showMoreButton.addEventListener('click', () => {
      const isExpanded = showMoreButton.textContent === 'Show Less';
      items.forEach((item, index) => {
        if (index >= 10) {
          item.style.display = isExpanded ? 'none' : 'block';
        }
      });
      showMoreButton.textContent = isExpanded ? 'Show More' : 'Show Less';
      list.appendChild(showMoreButton);
    });
  });

  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    sections.forEach(section => {
      const list = document.querySelector(`.${section}-list`);
      const items = list.querySelectorAll(`.${section}`);
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const role = item.getAttribute('data-role').toLowerCase();
        if (text.includes(query) || role.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
