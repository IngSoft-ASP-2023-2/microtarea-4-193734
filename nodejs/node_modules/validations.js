function validatePurchase(cardNumber) {
    cardNumber = cardNumber.replace(/\D/g, '');

    const visaRegex = /^4\d{12}(\d{3})?$/;

    const mastercardRegex = /^[5|2]\d{15}$/;

    return visaRegex.test(cardNumber) || mastercardRegex.test(cardNumber);
}

module.exports = {
    validatePurchase
};