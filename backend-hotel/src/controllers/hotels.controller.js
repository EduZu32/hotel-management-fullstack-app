const Hotel = require("../models/hotel.model");

const getHotels = (req, res) => {
  Hotel.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const getHotelById = (req, res) => {
  Hotel.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0] || {});
  });
};

const createHotel = (req, res) => {
  Hotel.create(req.body, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

const updateHotel = (req, res) => {
  Hotel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Hotel actualizado" });
  });
};

const deleteHotel = (req, res) => {
  Hotel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Hotel eliminado" });
  });
};

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};
