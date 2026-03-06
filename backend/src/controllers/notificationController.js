import Notification from '../models/Notification.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { isRead } = req.query;
    const filter = { userId };

    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, notifications, 'Notifications retrieved'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json(new ApiError(404, 'Notification not found'));
    }
    return res.status(200).json(new ApiResponse(200, notification, 'Notification marked as read'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notification.updateMany({ userId }, { isRead: true });
    return res.status(200).json(new ApiResponse(200, {}, 'All notifications marked as read'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json(new ApiError(404, 'Notification not found'));
    }
    return res.status(200).json(new ApiResponse(200, {}, 'Notification deleted successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
