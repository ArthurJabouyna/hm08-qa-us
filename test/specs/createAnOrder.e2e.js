const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    
    it('should set the address', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    });

    it('should select the Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const isPlanSelected = await page.isSupportiveButtonSelected();
        await expect(isPlanSelected).toBe(true);
    });

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    });

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard();
        const creditCardNumberField = $(page.creditCardNumberField);
        await expect(creditCardNumberField).toBeExisting();
    });

    it('should save the card information', async() => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard();
        await page.submitCardInformation('123456788765', '123')
        const cardAddedButon= await $(page.cardAddedButton);
        await cardAddedButon.waitForExist();
        await expect(cardAddedButon).toBeExisting();
    });

    it.only('write a message for driver', async() => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const messageDriverField= await $(page.messageDriverField);
    await expect(messageDriverField).toHaveValue('get some water please');

    })
})