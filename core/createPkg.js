const createPkg = (name) => {
  return {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'nodemon --watch src --ext ts --exec tsx src/server.ts',
    },
  };
};

export default createPkg;
