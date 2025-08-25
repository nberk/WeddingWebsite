exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get password from environment variable
    const correctPassword = process.env.WEBSITE_PASSWORD;
    
    if (!correctPassword) {
      console.error('WEBSITE_PASSWORD environment variable not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Parse the request body
    const { password } = JSON.parse(event.body);

    if (!password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Password is required' })
      };
    }

    // Check if password matches
    if (password === correctPassword) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ success: false })
      };
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};