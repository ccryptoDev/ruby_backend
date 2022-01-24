const INSTITUTIONS = {
    AMEX: {
        url: "https://www.americanexpress.com/"
    },
    PLAID: {
        url: "https://plaid.com/"
    },
    CHASE: {
        url: "https://www.chase.com/"
    },
    BARCLAYS: {
        url: "https://cards.barclaycardus.com/"
    },
    WELLS_FARGO: {
        url: "https://wellsfargo.com/"
    },
    BANK_OF_AMERICA: {
        url: "https://www.bankofamerica.com"
    },
    FIRSTREPUBLIC: {
        url: "https://www.firstrepublic.com/bankingonline"
    },
    US_BANK: {
        url: "https://www.usbank.com/online-mobile-banking.html"
    },
    CAPITAL_ONE: {
        url: "https://verified.capitalone.com/auth/signin"
    },
    NORDSTROM: {
        url: "https://www.nordstromcard.com/login"
    },
    MACYS: {
        url: "https://www.macys.com/my-credit/gateway/guest"
    },
    SUNTRUST: {
        url: "https://www.suntrust.com/personal-banking"
    },
    VENMO: {
        url: "https://venmo.com"
    },
    DISCOVER: {
        url: "https://portal.discover.com/customersvcs/universalLogin/ac_main"
    },
    FIDELITY: {
        url: "https://login.fidelityrewards.com/onlineCard/login.do"
    },
    CITIZENS_BANK: {
        url: "https://www3.citizensbankonline.com/efs/servlet/efs/login.jsp"
    },
    AMERICAN_EXPRESS: {
        url: "https://www.americanexpress.com/en-us/account/login"
    },
    PNC: {
        url: "https://www.pnc.com/en/personal-banking.html"
    },
    CITIBANK: {
        url: "https://online.citi.com/US/login.do"
    },
    UBER: {
        url: "https://cards.barclaycardus.com/?p=uber"
    },
    APPLE: {
        url: "https://card.apple.com/"
    },
    AMAZON: {
        url: "https://amazon.syf.com/login/"
    },
    COSTCO: {
        url: "https://online.citi.com"
    },
    NAVY_FED: {
        url: "https://www.navyfederal.org/"
    }
}

// Strings that could match to a plaid card account name
const KEYWORDS_TO_INSTITUTIONS = {
    "AMEX": INSTITUTIONS.AMEX,
    "AMERICAN EXPRESS": INSTITUTIONS.AMEX,
    "Schwab Platinum Card": INSTITUTIONS.AMEX,
    "Blue Cash Everyday": INSTITUTIONS.AMEX,
    "PLAID": INSTITUTIONS.PLAID,    // Testing Only
    "WELLS": INSTITUTIONS.WELLS_FARGO,
    "JPMCB": INSTITUTIONS.CHASE,
    "CHASE": INSTITUTIONS.CHASE,
    "BARCLAYS": INSTITUTIONS.BARCLAYS,
    "BANK OF AMERICA": INSTITUTIONS.BANK_OF_AMERICA,
    "BankAmerica": INSTITUTIONS.BANK_OF_AMERICA,
    "BOFA": INSTITUTIONS.BANK_OF_AMERICA,
    "FIRSTREPUBLIC": INSTITUTIONS.FIRSTREPUBLIC,
    "FRB": INSTITUTIONS.FIRSTREPUBLIC,
    "US BANK": INSTITUTIONS.FIRSTREPUBLIC,
    "CAPITAL ONE": INSTITUTIONS.CAPITAL_ONE,
    "CAPITAL": INSTITUTIONS.CAPITAL_ONE,
    "SavorOne": INSTITUTIONS.CAPITAL_ONE,
    "Venture": INSTITUTIONS.CAPITAL_ONE,
    "NORDSTROM": INSTITUTIONS.NORDSTROM,
    "MACYS": INSTITUTIONS.MACYS,
    "SCHWAB PLATINUM CARD": INSTITUTIONS.AMEX,
    "DISCOVER": INSTITUTIONS.DISCOVER,
    "QUICKSILVER": INSTITUTIONS.CAPITAL_ONE,
    "AMAZON PRIME": INSTITUTIONS.CHASE,
    "INK BUSINESS": INSTITUTIONS.CHASE,
    "SOUTHWEST RAPID": INSTITUTIONS.CHASE,
    "United Explorer": INSTITUTIONS.CHASE,
    "FlexPerks Travel Rewards Visa Signature card": INSTITUTIONS.US_BANK,
}

const INSTITUTION_STRINGS = Object.getOwnPropertyNames(KEYWORDS_TO_INSTITUTIONS)

export function getInstitutionMatchesForCard(_cardName) {
    const cardName = _cardName.toUpperCase()
    const matches = INSTITUTION_STRINGS.filter(s => {
        return cardName.includes(s.toUpperCase())
    });
    return matches.map(s => KEYWORDS_TO_INSTITUTIONS[s]);
}
