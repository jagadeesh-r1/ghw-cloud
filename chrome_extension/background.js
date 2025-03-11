chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Reminder!',
      message: `It's time to: ${alarm.name}`,
      priority: 1
    });
  
    // Remove reminder from storage
    chrome.storage.local.get(['reminders'], (result) => {
      const reminders = result.reminders.filter(r => r.text !== alarm.name);
      chrome.storage.local.set({ reminders });
    });
  });
  