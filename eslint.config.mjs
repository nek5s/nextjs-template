import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		rules: {
			indent: ["error", "tab"],
			quotes: ["error", "double", { avoidEscape: true }]
		}
	},
	globalIgnores([
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	])
]);

export default eslintConfig;
