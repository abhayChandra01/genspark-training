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
    itemText.textContent = `${item.title} x${item.quantity}`;
    cartItem.appendChild(itemText);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(item.id);
    cartItem.appendChild(removeButton);

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = totalPrice.toFixed(2);
};

const removeFromCart = (bookId) => {
  cart = cart.filter((item) => item.id !== bookId);
  updateCart();
};

document.getElementById("cartButton").addEventListener("click", () => {
  const cartPopover = document.getElementById("cartPopover");
  cartPopover.style.display =
    cartPopover.style.display === "block" ? "none" : "block";
});

displayBooks();
