module.exports = {
  apps: [{
    script: './index.js',
    watch: '.'
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'reactor/production',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
