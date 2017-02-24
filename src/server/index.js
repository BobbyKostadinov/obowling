import express from 'express';
import path from 'path';

const  app = express();

app.use('/dist', express.static('dist'))

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'));
})

app.listen(3000, function () {
  console.log('OBowling app listening on dport 3000!')
})

module.exports = app;
