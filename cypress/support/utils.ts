export class Utils {

    assertViaText (elementInsert, elementAssert) {
        elementInsert.invoke('text').then(text => {
            expect(text).to.include(elementAssert);
        });
    } // takes in the web element and asserts on its text context

    assertViaVal (elementInsert, elementAssert) {
        elementInsert.invoke('val').then(text => {
            expect(text).to.include(elementAssert);
        });
    } // takes in the web element and asserts on its value context
}

export function isLubeMobile () {
    return Cypress.config().baseUrl === Cypress.env('lubeMobile');
}

export function isLubemobile() {
    const currentUrl = Cypress.config().baseUrl;
    return currentUrl.includes('lm');
}

export function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    return `test+${randomString}@wrench.com`;
}

export function addHoursToNow(hoursToAdd) {
    const date = new Date();
    date.setHours(date.getHours() + hoursToAdd);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

export function addDaysToToday(days) {
    const today = new Date();
    today.setDate(today.getDate() + days);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${mm}/${dd}/${yyyy}`;
}

export function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

export function clickRetry(apiCall, button, maxAttempts = 3) {
    let attempts = 0;

    function clickAndCheck() {
        button.click();
        cy.avgWait()
        cy.get(apiCall).then((xhr) => {
            if (!xhr !== apiCall) {
                attempts++;
                if (attempts < maxAttempts) {
                    clickAndCheck();
                } else {
                    throw new Error('Backend call not made after maximum attempts');
                }
            }
        });
    }
    clickAndCheck();
}