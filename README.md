# Metric-Imperial Converter
------

Metric and imperial converter app. Powered by [Express](https://www.npmjs.com/package/express), secured with [Helmet](https://www.npmjs.com/package/helmet) and tested with [Mocha](https://www.npmjs.com/package/mocha) & [Chai](https://www.npmjs.com/package/chai).

## How it works
It converts...
* gallons to liters;
* pounds to kilograms;
* miles to kilometers.

...and vice versa.

You can use fractions, decimals or both but if nothing is provided it will default to 1.

## Tests
21 tests (16 unit tests and 5 functional tests). Set `NODE_ENV=test` to enable them.

## Errors
* 'invalid unit': the unit of measurement is invalid;
* 'invalid number': the number is invalid;
* 'invalid number and unit': both are invalid.

## Example usage:
* /api/convert?input=4gal
* /api/convert?input=1/2km
* /api/convert?input=5.4/3lbs
* /api/convert?input=kg

## Example return:
`{initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'}`


