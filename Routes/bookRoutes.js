var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    var bookController = require ('../Controllers/bookController')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            }
            else {
                res.start(404).send('book not found')
            }
        });
    });

    bookRouter.route('/:bookId')
        .get(function (req, res) {
            var returnBook = req.book.toJSON();
            returnBook.links = {};
            returnBook.links.FilterByThisGenre = encodeURI(req.protocol + '://' + req.headers.host + '/api/books/genre=' + returnBook.genre);
            res.json(returnBook);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var key in req.body) {
                req.book[key] = req.body[key];
            }
            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            })
            .delete(function(req,res){
                req.book.remove(function(err){
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(204).send('removed');
                    }
                });
            });
        });
    return bookRouter;
};

module.exports = routes;