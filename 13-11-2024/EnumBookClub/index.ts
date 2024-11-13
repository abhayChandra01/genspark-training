enum BookGenre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  MYSTERY = "MYSTERY",
  SCIENCE_FICTION = "SCIENCE_FICTION",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

enum MemberRole {
  ORGANIZER = "ORGANIZER",
  MODERATOR = "MODERATOR",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

type Book = {
  title: string;
  author: string;
  genre: BookGenre;
};

type Member = {
  name: string;
  role: MemberRole;
};

// Function to filter books by genre
function getBooksByGenre(books: Book[], genre: BookGenre): Book[] {
  return books.filter((book) => book.genre === genre);
}

// Function to filter members by role
function getMembersByRole(members: Member[], role: MemberRole): Member[] {
  return members.filter((member) => member.role === role);
}

// Function to count books by genre
function countBooksByGenre(books: Book[]): Record<BookGenre, number> {
  const genreCount: Record<BookGenre, number> = {
    [BookGenre.FICTION]: 0,
    [BookGenre.NON_FICTION]: 0,
    [BookGenre.MYSTERY]: 0,
    [BookGenre.SCIENCE_FICTION]: 0,
    [BookGenre.BIOGRAPHY]: 0,
    [BookGenre.FANTASY]: 0,
  };

  books.forEach((book) => {
    genreCount[book.genre]++;
  });

  return genreCount;
}

const books: Book[] = [
  { title: "Book 1", author: "Author 1", genre: BookGenre.FICTION },
  { title: "Book 2", author: "Author 2", genre: BookGenre.SCIENCE_FICTION },
  { title: "Book 3", author: "Author 3", genre: BookGenre.NON_FICTION },
  { title: "Book 4", author: "Author 4", genre: BookGenre.FANTASY },
  { title: "Book 5", author: "Author 5", genre: BookGenre.FICTION },
];

const members: Member[] = [
  { name: "Alice", role: MemberRole.ORGANIZER },
  { name: "Bob", role: MemberRole.MEMBER },
  { name: "Charlie", role: MemberRole.MODERATOR },
  { name: "Dave", role: MemberRole.MEMBER },
];

console.log(getBooksByGenre(books, BookGenre.FICTION));
console.log(getMembersByRole(members, MemberRole.MEMBER));
console.log(countBooksByGenre(books));
