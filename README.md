# Diet Recommendation System

## Configure the frontend backend URL

The frontend needs the public base URL of the deployed Express backend. Set
`VITE_APP_BACKEND_URL` to that API origin (for example,
`https://your-backend.example.com`), not to a hosting dashboard URL.

For local development, copy `Frontend/.env.example` to `Frontend/.env` and set
the URL to `http://localhost:5000`. For a Vercel deployment, add
`VITE_APP_BACKEND_URL` under the project's **Settings → Environment Variables**
and redeploy so Vite includes it in the frontend build. The backend must be
deployed and reachable separately.
