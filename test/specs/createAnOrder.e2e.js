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
        const supportiveTariff = await page.selectSupportivePlan();
        await expect(supportiveTariff.parentElement()).toHaveElementClass("active");
       
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

    it('should open credit card modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openCardModal();
        const cardModal = $(page.cardModal);
        await expect(cardModal).toBeExisting();
    });


    it('should save the card information', async() => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openCardModal();
        await page.submitCardInformation('123456788765', '123')
        const cardAddedButon= await $(page.cardAddedButton);
        await cardAddedButon.waitForExist();
        await expect(cardAddedButon).toBeExisting();
    });

    it('write a message for driver', async() => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.sendMessageToDriver('get some water please');
    const messageDriverField= await $(page.messageDriverField);
    await expect(messageDriverField).toHaveValue('get some water please');

    });

    it('should order a blanket and handkerchiefs', async() => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderBlanketHandkerchiefs();
        await expect($(page.blanketButtonStatus)).toBeChecked();   
    });

    it('should order 2 ice creams', async() => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderIceCreams();
        const iceCreamNumberField = await $(page.iceCreamNumberField);
        await expect(iceCreamNumberField).toHaveTextContaining('2');
    });

    it('should open the car search modal', async() => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openCarSearchModal();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    });

    it('should display driver information', async() => {
            await browser.url(`/`);
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.sendMessageToDriver('Get some water please')
            await page.openCarSearchModal();
            await page.showDriverInfo();
            const driverNumberField = await $(page.driverNumberField)
            await expect(driverNumberField).toBeExisting();
    });
})