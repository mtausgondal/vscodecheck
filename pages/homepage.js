let homePage = function(){

    // Objects
    let firstNumber_input = element(by.model('first'))
    let secondNumber_input =  element(by.model('second'))
    let goButton = element(by.css('[ng-click="doAddition()"]'))
    let allOptions = element.all(by.options('value for (key, value) in operators'));

    // Actions
    this.getUrl = function(url){
        browser.get(url);
    };

    this.firstNumber_input = function(firstNo) {
        firstNumber_input.clear().sendKeys(firstNo);
    };

    this.secondNumber_input = function(secondNo) {
        secondNumber_input.clear().sendKeys(secondNo);
    };

    this.allOptions = function(){
        allOptions.get()
    };

    this.clickGo = function() {
        goButton.click();
    };

    // Methods
    this.verifyResults = function(result){
        let output = element(by.cssContainingText('.ng-binding', result))
        expect(output.getText()).toEqual(result)
    };

    let SelectWrapper = function(selector) {
        this.webElement = element(selector);
    };
    SelectWrapper.prototype.getOptions = function() {
        return this.webElement.all(by.tagName('option'));
    };
    SelectWrapper.prototype.getSelectedOptions = function() {
        return this.webElement.all(by.css('option[selected="selected"]'));
    };
    SelectWrapper.prototype.selectByValue = function(value) {
        return this.webElement.all(by.css('option[value="' + value + '"]')).click();
    };
    SelectWrapper.prototype.selectByPartialText = function(text) {
        return this.webElement.all(by.cssContainingText('option', text)).click();   
    };
    SelectWrapper.prototype.selectByText = function(text) {
        return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();   
    };

    this.optionSelect = function(option){
        let mySelect = new SelectWrapper(by.css('[ng-model="operator"]'));
        mySelect.selectByValue(option);
    };
};

module.exports = new homePage()