const addForm = document.getElementById('addForm');
const products = document.getElementById('products');
const searchForm = document.getElementById('searchForm');
const container = document.querySelector('.container');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);
  const response = await fetch('/register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    window.location.href = 'http://localhost:3000';
  } else {
    registerForm.insertAdjacentHTML('beforeend', `
    <p class="mt-3">Такой логин уже существует</p>
    `);
  }
});

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);
  const response = await fetch('/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    window.location.href = 'http://localhost:3000';
  } else {
    loginForm.insertAdjacentHTML('beforeend', `
    <p class="mt-3">Неверный логин или пароль</p>
    `);
  }
});

addForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/new', {
    method: 'post',
    body: new FormData(addForm),
  });
  window.location.href = 'http://localhost:3000';
});

container?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    const div = document.getElementById(`div-${id}`);
    // console.log(li)
    const response = await fetch(`/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      div.remove();
    }
  }
  if(e.target.dataset.update) {
    const id = e.target.dataset.update;
    const div = document.getElementById(`div-${id}`);
    div.insertAdjacentHTML('beforeend', `
      <div class="mt-3 mb-3">
        <input type="text" name="name" id="productChange" class="form-control" placeholder="Название продукта">
      </div>
      <div class="d-flex justify-content-center mt-2">
        <button type="click" class="btn btn-outline-success">Изменить продукт</button>
      </div>
      `)
    const input = document.getElementById('productChange');
    console.log(input.value)
    // const response = await fetch(`/${id}`);

  }
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (e.target) {
    const input = document.getElementById('productName');
    const response = await fetch('/search', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: `${input.value}`,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      products.remove();
      container.insertAdjacentHTML('beforeend', result.map(({
        id, image, name, ...rest
      }) => {
        console.log(rest);
        return `  
        <div class="product d-flex flex-column-reverse">
          <div class="p-2 d-flex justify-content-center">
          <div class="products mb-0 mt-0 bg-light" id="div-${id}">
            <img src=${image} alt="product" class="productImg">
            <h6 class="text-success">${name}</h6>
            <p class="text-muted comment-text">${rest.Category.name}</p>
            <button class="btn btn-secondary btn-sm delete-button" type="click" data-delete=${id}>Съесть</button></li>
          </div>
        </div>
      </div>
    `;
      }).join(''));
    }
  }
});

// addProduct.addEventListener('click', async (e) => {
//   e.preventDefault();
//   const response = await fetch('/addProduct');
//   const result = await response.json();
//   console.log(result);
//   if (response.ok) {
//     console.log(result);
//     products.remove();
//     const mapString = result.map(({ id, name }) => `<option value=${id}>${name}</option>`).join('');
//     container.insertAdjacentHTML('beforeend', `
//          <div class="d-flex justify-content-center mt-3 addForm">
//     <form id="addForm" name="placemark">
//       <h4>Добавить продукт</h4>
//       <div class="mt-3 mb-3">
//         <input type="text" name="name" id="productName" class="form-control" placeholder="Название продукта">
//       </div>

//       <div class="input-group mb-3">
//         <label class="input-group-text" for="inputGroupSelect01">Категория</label>
//         <select class="form-select" id="productCategory" name="category_id" >
//         <option selected>Выбери категорию</option>
//         ${mapString}
//       </select>
//       </div>

//       <div class="mb-3">
//         <input type="file" name="image" id="productImage" class="form-control" placeholder="image">
//       </div>

//       <div class="d-flex justify-content-center mt-2">
//         <button type="submit" class="btn btn-outline-success">Добавить продукт</button>
//       </div>

//     </form>
//   </div> `);
//   }
// });
