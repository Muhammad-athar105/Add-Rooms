const Room = require('../models/Room');

const index = async (req, res) => {
  try {
    let rooms = await Room.find({});
    return res.status(200).json({ status: 200, data: rooms, message: 'Room Listing' });
  } catch (e) {
    return res.status(500).json({ status: 500, data: [], message: e.message });
  }
};

const create = async (req, res) => {
  try {
    let room = new Room(req.body);
    await room.save();
    return res.status(200).json({ status: 200, data: room, message: 'Room has been added.' });
  } catch (e) {
    return res.status(500).json({ status: 500, data: [], message: e.message });
  }
};

const edit = async (req, res) => {
  try {
    let room = await Room.findOne({ _id: req.params.id });
    return res.status(200).json({ status: 200, data: room, message: 'Edit Room.' });
  } catch (e) {
    return res.status(500).json({ status: 500, data: [], message: e.message });
  }
};

const update = async (req, res) => {
  try {
    let room = await Room.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.status(200).json({ status: 200, data: room, message: 'Room has been updated.' });
  } catch (e) {
    return res.status(500).json({ status: 500, data: [], message: e.message });
  }
};

const destroy = async (req, res) => {
  try {
    let room = await Room.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 200, data: room, message: 'Room has been deleted.' });
  } catch (e) {
    return res.status(500).json({ status: 500, data: [], message: e.message });
  }
};

module.exports = { index, create, edit, update, destroy };
