const {UserModel, BookModel} = require("../models");

const IssuedBook = require("../dtos/book-dtos");

exports.getAllBooks = async (req,res)=>{
    const books = await BookModel.find();

    if(books.length === 0)
        return res.status(404).json({
            success: false,
            message: "No Book Found",
        });
        res.status(200).json({
            success: true,
            data: books,
        });
};

exports.getsingleBookById = async(req,res)=>{
    const { id } = req.params;
    const book = await BookModel.findById (id);

    if(!book)
        return res.status(404).json({
            success: false,
            message: "No Book Found with this Id",
        });
        res.status(200).json({
            success: true,
            data: book,
        });
};

exports.getIssuedAllBooks = async(req,res)=>{
    const users = await BookModel.find({
        issuedBook: {$exists: true},
    }).populate("issuedBook") //Push = populate

    const issuedBook = users.map((each)=> new IssuedBook(each));

    if(issuedBook.length === 0)
        return res.status(404).json({
            success: true,
            message: "No book has been issued",
        });
        res.status(200).json({
            success: true,
            data: issuedBook,
        });
};

exports.addNewBook = async(req,res)=> {
    const {data} = req.body;

    if(!data){
        return res.status(400).json({
            success: false,
            meesage: "No Data was Provided"
        });
    }
    await BookModel.create(data);

    const allBooks = await BookModel.find();

    res.status(200).json({
        success: true,
        data: allBooks,
    });
};

exports.updateBookById = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const updatedBook = await BookModel.findOneAndUpdate({_id:id},data, {
        new: true,
    });
    res.status(200).json({
        success: true,
        data: updatedBook,
    });
};


