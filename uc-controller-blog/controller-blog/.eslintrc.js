module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "es2021": true,
    },
    "extends": [
        "standard-with-typescript",
        "prettier",
        "plugin:@darraghor/nestjs-typed/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": ["tsconfig.build.json"],
        "ecmaVersion": "es2019",
        "sourceType": "module",
    },
    "plugins": [
        "@typescript-eslint",
        "@darraghor/nestjs-typed"
    ],
    "rules": {
        "indent": "off",
        "indent-legacy": ["error", 4, { "SwitchCase": 1 }],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "arrow-parens": [2, "as-needed"],
        "prefer-arrow-callback": [ "error", { "allowNamedFunctions": false, "allowUnboundThis": true } ],
        "switch-colon-spacing": ["error", {"after": true, "before": false}],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-debugger": "error",
        "no-console": "error",
        "new-cap": ["error", {
            "capIsNewExceptions": [
                "Module",
                "Controller",
                "Injectable",
                "InjectRepository",
                "Catch",
                "Get",
                "Post",
                "Put",
                "Delete",
                "MessagePattern",
                "Param",
                "Req",
                "ReqHeader",
                "Query",
                "Body",
                "Entity",
                "PrimaryColumn",
                "PrimaryGeneratedColumn",
                "Column",
                "IsString",
                "IsOptional",
                "IsBoolean",
                "IsEmail",
                "IsNotEmpty",
                "IsDateString",
                "IsInt",
                "Transform",
                "IsObject",
                "IsNumber",
                "ValidateNested",
                "Min",
                "Max",
                "Type",
                "IsArray",
                "ArrayMinSize",
                "ArrayMaxSize",
                "Length",
                "HttpCode",
                "IsDate",
                "IsEnum",
                "Inject",
                "EventPattern",
                "InjectQueue"
            ],
            "newIsCap": false
        }],

        // override configuration set by extending "eslint:recommended"
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "for-direction": "off",

        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": false,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": true,
                "FunctionExpression": true
            }
        }],
        "no-return-await": "off",
        "@typescript-eslint/return-await": "error",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@darraghor/nestjs-typed/controllers-should-supply-api-tags":"off",
        "@darraghor/nestjs-typed/api-method-should-specify-api-response":"off"
    },
};