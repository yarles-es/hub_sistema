module.exports = {
  apps: [
    {
      name: "erp_rhm_frontend",
      cwd: __dirname,
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      instances: 1,
      autorestart: true,
      max_restarts: 5,
      min_uptime: "30s",
      exp_backoff_restart_delay: 2000,
      watch: false,
    },
  ],
};
