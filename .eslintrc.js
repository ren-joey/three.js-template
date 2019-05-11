module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "airbnb-base"],
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": [
            "warn"
        ]
    }
};