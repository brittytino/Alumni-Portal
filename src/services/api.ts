
const API_BASE_URL = 'http://localhost/alumni-api';

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events.php`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
