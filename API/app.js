//*******************************Description Express*************************************************/
const express = require('express');

const app = express();
//********************Get Method***********************/
app.get('/', (req, res) => {
  //res.status(200).send("Hello from the server side!");
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

//********************Post Method***********************/
app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const port = '3000';
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
//*******************************Description API*************************************************/
const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//********************Get Method---All Tours***********************/
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});
//********************Get Method--One Tour***********************/
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  //if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

//********************Post Method***********************/
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

//********************Patch Method***********************/
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

//********************Delete Method***********************/
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//********************************************/
const port = '3000';
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
