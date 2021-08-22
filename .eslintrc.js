module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'react','import'
	],
	rules: {
		"linebreak-style": ["off"],
		"indent": ["error", "tab"],
		"space-before-function-paren": ["error", "never"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		"no-unused-vars": ["error", { "varsIgnorePattern": "PropTypes" }],
		"no-trailing-spaces": ["error", { "skipBlankLines": true }],
		"quotes": ["error", "double"],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"react/self-closing-comp": ["error", {
			"component": false,
			"html": false
		}],
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", 'tab'],
		"react/jsx-closing-bracket-location": [1, 'after-props'],
		"react/jsx-max-props-per-line": ["off"],
		"react/jsx-first-prop-new-line": ["error", "never"],
		"react/require-default-props": ["error", { forbidDefaultForRequired: false}]
		"import/no-unresolved": ["off"],
		"import/prefer-default-export": ["off"],
	}
};
