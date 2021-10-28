module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
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
	settings: {
		react: {
			version: "999.999.999",
		},
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
				moduleDirectory: ["node_modules", "src/"],
			},
		},
	},
	plugins: [
		'react','import'
	],
	rules: {
		// "semi": ["error", "always"],
		// "linebreak-style": ["off"],
		// "indent": ["error", "tab"],
		// "space-before-function-paren": ["error", "never"],
		// "no-tabs": ["error", { allowIndentationTabs: true }],
		// "no-unused-vars": ["error", { "varsIgnorePattern": "PropTypes" }],
		// "no-trailing-spaces": ["error", { "skipBlankLines": true }],
		// "quotes": ["error", "double"],
		// "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		// "react/self-closing-comp": ["error", {
		// 	"component": false,
		// 	"html": false
		// }],
		// "react/jsx-indent": ["error", "tab"],
		// "react/jsx-indent-props": ["error", 'tab'],
		// "react/jsx-closing-bracket-location": [1, 'after-props'],
		// "react/jsx-max-props-per-line": ["error", { "maximum": 1}],
		// // "react/jsx-first-prop-new-line": ["error", "never"],
		// "react/jsx-first-prop-new-line": ["error", "multiline"],
		// "react/require-default-props": ["error", { forbidDefaultForRequired: false}],
		// "import/no-unresolved": ["off"],
		// "import/prefer-default-export": ["off"],



		semi: ["error"],
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		"linebreak-style": ["off"],
		"global-require": ["off"],
		"max-len": ["error", { code: 350 }],
		"space-before-function-paren": ["error", "never"],
		"no-undef": ["off"],
		"no-shadow": ["off"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		"no-console": [process.env.NODE_ENV === "production" ? "error" : "off"],
		"no-unused-vars": [process.env.NODE_ENV === "production" ? "error" : "off", { varsIgnorePattern: "PropTypes" }],
		"no-trailing-spaces": ["error", { skipBlankLines: true }],
		"no-use-before-define": ["off"],
		"no-underscore-dangle": ["off"],
		"no-debugger": ["off"],
		"no-restricted-syntax": ["off"],
		"no-redeclare": "off",
		"guard-for-in": ["off"],
		"import/extensions": [
			"error",
			"never",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
				scss: "always",
			},
		],
		"import/no-unresolved": ["off"],
		"import/prefer-default-export": ["off"],
		"import/no-extraneous-dependencies": ["off"],
		"jsx-a11y/click-events-have-key-events": ["off"],
		"jsx-a11y/label-has-associated-control": ["off"],
		"jsx-a11y/control-has-associated-label": ["off"],
		"jsx-a11y/no-static-element-interactions": ["off"],
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", "tab"],
		"react/jsx-closing-bracket-location": [1, "after-props"],
		"react/jsx-max-props-per-line": ["off"],
		"react/jsx-first-prop-new-line": ["error", "never"],
		"react/no-array-index-key": ["off"],
		"react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
		"react/self-closing-comp": ["error", {
			component: false,
			html: false,
		}],
		"react/prop-types": ["off"],
		"react/require-default-props": ["off"],
		"react/jsx-props-no-spreading": ["off"],
		"@typescript-eslint/no-use-before-define": ["error"],
		"@typescript-eslint/ban-types": ["off"],
		"@typescript-eslint/no-unused-vars": [process.env.NODE_ENV === "production" ? "error" : "off"],
		"@typescript-eslint/no-redeclare": ["error"],
	}
};
