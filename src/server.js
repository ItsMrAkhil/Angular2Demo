var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));
app.use('/bundle', express.static(__dirname + '/bundle'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', function(err){
  if(err){
    return mongoose.connect("mongodb://angular:angular@ds013456.mlab.com:13456/koachr");
  }
});
var db = mongoose.connection;
mongoose.Promise = global.Promise;

var postSchema = mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
});
var Post = mongoose.model('Post', postSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    app.post('/api/post', function(req, res){
        Post.create(req.body, function(err, doc){
            if(err){
                console.log(err);
                return res.json({success: false});
            }
            res.json({success: true});
        })
    });

    app.get('/api/posts', function(req, res){
        var skip = parseInt(req.query.skip) || 0
        Post.find({}).skip(skip).limit(5).exec(function(err, allPosts){
            if(err){
                console.log(err);
                return res.json({success: false});
            }
            var posts = allPosts.map(function(post){
                return post.toObject();
            });
            Post.count({}, function(err, count){
                if (err){
                    console.log(err);
                    return res.json({success: false});
                }
                if(skip+5 >= count){
                    res.json({posts: posts});
                } else {
                    skip+=5;
                    res.json({posts: posts, next: "/api/posts?skip="+skip});
                }
            })
        })
    });
    
    app.get('/api/post/:id', function(req, res){
        Posts.findById(req.params.id, function(err, doc){
            if(err){
                console.log(err);
                return res.json({success: false});
            }
            resj.json(doc)
        });
    });

    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port '+app.get('port'));
    });
});


