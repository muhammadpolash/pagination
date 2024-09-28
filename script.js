// Paginator class with added methods for First/Last and rendering the data
class Paginator {
  constructor(data, itemsPerPage) {
      this.data = data; // The array of data to paginate
      this.itemsPerPage = itemsPerPage; // Number of items per page
      this.totalPages = Math.ceil(data.length / itemsPerPage); // Total pages
      this.currentPage = 1; // Start from the first page
  }

  // Get the data for the current page
  getCurrentPageData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.data.slice(start, end);
  }

  // Navigate to a specific page
  goToPage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) {
          console.log(`Page number ${pageNumber} is out of range.`);
          return;
      }
      this.currentPage = pageNumber;
      this.render();
  }

  // Go to the next page
  nextPage() {
      if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.render();
      }
  }

  // Go to the previous page
  previousPage() {
      if (this.currentPage > 1) {
          this.currentPage--;
          this.render();
      }
  }

  // Go to the first page
  goToFirstPage() {
      this.currentPage = 1;
      this.render();
  }

  // Go to the last page
  goToLastPage() {
      this.currentPage = this.totalPages;
      this.render();
  }

  // Render the user data and pagination controls
  render() {
      const userListElement = document.getElementById('user-list');
      const pageInfoElement = document.getElementById('page-info');
      
      // Clear current list
      userListElement.innerHTML = '';
      
      // Display the current page data
      const currentPageData = this.getCurrentPageData();
      currentPageData.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = user;
          userListElement.appendChild(listItem);
      });
      
      // Update page info
      pageInfoElement.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
  }
}

// Sample user data
const users = [
  "Alice", "Bob", "Charlie", "David", "Eve",
  "Frank", "Grace", "Heidi", "Ivan", "Judy",
  "Ken", "Laura", "Mallory", "Nina", "Oscar"
];

// Create a paginator with 5 items per page
const paginator = new Paginator(users, 5);

// Initialize rendering on page load
window.onload = () => {
  paginator.render();
};

// Event listeners for pagination controls
document.getElementById('first-page').addEventListener('click', () => paginator.goToFirstPage());
document.getElementById('prev-page').addEventListener('click', () => paginator.previousPage());
document.getElementById('next-page').addEventListener('click', () => paginator.nextPage());
document.getElementById('last-page').addEventListener('click', () => paginator.goToLastPage());
