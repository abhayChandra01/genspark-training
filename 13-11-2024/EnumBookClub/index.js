var BookGenre;
(function (BookGenre) {
    BookGenre["FICTION"] = "FICTION";
    BookGenre["NON_FICTION"] = "NON_FICTION";
    BookGenre["MYSTERY"] = "MYSTERY";
    BookGenre["SCIENCE_FICTION"] = "SCIENCE_FICTION";
    BookGenre["BIOGRAPHY"] = "BIOGRAPHY";
    BookGenre["FANTASY"] = "FANTASY";
})(BookGenre || (BookGenre = {}));
var MemberRole;
(function (MemberRole) {
    MemberRole["ORGANIZER"] = "ORGANIZER";
    MemberRole["MODERATOR"] = "MODERATOR";
    MemberRole["MEMBER"] = "MEMBER";
    MemberRole["GUEST"] = "GUEST";
})(MemberRole || (MemberRole = {}));
// Function to filter books by genre
function getBooksByGenre(books, genre) {
    return books.filter(function (book) { return book.genre === genre; });
}
// Function to filter members by role
function getMembersByRole(members, role) {
    return members.filter(function (member) { return member.role === role; });
}
// Function to count books by genre
function countBooksByGenre(books) {
    var _a;
    var genreCount = (_a = {},
        _a[BookGenre.FICTION] = 0,
        _a[BookGenre.NON_FICTION] = 0,
        _a[BookGenre.MYSTERY] = 0,
        _a[BookGenre.SCIENCE_FICTION] = 0,
        _a[BookGenre.BIOGRAPHY] = 0,
        _a[BookGenre.FANTASY] = 0,
        _a);
    books.forEach(function (book) {
        genreCount[book.genre]++;
    });
    return genreCount;
}
var books = [
    { title: "Book 1", author: "Author 1", genre: BookGenre.FICTION },
    { title: "Book 2", author: "Author 2", genre: BookGenre.SCIENCE_FICTION },
    { title: "Book 3", author: "Author 3", genre: BookGenre.NON_FICTION },
    { title: "Book 4", author: "Author 4", genre: BookGenre.FANTASY },
    { title: "Book 5", author: "Author 5", genre: BookGenre.FICTION },
];
var members = [
    { name: "Alice", role: MemberRole.ORGANIZER },
    { name: "Bob", role: MemberRole.MEMBER },
    { name: "Charlie", role: MemberRole.MODERATOR },
    { name: "Dave", role: MemberRole.MEMBER },
];
console.log(getBooksByGenre(books, BookGenre.FICTION));
console.log(getMembersByRole(members, MemberRole.MEMBER));
console.log(countBooksByGenre(books));
