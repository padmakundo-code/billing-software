// Random Joke Generator - Uses external API to fetch jokes
// API: https://official-joke-api.appspot.com/

const axios = require('axios');

const JOKE_API_BASE_URL = 'https://official-joke-api.appspot.com';

// Fetch a random joke
async function getRandomJoke() {
  try {
    const response = await axios.get(`${JOKE_API_BASE_URL}/random_joke`);
    return {
      type: response.data.type,
      setup: response.data.setup,
      punchline: response.data.punchline,
      id: response.data.id
    };
  } catch (error) {
    console.error('Error fetching random joke:', error.message);
    throw new Error('Failed to fetch joke from API');
  }
}

// Fetch a joke of specific type
async function getJokeByType(type) {
  try {
    const response = await axios.get(`${JOKE_API_BASE_URL}/jokes/${type}/random`);
    return {
      type: response.data[0].type,
      setup: response.data[0].setup,
      punchline: response.data[0].punchline,
      id: response.data[0].id
    };
  } catch (error) {
    console.error(`Error fetching ${type} joke:`, error.message);
    throw new Error(`Failed to fetch ${type} joke from API`);
  }
}

// Fetch multiple random jokes
async function getMultipleJokes(count = 5) {
  try {
    const response = await axios.get(`${JOKE_API_BASE_URL}/jokes/random/${count}`);
    return response.data.map(joke => ({
      type: joke.type,
      setup: joke.setup,
      punchline: joke.punchline,
      id: joke.id
    }));
  } catch (error) {
    console.error(`Error fetching ${count} jokes:`, error.message);
    throw new Error('Failed to fetch jokes from API');
  }
}

// Format joke for display
function formatJoke(joke) {
  return `${joke.setup}\n\n${joke.punchline}`;
}

// Get all available joke types
async function getAvailableJokeTypes() {
  try {
    const response = await axios.get(`${JOKE_API_BASE_URL}/types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching joke types:', error.message);
    throw new Error('Failed to fetch joke types from API');
  }
}

// Fetch joke by ID
async function getJokeById(id) {
  try {
    const response = await axios.get(`${JOKE_API_BASE_URL}/jokes/${id}`);
    return {
      type: response.data.type,
      setup: response.data.setup,
      punchline: response.data.punchline,
      id: response.data.id
    };
  } catch (error) {
    console.error(`Error fetching joke with ID ${id}:`, error.message);
    throw new Error('Failed to fetch joke from API');
  }
}

// Create a joke with custom setup and punchline
function createCustomJoke(setup, punchline) {
  return {
    type: 'custom',
    setup: setup,
    punchline: punchline,
    id: `custom_${Date.now()}`
  };
}

// Validate joke object
function isValidJoke(joke) {
  return joke && 
         typeof joke.setup === 'string' && 
         typeof joke.punchline === 'string' &&
         joke.setup.length > 0 && 
         joke.punchline.length > 0;
}

module.exports = {
  getRandomJoke,
  getJokeByType,
  getMultipleJokes,
  formatJoke,
  getAvailableJokeTypes,
  getJokeById,
  createCustomJoke,
  isValidJoke
};
