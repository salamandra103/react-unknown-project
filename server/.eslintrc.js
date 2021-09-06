module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		"airbnb-base",
	],
	rules: {
		"max-len": ["error", { code: 250 }],
		"linebreak-style": ["off"],
		indent: ["error", "tab"],
		"space-before-function-paren": ["error", "never"],
		"no-debugger": ["off"],
		"no-shadow": ["off"],
		"no-tabs": ["error", {
			allowIndentationTabs: true,
		}],
		"no-console": [process.env.NODE_ENV === "production" ? "error" : "off"],
		"no-unused-vars": [process.env.NODE_ENV === "production" ? "error" : "off", { varsIgnorePattern: "PropTypes" }],
		"no-trailing-spaces": ["error", {
			skipBlankLines: true,
		}],
		quotes: ["error", "double"],
		"import/no-unresolved": ["off"],
		"import/prefer-default-export": ["off"],
		"import/no-extraneous-dependencies": ["error", {
			devDependencies: true,
			optionalDependencies: false,
			peerDependencies: false,
		}],
		"no-underscore-dangle": ["off"],
	},
};
