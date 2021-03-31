// DO YOUR MAGIC
const router = require('express').Router();
const ExpressError = require('./expressError')
const mw = require('./cars-middleware')
const Cars = require('./cars-model.js')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Cars.getAll());
    } catch (err) {
        next(new ExpressError(err, 500));
    }
})

router.get('/:id', mw.checkCarId, async (req, res, next) => {
    res.status(200).json(req.car);
})

router.post('/', mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique,
    async (req, res, next) => {
        try {
            const newCar = await Cars.create(req.body);
            res.status(201).json(newCar);
        } catch (err) {
            res.json(new ExpressError(err, 500))
        }
    })

router.use((err, req, res, next) => {
    res.status(500).json({
        message: 'something went wrong inside the cars router',
        errMessage: err.message,
    })
})

module.exports = router;