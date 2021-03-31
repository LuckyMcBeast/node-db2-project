const _ = require("lodash");
const Cars = require('./cars-model.js');
const ExpressError = require('./expressError.js')
const vinValidator = require('vin-validator');


const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Cars.getById(req?.params?.id);
    if (car) {
      req.car = car;
      next();
    } else {
      next(new ExpressError('ID not Found', 404))
    }
  } catch (err) {
    next(new ExpressError('Server Error : ' + err.message, 500))
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newCar = req.body;
    const carKeys = _.keysIn(newCar)
    console.log(carKeys)

    const requiredKeys = ['vin', 'make', 'model', 'mileage'];
    let missing = [];


    for (let rKey in requiredKeys) {
      let appeared = false;

      for (let cKey in carKeys) {
        if (carKeys[cKey] === requiredKeys[rKey]) {
          appeared = true;
          break;
        }
      }

      if (appeared === false) {
        missing.push(requiredKeys[rKey])
      }

    }

    if(missing.length > 0){
      next(new ExpressError(`The following values are missing, but are required: ${missing}`, 400))
    } else {
      next()
    }

  } catch (err) {
    next(new ExpressError('Server Error : ' + err.message, 500))
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkVinValid")
  try {
    console.log(vinValidator.validate(req?.body?.vin))
    if (vinValidator.validate(req.body.vin)) {
      next()
    } else {
      next(new ExpressError('VIN Number is Invalid', 400))
    }
  } catch (err) {
    next(new ExpressError('Server Error : ' + err.message, 500))
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  console.log('UniqueVin')
  try {
    const doesVinExist = await Cars.getByVin(req?.body?.vin);
    if(!req?.params?.id){
      next()
    }
    else if (doesVinExist[0].id !== req?.params?.id) {
      next(new ExpressError('VIN already in use.', 400));
    }
    next()
    } catch (err) {
      next(new ExpressError('Server Error : ' + err.message, 500))
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}