let homePage = require('../pages/homepage')

describe('Calculator Demo', function(){
    
    it('Division Test', function(){
        
        homePage.getUrl('https://juliemr.github.io/protractor-demo/')
        homePage.firstNumber_input('10')
        homePage.optionSelect('DIVISION')
        homePage.secondNumber_input('2')
        homePage.clickGo()
        homePage.verifyResults('5')
        browser.sleep(2000)
    })

    it('Multiplication Test', function(){
        
        homePage.getUrl('https://juliemr.github.io/protractor-demo/')
        homePage.firstNumber_input('5')
        homePage.optionSelect('MULTIPLICATION')
        homePage.secondNumber_input('2')
        homePage.clickGo()
        homePage.verifyResults('10')
        browser.sleep(2000)
    })

    it('Addition Test', function(){
        
        homePage.getUrl('https://juliemr.github.io/protractor-demo/')
        homePage.firstNumber_input('2')
        homePage.secondNumber_input('3')
        homePage.clickGo()
        homePage.verifyResults('5')
        browser.sleep(2000)
    })

    it('Subtraction Test', function(){
        
        homePage.getUrl('https://juliemr.github.io/protractor-demo/')
        homePage.firstNumber_input('3')
        homePage.optionSelect('SUBTRACTION')
        homePage.secondNumber_input('2')
        homePage.clickGo()
        homePage.verifyResults('1')
        browser.sleep(2000)
    })

});