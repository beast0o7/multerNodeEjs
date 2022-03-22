const express = require ('express');
const app = express();
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination:(req, file, cb ,err)=>{
        cb(err,'images')
    },
    filename:(req, file, cb,err)=>{
        cb(err, Date.now()+ path.extname(file.originalname))
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({storage:storage, fileFilter:fileFilter})


app.set('view engine','ejs');

app.get('/',(req, res)=>{
    res.redirect('/upload');
})

app.get('/upload',(req, res)=>{
    res.render('upload',{
        multi:false
    });
})

app.get('/upload/multi',(req, res)=>{
    res.render('upload',{
        multi:true
    });
})

app.post('/upload',upload.single('image'),(req, res)=>{
    console.log(upload);
    res.send('upload successfull')
});

app.post('/upload/multi',upload.array('image', 100),(req, res)=>{
        console.log(upload);
        res.send('upload successfull')
});

app.listen(5000,()=>{
})
console.log("server running on port 5000");