import pkg from './package.json';

const banner = `/* ${pkg.name} ${pkg.version} */`;
const footer = '/* Follow me on Twitter @f0rr0 */';
const name = (() => {
  const names = pkg.name.split('-');
  return names[0].concat(names.slice(1).map(str => str.charAt(0).toUpperCase() + str.slice(1)));
})();

export default {
  input: 'lib/index.js',
  output: [
    {
      name,
      file: pkg.browser,
      format: 'umd',
      banner,
      footer
    },
    {
      file: pkg.main,
      format: 'cjs',
      banner,
      footer
    },
    {
      file: pkg.module,
      format: 'es',
      banner,
      footer
    }
  ]
};
