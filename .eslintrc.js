
module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@breautek/recommendedTypescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig-tests.json",
        "sourceType": "module",
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "@typescript-eslint",
        "@breautek"
    ],
    "env": {
        "node": true,
        "jasmine": true
    },
    "rules": {
        "require-jsdoc": [
            "off", {
                require: {
                    "MethodDefinition": true,
                    "ClassDeclaration": true,
                    "FunctionDeclaration": false,
                    "ArrowFunctionExpression": false,
                    "FunctionExpression": false
                }
            }
        ]
    }
};
