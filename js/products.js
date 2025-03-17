// Product Filtering
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const searchInput = document.getElementById('search');
const productCards = document.querySelectorAll('.product-card');

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    productCards.forEach(card => {
        const category = card.dataset.category;
        const price = parseFloat(card.dataset.price);
        const title = card.querySelector('h3').textContent.toLowerCase();
        
        let categoryMatch = selectedCategory === 'all' || category === selectedCategory;
        let priceMatch = true;
        
        // Price range filtering
        if (selectedPrice !== 'all') {
            const [min, max] = selectedPrice.split('-').map(num => num === '+' ? Infinity : parseFloat(num));
            priceMatch = price >= min && (max === Infinity || price <= max);
        }
        
        // Search term filtering
        const searchMatch = title.includes(searchTerm);
        
        // Show/hide based on all filters
        if (categoryMatch && priceMatch && searchMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    updatePagination();
}

// Event listeners for filters
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Pagination
const itemsPerPage = 6;
let currentPage = 1;
const prevButton = document.querySelector('.prev-page');
const nextButton = document.querySelector('.next-page');
const pageNumbers = document.querySelector('.page-numbers');

function updatePagination() {
    const visibleProducts = Array.from(productCards).filter(card => card.style.display !== 'none');
    const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);
    
    // Update page numbers
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        if (i === currentPage) span.classList.add('active');
        span.addEventListener('click', () => goToPage(i));
        pageNumbers.appendChild(span);
    }
    
    // Show/hide products for current page
    visibleProducts.forEach((product, index) => {
        const shouldShow = Math.floor(index / itemsPerPage) + 1 === currentPage;
        product.style.display = shouldShow ? 'block' : 'none';
    });
    
    // Update button states
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function goToPage(page) {
    currentPage = page;
    updatePagination();
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
});

nextButton.addEventListener('click', () => {
    const visibleProducts = Array.from(productCards).filter(card => card.style.display !== 'none');
    const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
});

// Initialize pagination
updatePagination();

// Sort Products
function sortProducts(criteria) {
    const productsArray = Array.from(productCards);
    const productsContainer = document.querySelector('.products-grid');
    
    productsArray.sort((a, b) => {
        if (criteria === 'price-low') {
            return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        } else if (criteria === 'price-high') {
            return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        } else if (criteria === 'name') {
            return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
        }
    });
    
    productsContainer.innerHTML = '';
    productsArray.forEach(product => productsContainer.appendChild(product));
    updatePagination();
}

// Add sort functionality if there's a sort dropdown
const sortSelect = document.createElement('select');
sortSelect.id = 'sort-filter';
sortSelect.innerHTML = `
    <option value="">Sort By</option>
    <option value="price-low">Price: Low to High</option>
    <option value="price-high">Price: High to Low</option>
    <option value="name">Name</option>
`;

document.querySelector('.filters').appendChild(sortSelect);
sortSelect.addEventListener('change', (e) => sortProducts(e.target.value)); 