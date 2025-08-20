module.exports = {
  apps: [
    {
      name: "frontend_academia",
      cwd: __dirname,
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      instances: 1,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "30s",
      exp_backoff_restart_delay: 2000,
      watch: true,
    },
  ],
};
