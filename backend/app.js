const express = require('express');
const bp = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// const userRouter = require('./routes/userRoutes');
// const postsRouter = require('./routes/postsRoutes');
// const commentRouter = require('./routes/commentRoutes');

const app = express();
mongoose.connect("mongodb+srv://lanxion:Theandre2131@cluster0-e3flj.mongodb.net/blockchain-dedup?retryWrites=true&w=majority",
                        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("mongoDB connection successful");
    })
    .catch(() => {
        console.log("mongoDB connection failed");
    });


//body-parser middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use('/files', express.static(path.join("files")));


//For enabling CORS
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );

    next();
});

// app.use('/posts', postsRouter);
// app.use('/user', userRouter);
// app.use('/comments', commentRouter);

module.exports = app;