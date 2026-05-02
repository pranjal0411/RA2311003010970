const axios = require('axios');

async function Log(stack, level, pkg, message, token) {
  try {
    const response = await axios.post(
      'http://20.207.122.201/evaluation-service/logs',
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    console.error('Error in logger:', error.message);
  }
}

module.exports = { Log };
