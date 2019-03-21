'use strict';

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const indexWord    = input.indexOf( input.match(/[a-z]/i) );
    const checkNumber  = input.slice(0, indexWord);
    
    switch(true) {      
      case checkNumber === '':
        // No Numerical Input
        result = 1;
        break;
      case (checkNumber).match(/\//g) !== null && (checkNumber).match(/\//g).length >= 2 :
        // Invalid Input (double fraction)
        result = 'invalid number';
        break;
      case (checkNumber).match(/\//g) !== null && (checkNumber).match(/\//g).length === 1 :
        // Fractional Input
        // Fractional Input w/ Decimal
        result = checkNumber;
        break;
      default:
        // Whole number input
        // Decimal input
        result = Number(checkNumber);
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const indexWord  = input.indexOf( input.match(/[a-z]/i) );
    const checkUnit  = input.slice(indexWord, input.length);
    
    const unitValues = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    
    if(unitValues.indexOf(checkUnit) > -1) {
      result = checkUnit;
    } else {
      result = 'invalid unit';
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    const input = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    if( input[initUnit.toLowerCase()] === undefined ) {
      result = 'invalid unit';
    } else {
      result = input[initUnit.toLowerCase()];
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    const unitSpell = {
      'gal': 'gallon',
      'l': 'liter',
      'mi': 'mile',
      'km': 'kilometer',
      'lbs': 'pound',
      'kg': 'kilogram'
    }
    
    result = unitSpell[unit.toLowerCase()];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    if( (/\//g).test(initNum) ) {
      const splitFraction = initNum.split('/');
      initNum = Number(splitFraction[0]) / Number(splitFraction[1]);
    }
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = +(initNum * galToL).toFixed(5);
        break;
      case 'l':
        result = +(initNum / galToL).toFixed(5);
        break;
      case 'mi':
        result = +(initNum * miToKm).toFixed(5);
        break;
      case 'km':
        result = +(initNum / miToKm).toFixed(5);
        break;
      case 'lbs':
        result = +(initNum * lbsToKg).toFixed(5);
        break;
      case 'kg':
        result = +(initNum / lbsToKg).toFixed(5);
        break;
      default:
        result = 'invalid';
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    initUnit    = (initNum <= 1) ? this.spellOutUnit(initUnit) :  this.spellOutUnit(initUnit)+'s' ;
    returnUnit  = (returnNum <= 1) ? this.spellOutUnit(returnUnit) : this.spellOutUnit(returnUnit)+'s';
    
    result = initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
