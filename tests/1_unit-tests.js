const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {

    test("Whole number input", function (done) {
        let input='32L';
        assert.equal(convertHandler.getNum(input),32);
        done();
    });

    test("Decimal number input", function (done) {
        let input='3.2L';
        assert.equal(convertHandler.getNum(input),3.2);
        done();
    });

    test("Fractional number input", function (done) {
        let input='3/2L';
        assert.equal(convertHandler.getNum(input),1.5);
        done();
    });

    test("Fractional decimal number input", function (done) {
        let input='3.2/2L';
        assert.equal(convertHandler.getNum(input),1.6);
        done();
    });

    test("Double fraction number input", function (done) {
        let input='3/2/2L';
        assert.isUndefined(convertHandler.getNum(input),"is undefined");
        done();
    });

    test("No number input", function (done) {
        let input='L';
        assert.equal(convertHandler.getNum(input),1);
        done();
    });

  });

  suite("Function convertHandler.getUnit(input)", function () {

    test("Each Valid Unit", function (done) {
        let input=["gal", "l", "mi", "km", "lbs", "kg","gAl", "L", "mI", "Km", "lBs", "kG"];
        let output=["gal", "l", "mi", "km", "lbs", "kg", "gal", "l", "mi", "km", "lbs", "kg"]
        input.forEach(function(ele, index){
            assert.equal(convertHandler.getUnit(ele),output[index]); 
            done();
        });
        
    });

    test("Invalid unit input", function (done) {
        let input='Lbdg';
        assert.isUndefined(convertHandler.getUnit(input),"is undefined");
        done();
    });

  });

  suite("Function convertHandler.getReturnUnit(input)", function () {

    test("Each Valid Unit", function (done) {
        let input=["gal", "l", "mi", "km", "lbs", "kg"];
        let output=["L", "gal", "km", "mi", "kg", "gal"]
        input.forEach(function(ele, index){
            assert.equal(convertHandler.getReturnUnit(ele),output[index]);
            done();
        });
        
    });
  });

  suite("Function convertHandler.spellOutUnit(input)", function () {
    
    test("Each Valid Unit spelled", function (done) {
        let input=["gal", "L", "mi", "km", "lbs", "kg"];
        let expect=["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]
        input.forEach(function(ele, index){
            assert.equal(convertHandler.spellOutUnit(ele),expect[index]);
        });
        done();
    });
  });

  suite("Function convertHandler.convert(initNum, initUnit)", function () {
    
    test("gal to L", function (done) {
        assert.approximately(convertHandler.convert(2,"gal"),2*3.78541,0.1);
        done();
    });

    test("L to gal", function (done) {
        assert.approximately(convertHandler.convert(2,"L"),0.52834,0.1);
        done();
    });

    test("mi to k", function (done) {
        assert.approximately(convertHandler.convert(2,"mi"),2*1.60934,0.1);
        done();
    });

    test("km to mi", function (done) {
        assert.approximately(convertHandler.convert(2,"km"),1.24275,0.1);
        done();
    });

    test("lbs to kg", function (done) {
        assert.approximately(convertHandler.convert(2,"lbs"),0.90718,0.1);
        done();
    });

    test("kg to lbs", function (done) {
        assert.approximately(convertHandler.convert(2,"kg"),4.40925,0.1);
        done();
    });
  });

});
