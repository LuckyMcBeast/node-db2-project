const db = require("../../data/db-config.js")

const getAll = async () => {
  // DO YOUR MAGIC
  console.log('getAll');
  return await db('cars');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('cars').where({id});
}

const getByVin = async vin => {
  return await db('cars').where({vin})
}

const create = async (car) => {
  // DO YOUR MAGIC
  return await db('cars').insert(car);
  //return {message : `New Car Created.`, car : getById(createdCar.id)}
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}