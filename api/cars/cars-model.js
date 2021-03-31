const db = require("../../data/db-config.js")

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('cars').where({id});
}

const create = async (car) => {
  // DO YOUR MAGIC
  const createdCar = await db('cars').insert(car);
  return {message : `New Car Created.`, car : getById(createdCar.id)}
}

module.exports = {
  getAll,
  getById,
  create
}