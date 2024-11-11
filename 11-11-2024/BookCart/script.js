const books = [
  {
    id: 1,
    title: "Book No. 1",
    price: 150,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
  {
    id: 2,
    title: "Book No. 2",
    price: 999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
  {
    id: 3,
    title: "Book No. 3",
    price: 750,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
  {
    id: 4,
    title: "Book No. 4",
    price: 560,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
  {
    id: 5,
    title: "Book No. 5",
    price: 999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
  {
    id: 6,
    title: "Book No. 6",
    price: 750,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
  {
    id: 7,
    title: "Book No. 7",
    price: 560,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
  {
    id: 8,
    title: "Book No. 8",
    price: 560,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3xqtTCbqrptM0iHpUBRgustsH-EOVRYTfA&s",
  },
];

let cart = [];

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
};

const displayBooks = () => {
  const bookContainer = document.getElementById("bookContainer");
  bookContainer.innerHTML = "";

  books.map((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", book.image);
    bookCard.appendChild(bookImage);

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    const bookPrice = document.createElement("p");
    bookPrice.textContent = `Rs. ${book.price.toFixed(2)}`;
    bookCard.appendChild(bookPrice);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className = "add-to-cart-button";
    addToCartButton.onclick = () => addToCart(book);
    bookCard.appendChild(addToCartButton);

    bookContainer.appendChild(bookCard);
  });
};

const addToCart = (book) => {
  const existingItem = cart.find((item) => item.id === book.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...book, quantity: 1 });
  }
  updateCart();
};

const updateCart = () => {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartItems.innerHTML = "";

  let totalPrice = 0;
  cart.map((item) => {
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const itemText = document.createElement("span");
    itemText.textContent = item.title;
    cartItem.appendChild(itemText);

    const controlContainer = document.createElement("div");
    controlContainer.style.display = "flex";
    controlContainer.style.alignItems = "center";
    controlContainer.style.gap = "5px";

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.onclick = () => decrementQuantity(item.id);
    controlContainer.appendChild(decrementButton);

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = ` ${item.quantity} `;
    controlContainer.appendChild(quantityDisplay);

    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.onclick = () => incrementQuantity(item.id);
    controlContainer.appendChild(incrementButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = () => removeFromCart(item.id);
    deleteButton.style.background = "none";
    deleteButton.style.border = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.fontSize = "16px";
    deleteButton.style.width = "20px";
    deleteButton.style.display = "flex";
    deleteButton.style.justifyContent = "center";
    deleteButton.style.alignItems = "center";
    controlContainer.appendChild(deleteButton);

    cartItem.appendChild(controlContainer);
    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = totalPrice.toFixed(2);
  saveCartToLocalStorage();
};

const incrementQuantity = (bookId) => {
  const book = cart.find((item) => item.id === bookId);
  if (book) {
    book.quantity++;
    updateCart();
  }
};

const decrementQuantity = (bookId) => {
  const book = cart.find((item) => item.id === bookId);
  if (book) {
    if (book.quantity > 1) {
      book.quantity--;
    } else {
      cart = cart.filter((item) => item.id !== bookId);
    }
    updateCart();
  }
};

const removeFromCart = (bookId) => {
  cart = cart.filter((item) => item.id !== bookId);
  updateCart();
};

const emptyCart = () => {
  cart = [];
  updateCart();
};

document.getElementById("cartButton").addEventListener("click", () => {
  const cartPopover = document.getElementById("cartPopover");
  cartPopover.style.display =
    cartPopover.style.display === "block" ? "none" : "block";
});

document.getElementById("emptyCartButton").addEventListener("click", emptyCart);

loadCartFromLocalStorage();
displayBooks();
updateCart();
