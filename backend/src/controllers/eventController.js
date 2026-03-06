import Event from '../models/Event.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllEvents = async (req, res) => {
  try {
    const { status, eventType } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (eventType) filter.eventType = eventType;

    const events = await Event.find(filter)
      .populate('participants', 'name email')
      .sort({ startDate: -1 });
    return res.status(200).json(new ApiResponse(200, events, 'Events retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('participants', 'name email');
    if (!event) {
      return res.status(404).json(new ApiError(404, 'Event not found'));
    }
    return res.status(200).json(new ApiResponse(200, event, 'Event retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    await event.populate('participants', 'name email');
    return res.status(201).json(new ApiResponse(201, event, 'Event created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('participants', 'name email');
    if (!event) {
      return res.status(404).json(new ApiError(404, 'Event not found'));
    }
    return res.status(200).json(new ApiResponse(200, event, 'Event updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json(new ApiError(404, 'Event not found'));
    }
    return res.status(200).json(new ApiResponse(200, {}, 'Event deleted successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
