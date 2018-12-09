var should = require ('should'),
    sinon = require ('sinon');

describe ('Book Controller Tests:',function(){
    describe('Post', function(){
        it('it should not allow an empty title on post',function(){
            var Book = function(book){
                this.save = function(){}
            }

            var req = {
                body:{
                    author:"Nital Shah"
                }
            }

            var res = {
                status:sinon.spy(),
                send:sinon.spy()
            }

            var bookController = require('../Controllers/bookController')(Book);

            bookController.post(req,res);

            res.status.calledWith(400).should.equal(true,'Bad Status ' + res.status.args[0][0]);

            res.send.calledWith('Title Required').should.equal(true);
        })

    })
})
