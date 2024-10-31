import type { NextApiRequest, NextApiResponse } from 'next';
import { WebSocket } from 'ws';

// Store active WebSocket connections
const connections = new Set<WebSocket>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Verify the request is from Google
    // Process the notification
    // Notify all connected clients
    connections.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'google_fit_update',
          timestamp: Date.now()
        }));
      }
    });
    
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 