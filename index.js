function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || []
  const list = document.querySelector('#list')

  expenses.forEach((exp) => {
    const liItem = createExpenseItem(exp)
    list.appendChild(liItem)
  })
}

function createExpenseItem(exp) {
  const liItem = document.createElement('li')
  liItem.classList.add(
    'list-group-item',
    'text-light',
    'bg-dark',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  )
  liItem.setAttribute('data-id', exp.id)
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
            `

  // Delete functionality
  liItem.querySelector('#delete').addEventListener('click', function () {
    const list = document.querySelector('#list')
    list.removeChild(liItem)
    removeExpenseFromLocalStorage(exp.id)
  })

  // Edit functionality
  liItem.querySelector('#edit').addEventListener('click', function () {
    document.querySelector('#amount').value = exp.amount
    document.getElementById('description').value = exp.description
    document.getElementById('category').value = exp.category

    const list = document.querySelector('#list')
    list.removeChild(liItem)
    removeExpenseFromLocalStorage(exp.id)
  })

  return liItem
}

function removeExpenseFromLocalStorage(id) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || []
  expenses = expenses.filter((item) => item.id !== id)
  localStorage.setItem('expenses', JSON.stringify(expenses))
}

function handleFormSubmit(event) {
  // To prevent default form submission
  event.preventDefault()

  const amount = document.querySelector('#amount').value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value

  // Generate a unique ID for each item
  const id = Date.now() // Using timestamp as a unique ID
  const liItem = document.createElement('li')
  liItem.classList.add(
    'list-group-item',
    'text-light',
    'bg-dark',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  )
  liItem.setAttribute('data-id', id) // Set the unique ID as a data attribute

  const obj = { id, amount, description, category } // Include the ID in the object
  let expenses = JSON.parse(localStorage.getItem('expenses')) || []
  expenses.push(obj)
  localStorage.setItem('expenses', JSON.stringify(expenses))

  const list = document.querySelector('#list')
  const newItem = createExpenseItem(obj)
  list.appendChild(newItem)

  // Clear the input fields
  document.querySelector('#amount').value = ''
  document.getElementById('description').value = ''
  document.getElementById('category').value = ''
}

// Load expenses on page load
document.addEventListener('DOMContentLoaded', loadExpenses)
