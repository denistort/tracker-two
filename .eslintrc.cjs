module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		jest: true,
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-tabs': 'off',
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'no-console': 'error',
	},
};
