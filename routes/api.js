var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3')
var dbfileName = "./test.db"


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/tasks_index', function(req, res) {
    var db = new sqlite3.Database( dbfileName )
    var items = []
    db.serialize(function() {
        db.all('SELECT id,title, content FROM tasks order by id desc;', function(err, rows) {
            rows.forEach( function (item) {
                items.push(item  );
            });
            var param = {"docs": items };
            res.json(param);
        });
    });
    db.close();
});
/******************************** 
* 
*********************************/
router.post('/tasks_new', (req, res) => {
    var ret_arr = {ret:0, msg:""}
    try{
        var data = req.body
        //console.log(data )
        //res.json(data);
            var db = new sqlite3.Database( dbfileName )
            var items = []
            db.serialize(function() {
                var stmt = db.prepare('INSERT INTO tasks (title, content) VALUES (?, ?)')
                stmt.run(data.title, data.content )
                stmt.finalize()
                res.json(data);
            });
            db.close();
    } catch (e) {
        console.log(e);
        ret_arr.msg = e
        res.json(ret_arr);        
    }    
}); 
/******************************** 
* 
*********************************/
router.get('/tasks_show/:id', function(req, res) {
    var db = new sqlite3.Database( dbfileName )
    var items = []
    var sql = "SELECT id,title, content FROM tasks where id="+req.params.id
// console.log(sql);
    db.serialize(function() {
        db.all(sql, function(err, rows) {
           var param = {"docs": rows };
            res.json(param);
        });
    });
    db.close();
});
/******************************** 
* 
*********************************/
router.post('/tasks_update', (req, res) => {
    var ret_arr = {ret:0, msg:""}
    try{
        var data = req.body
        console.log(req.body )    
        var db = new sqlite3.Database( dbfileName )
        db.serialize(function() {
            var stmt = db.prepare('update tasks set title= ?, content =? where id= ?')
            stmt.run(data.title, data.content ,req.body.id)
            stmt.finalize()
            res.json(data);
        });
        db.close();
    } catch (e) {
        console.log(e);
        ret_arr.msg = e
        res.json(ret_arr);        
    }
});
/******************************** 
* 
*********************************/
router.get('/tasks_delete/:id', function(req, res) {
    var db = req.db;
    var db = new sqlite3.Database( dbfileName )
    db.serialize(function() {
        var stmt = db.prepare('delete from tasks  where id= ?')
        stmt.run(req.params.id )
        stmt.finalize()   
        res.json({id : req.params.id})
    });
    db.close();
});

/******************************** 
* 
*********************************/
router.post('/test1', (req, res) => {
    var ret_arr = {ret:0, msg:""}
    try{
        var data = req.body
        console.log(data )    
        res.json( data )
    } catch (e) {
        console.log(e);
        ret_arr.msg = e
        res.json(ret_arr);        
    }
});

module.exports = router;
