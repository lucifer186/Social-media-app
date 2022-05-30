const express = require('express');
const mongoose = require('mongoose')
const helmet  = require('helmet');
const dotenv  = require('dotenv');
const morgan  = require('morgan');
const multer = require('multer')
const path = require('path')
const cors = require('cors')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const messageRoute = require('./routes/message')
const conversationRoute = require('./routes/conversation')

const app = express()

app.use(cors())

dotenv.config();
const port = process.env.PORT || 8800





app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }

})

const upload = multer({storage})
app.post("/api/upload", upload.single('file'), (req,res)=>{
    try{
   return res.status(200).json("file uploaded successfully")
    }catch(err){

    }
})

app.use('/api/user',userRoute )
app.use('/api/auth',authRoute )
app.use('/api/posts',postRoute )
app.use('/api/conversations',conversationRoute )
app.use('/api/messages', messageRoute )

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then((res) =>{
 app.listen(port,()=>{
     console.log(`server running on ${port}`)
 })
 console.log('Connected!!');
}).catch(err =>{
    console.log(err);
})