async function loadExpenses() {
  const list = document.querySelector('#list');
  list.innerHTML = '';

  try {
    const response = await axios.get('http://localhost:3000/home/expenses');
    const expenses = response.data.data;

    expenses.forEach((exp) => {
      const liItem = createExpenseItem(exp);
      list.appendChild(liItem);
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
}

function createExpenseItem(exp) {
  const liItem = document.createElement('li');
  liItem.classList.add(
    'list-group-item',
    'text-light',
    'bg-dark',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  );
  liItem.setAttribute('data-id', exp.id);
  liItem.innerHTML = `
                <span class="me-auto">
                    <strong>Amount:</strong> ${exp.amount} |
                    <strong>Description:</strong> ${exp.description} |
                    <strong>Category:</strong> ${exp.category}
                </span>
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-primary" id="edit">
                        <img src="assets/pen.svg" alt="Edit" style="width: 20px" />
                    </button>
                    <button type="button" class="btn btn-outline-danger" id="delete">
                        <img src="assets/trash3.svg" alt="Delete" style="width: 20px" />
                    </button>
                </div>
            `;

  // Delete functionality
  liItem.querySelector('#delete').addEventListener('click', function () {
    const list = document.querySelector('#list');
    list.removeChild(liItem);
    // console.log(exp.id);
    axios
      .post('http://localhost:3000/home/delete-expense', { id: exp.id })
      .then((res) => {
        console.log('Expense deleted:', res);
      })
      .catch((err) => {
        console.log('Error deleting expense:', err);
      });
  });

  // Edit functionality
  liItem.querySelector('#edit').addEventListener('click', function () {
    document.querySelector('#amount').value = exp.amount;
    document.getElementById('description').value = exp.description;
    document.getElementById('category').value = exp.category;

    const list = document.querySelector('#list');
    list.removeChild(liItem);
    removeExpenseFromLocalStorage(exp.id);
  });

  return liItem;
}

function removeExpenseFromLocalStorage(id) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses = expenses.filter((item) => item.id !== id);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const amount = document.querySelector('#amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  try {
    const response = await axios.post('http://localhost:3000/home', {
      amount,
      description,
      category,
    });

    const newExpense = response.data;

    // Add new expense to the DOM
    const list = document.querySelector('#list');
    const newItem = createExpenseItem(newExpense);
    list.appendChild(newItem);

    // Clear the input fields
    document.querySelector('#amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
  } catch (error) {
    console.error('Error saving expense:', error);
  }
}

// Load expenses on page load
document.addEventListener('DOMContentLoaded', loadExpenses);
