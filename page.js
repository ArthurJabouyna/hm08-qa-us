module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardNumberField: '#number',
    cardCodeField: '#code.card-input',
    messageDriverField: '#comment',
    planPhonePaymentMessageField:'.workflow-subcontainer',
    iceCreamNumberField:".counter-value",
    driverNumberField: ".order-number",
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div=Supportive',
    paymentMethodButton : '//div[contains(@class, "pp-button filled")]',
    addCardButton : '//div[contains(@class, "pp-row disabled")]',
    linkButton : 'div.pp-buttons > button.button.full[type="submit"]',
    cardAddedButton : '.checkbox#card-1',
    otherElement : 'body',
    blanketCheckbox : '//div[@class="r-sw"]',
    blanketButtonStatus: '.switch-input',
    addIceCreamButton : '.counter-plus',
    orderButton : '.smart-button-wrapper',
    // Modals
    phoneNumberModal: '.modal',
    cardModal : '.card-wrapper',
    carSearchModal: '.order-body',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportivePlan: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        return supportiveButton;
    },

    openCardModal: async function() {
        const paymentMethodButton = await $(this.paymentMethodButton); 
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardModal = await $(this.cardModal);
        await cardModal.waitForDisplayed();
    },

    submitCardInformation: async function(cardNumber, cardCode) {
        const creditCardNumberField = await $(this.creditCardNumberField);
        await creditCardNumberField.waitForDisplayed();
        await creditCardNumberField.setValue(cardNumber);
        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.waitForDisplayed()
        await cardCodeField.setValue(cardCode);
        const otherElement = await $(this.otherElement); 
        await otherElement.click(); 
        const linkButton = await $(this.linkButton); 
        await linkButton.waitForClickable();
        await linkButton.click();
        const cardAddedButon= await $(this.cardAddedButton);
        await cardAddedButon.waitForExist({ timeout: 20000 });
    },

    sendMessageToDriver: async function() {
        const messageDriverField = await $(this.messageDriverField);
        await messageDriverField.scrollIntoView();
        await messageDriverField.waitForExist();
        await messageDriverField.setValue('get some water please'); 
    },

    orderBlanketHandkerchiefs: async function() {
        const blanketCheckbox = await $(this.blanketCheckbox);
        await blanketCheckbox.scrollIntoView();
        await blanketCheckbox.waitForDisplayed();
        await blanketCheckbox.click();
     },

     orderIceCreams: async function() {
        const addIceCreamButton = await $(this.addIceCreamButton);
        await addIceCreamButton.scrollIntoView();
        await addIceCreamButton.waitForDisplayed();
        await addIceCreamButton.click();
        await addIceCreamButton.click();
        const iceCreamNumberField = await $(this.iceCreamNumberField);
        await iceCreamNumberField.waitForDisplayed();
     },

     openCarSearchModal: async function() {
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForExist();
     },

     showDriverInfo: async function() {
        const driverNumberField = await $(this.driverNumberField);
        await driverNumberField.waitForExist({timeout: 400000});
     }

    
}