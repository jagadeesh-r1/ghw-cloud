document.getElementById('set-reminder').addEventListener('click', () => {
    const reminderText = document.getElementById('reminder').value;
    const timeInMinutes = parseInt(document.getElementById('time').value);
  
    if (reminderText && timeInMinutes > 0) {
      const reminderTime = Date.now() + timeInMinutes * 60 * 1000;
      const reminder = { text: reminderText, time: reminderTime };
  
      chrome.storage.local.get(['reminders'], (result) => {
        const reminders = result.reminders || [];
        reminders.push(reminder);
        chrome.storage.local.set({ reminders });
  
        // Set Chrome alarm
        chrome.alarms.create(reminder.text, { when: reminderTime });
        displayReminders();
      });
    }
  });
  
  function displayReminders() {
    chrome.storage.local.get(['reminders'], (result) => {
      const reminderList = document.getElementById('reminder-list');
      reminderList.innerHTML = '';
  
      (result.reminders || []).forEach(reminder => {
        const listItem = document.createElement('li');
        listItem.textContent = `${reminder.text} in ${(reminder.time - Date.now()) / 60000} min`;
        reminderList.appendChild(listItem);
      });
    });
  }
  
  displayReminders();
  