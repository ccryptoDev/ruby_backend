const Helper = {
  formatToDollar: (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  },

  //** check, validate */
  validateEmail: (email) => {
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexp.test(email);
  },

  validatePhoneNumber: (phoneNumber) => {
    const regexp = /^[\+]?[0-9]{0,3}[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,6}[-\s\.]?[0-9]{3,6}$/;
    return regexp.test(phoneNumber);
  },

  validateSSN: (ssn) => {
    var patt = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
    return patt.test(ssn);
  }
};

export default Helper;
