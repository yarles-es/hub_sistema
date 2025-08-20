module.exports = {
  apps: [
    {
      name: 'backend_ACADEMIA',
      script: './build/index.js',
      instances: 1,
      watch: ['./build'],
      autorestart: true,
      exp_backoff_restart_delay: 100,
      max_restarts: 10,
      min_uptime: '60s',
      watch_options: {
        usePolling: true,
        interval: 1000,
      },
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'postgresql://admin:mypassword@localhost:5432/academia_nova_meta',
        JWT_SECRET: 'ACADEMIA_SECRET',
        CATRACA_BASE_URL: 'http://localhost:5110/',
        CATRACA_WEBHOOK_URL: 'http://localhost:3000/api/catraca/webhook',
      },
    },
  ],
};
