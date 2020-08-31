import { v4 as uuid } from 'uuid';

export const openUrl = url =>
  chrome.tabs.create({ url });

export const createAlarm = (key, interval) =>
  chrome.alarms.create(
    key,
    { periodInMinutes: parseFloat(interval) }
  );

export const destroyAlarm = key =>
  chrome.alarms.clear(key);

export const onAlarm = (key, callback) =>
  chrome.alarms.onAlarm.addListener(ctx =>
    ctx.name === key
      ? callback()
      : undefined
  );

export const setBadgeText = (text, newCount) =>
  chrome.browserAction.setBadgeText({
    text: newCount
      ? `${newCount}`
      : ''
  });

export const setBadgeColor = color =>
  chrome.browserAction.setBadgeBackgroundColor({ color });

export const removeNotification = id =>
  chrome.notifications.clear(id);

export const clearNotifications = () =>
  chrome.notifications.getAll(notifications =>
    Object
      .keys(notifications)
      .map(removeNotification)
  );

export const createNotification = ({ title, message, contextMessage }) =>
  chrome.notifications.create(
    uuid(),
    {
      type: 'basic',
      iconUrl: './ico.png',
      title,
      message,
      contextMessage
    }
  );

export const onNotificationClick = callback =>
  chrome.notifications.onClicked.addListener(callback);
