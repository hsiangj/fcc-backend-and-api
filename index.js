var express = require('express');
var cors = require('cors');
const multer  = require('multer')

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: './views/uploads' })
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
  try {
    const { originalname, mimetype, size} = req.file;
    return res.json({
      name: originalname,
      type: mimetype,
      size
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file' });
  } 
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
