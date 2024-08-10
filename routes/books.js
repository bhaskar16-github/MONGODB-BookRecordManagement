const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

//Get All Books
router.get("/",(req,res)=>{
  res.status(200).json({
    success: true,
    message: "The All books are..",
    data: books,
  });
});

// Get Books by Id
router.get("/:id",(req,res)=>{
  const { id } = req.params;

  const book = books.find((each) => each.id === id);
    
  if (!book)
    return res.status(404).json({
  success: false,
  message: "Book not Found..!",
});
  return res.status(200).json({
    success: true,
    message: "The book is...",
    data: book
  });
});

// Get Issued books by User
router.get("/issued/byUser",(req,res)=>{
  const usersWithIssuedBook =users.filter((each)=>{
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  
    usersWithIssuedBook.forEach((each) =>{
      const book = books.find((book) => book.id === each.issuedBook );

      book.issuedBy = each.name;
      book.issuedDate = each.issuedDate;
      book.returnDate = each.returnDate;

      issuedBooks.push(book);

    });
    if (issuedBooks.length === 0)
      return res.status(404).json({
    success: false,
    message : "No issued books now..!",
    
  });
  return res.status(200).json({
    success: true,
    message: "Issued book found..",
    data: issuedBooks,
  });
}) ;

// post method 1 for books

// router.post("/", (req, res) => {
//   const { id, name, author, genre, price, publisher, } =
//     req.body;

//   const book = books.find((each) => each.id === id);

//   if (book) {
//     return res.status(404).json({
//       success: false,
//       message: "This book alreadry exist",
//     });
//   }

//   books.push({
//     id,
//     name,
//     author,
//     genre,
//     price,
//     publisher,
//   });

//   return res.status(201).json({
//     success: true,
//     message: "Successfully added Book..",
//     data: books,
//   });
// });

// post method 2 for books

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data Was Provided",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book already exists with the same Id",
    });
  }

  const allBooks = [...books, data];

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});

//Put Method in for updating Books

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book not found with this Id",
    });
  }
  const UpdatedData = books.map((each) => {
    if (each.id === id) {
      return { 
        ...each, 
        ...data   // Spread operator
       };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedData,
  });
});

module.exports = router;