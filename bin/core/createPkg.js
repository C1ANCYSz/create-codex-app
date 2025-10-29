const createPkg = (name) => {
  return {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'nodemon --watch app.ts --watch server.ts --watch src --ext ts --exec tsx server.ts',
    },
    dependencies: { dotenv: '^16.3.1', 'codex-js-core': '1.0.0' },
    devDependencies: {
      '@types/express': '^5.0.3',
      '@types/node': '^24.7.1',
      nodemon: '^3.1.10',
      tsx: '^4.20.6',
      'ts-node-dev': '^2.0.0',
      typescript: '^5.9.3',
    },
  };
};

export default createPkg;
