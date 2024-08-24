document.addEventListener('DOMContentLoaded', () => {
    const timeForm = document.getElementById('time-form');
    const activityInput = document.getElementById('activity-input');
    const hoursInput = document.getElementById('hours-input');
    const activityList = document.getElementById('activity-list');
    const totalHoursSpan = document.getElementById('total-hours');

    const loadEntries = () => {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        let totalHours = 0;
        entries.forEach(entry => {
            addEntryToDOM(entry);
            totalHours += entry.hours;
        });
        totalHoursSpan.textContent = totalHours.toFixed(1);
    };

    const saveEntries = (entries) => {
        localStorage.setItem('entries', JSON.stringify(entries));
    };

    const addEntryToDOM = (entry) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${entry.activity} - ${entry.hours} hours</span>
            <button class="delete">Delete</button>
        `;
        activityList.appendChild(li);

        // Delete entry
        li.querySelector('.delete').addEventListener('click', () => {
            removeEntry(entry.id);
        });
    };

    const addEntry = (e) => {
        e.preventDefault();
        const activity = activityInput.value.trim();
        const hours = parseFloat(hoursInput.value.trim());

        if (activity === '' || isNaN(hours) || hours <= 0) return;

        const entry = {
            id: Date.now(),
            activity,
            hours
        };

        const entries = getEntries();
        entries.push(entry);
        saveEntries(entries);
        addEntryToDOM(entry);

        // Update total hours
        const totalHours = parseFloat(totalHoursSpan.textContent);
        totalHoursSpan.textContent = (totalHours + hours).toFixed(1);

        activityInput.value = '';
        hoursInput.value = '';
    };

    const getEntries = () => {
        return JSON.parse(localStorage.getItem('entries')) || [];
    };

    const removeEntry = (entryId) => {
        const entries = getEntries().filter(entry => entry.id !== entryId);
        saveEntries(entries);
        activityList.innerHTML = '';
        let totalHours = 0;
        entries.forEach(entry => {
            addEntryToDOM(entry);
            totalHours += entry.hours;
        });
        totalHoursSpan.textContent = totalHours.toFixed(1);
    };

    timeForm.addEventListener('submit', addEntry);

    loadEntries();
});