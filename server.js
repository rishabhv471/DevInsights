const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Utility function to log API responses
const logApiResponse = async (response, context) => {
  try {
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      // Clone the response to avoid consuming it
      const clonedResponse = response.clone();
      data = await clonedResponse.json();
      console.log(`${context} - Response data:`, JSON.stringify(data, null, 2));
    } else {
      const text = await response.clone().text();
      console.log(`${context} - Response text:`, text);
      try {
        // Try to parse as JSON anyway in case content-type is wrong
        data = JSON.parse(text);
      } catch (e) {
        // Not JSON, use text response
        data = { text };
      }
    }
    
    return data;
  } catch (error) {
    console.error(`Error parsing response for ${context}:`, error);
    return null;
  }
};

// Proxy endpoint for creating predictions
app.post('/api/predictions', async (req, res) => {
  try {
    console.log('Creating prediction with token:', req.headers.authorization ? 'Token provided' : 'No token');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    // Validate required fields
    if (!req.body.version) {
      return res.status(400).json({ error: 'Missing required field: version' });
    }
    
    if (!req.body.input) {
      return res.status(400).json({ error: 'Missing required field: input' });
    }
    
    // Make the API request
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    // Log detailed response information
    console.log('Replicate API response status:', response.status, response.statusText);
    console.log('Response headers:', JSON.stringify(Object.fromEntries([...response.headers]), null, 2));
    
    const data = await logApiResponse(response, 'Create prediction');
    
    if (!response.ok) {
      console.error('Error response from Replicate API:', data);
      console.error('Status code:', response.status);
      console.error('Status text:', response.statusText);
      return res.status(response.status).json({
        error: data.error || data.detail || 'Unknown error from Replicate API',
        status: response.status,
        details: data
      });
    }
    
    console.log('Prediction created successfully with ID:', data.id);
    res.json(data);
  } catch (error) {
    console.error('Error creating prediction:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Proxy endpoint for checking prediction status
app.get('/api/predictions/:id', async (req, res) => {
  try {
    console.log('Checking prediction status:', req.params.id);
    
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing prediction ID' });
    }
    
    const response = await fetch(`https://api.replicate.com/v1/predictions/${req.params.id}`, {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    
    // Log detailed response information
    console.log('Replicate API status check response status:', response.status, response.statusText);
    
    const data = await logApiResponse(response, 'Check prediction status');
    
    if (!response.ok) {
      console.error('Error response from Replicate API:', data);
      return res.status(response.status).json({
        error: data.error || data.detail || 'Unknown error from Replicate API',
        status: response.status,
        details: data
      });
    }
    
    console.log(`Prediction ${req.params.id} status:`, data.status);
    
    // Log more details based on status
    if (data.status === 'succeeded') {
      console.log('Prediction output:', JSON.stringify(data.output, null, 2));
    } else if (data.status === 'failed') {
      console.error('Prediction failed with error:', data.error);
    } else if (data.status === 'processing') {
      console.log('Prediction is still processing. Logs:', data.logs?.substring(0, 200) + '...');
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error checking prediction:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
  console.log(`Health check available at http://localhost:${port}/api/health`);
}); 