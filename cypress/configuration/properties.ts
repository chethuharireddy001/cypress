import {getRandomNumber} from "../support/utils";

export const properties = {
    wrenchEmail: "ckumar+adminprod@wrench.com",
    wrenchPassword: "Hello@123",
    wrenchAdminId: "500264",

    lmAdminId: "1000013227",
    lmEmail: "lmsysadmin@wrench.com",
    lmPassword: "Hello@123",

    lmProviderId: "1000013573",
    wrenchProviderId: "531404",

    wrenchPhoneNumber: "(313) 355-2890",
    lmPhoneNumber: "212345678",
    invalidPhoneNumber: "2122125678",

    salesRepID: "109821",
    fleetRepID: "141426",

    organizationName2: "Pizza Planet",
    organizationID2: "1078",
    orgNotes: "Family Business",

    password: "Password123$",

    techSingleLetter: "a",

    cardHolderName: "Kadir Jankurt",
    cardNumber: "4111 1111 1111 1111",
    expMonth: "12",
    expYear: "2023",
    cvv: "411",
    cardZip: "98104",

    promoCode: "HALFOFF",
    discountPercentage: "50",
    discountExpirationDate: "29-12-2029",

    laborRate: "120",
    laborMarket: "Seattle",
    laborMarketListName: "SEA",
    negativeLaborRate: "-45",
    lmLaborMarket: "Victoria",

    cost: "10",
    price: "20",
    quantity: "2",
    labor: "2",

    testOrg: "Test Org",

    regionName: "SouthWest",
    hubName: "mainHub",
    hubRegion: "hubRegion",

    service: "Battery Replacement",
    testNote: "Test Note",

    validZip: "98011",
    invalidZip: "78660",

    validPostal: "5007",
    invalidPostal: "1111",

    wrenchValidQuoteId: "229101",
    lmValidQuoteId: "230436",

    lmValidJobId: "7234",

    jobApprovedOnline: "Online",

    partName: "Engine Oil",

    locationType: "Driveway",
    locationLabel: "Work",

    partnerCompany: "BridgeStone",

    serviceType: "Battery Replacement",

    wrenchBasicAuth: "Basic dGVzdDprZXk=",
    lmBasicAuth: "Basic dGVzdGVtYWlsOmtleQ==",

    wrenchDb: "wrenchDb",
    lmDb: "lmDb",

    lmPromoCode: "PAGANINI10",

    wrenchService: "Battery Replacement",
    lmService: "Mobile Tyre Replacement",

    partNumber: "ORA:CAS1:EDGE540",
    partVendor: "O'Reilly",
    onlinePartVendor: "Amazon",
    partQuality: "OEM",

    vehicleId: "1089157",

    techToBlock: "Rich Conbere",

    toolSerialNo: "994J4HI",

    existingDiscount: "UBER",

    fleetRepEmail: "kjankurt+fleetRep"+getRandomNumber(9999)+"@wrench.com",

    genericEmployeeEmail: "kjankurt+employee%",
    genericUserEmail: "kjankurt%",
}

export const wrenchUser = {
    email: "kjankurt+kaanTest@wrench.com",
    firstName: "Kaan",
    lastName: "Test",
    phone: "(313) 355-2890",
    password: "",
}

export const secondWrenchUser = {
    phone: "(313) 355-2890",
    firstName: "Kaan",
    lastName: "Test2",
    email: "kjankurt+kaanTest2@wrench.com",
    password: "",
}

export let employee = {
    phone: "(313) 355-2890",
    firstName: "Kaan",
    lastName: "TestEmp",
    email: "kjankurt+testEmployee@wrench.com",
    organizationId: "",
}

export const vehicle = {
    vehicleYear: "2014",
    vehicleMake: "Volkswagen",
    vehicleModel: "Passat",
    vehicleTrim: "Base",
    vehicleEngine: "2.5L L5 (CBTA) GAS FI",
    vehicleLabel: "Mafya",
    vehicleColor: "Silver",
    vehicleMileage: "52,000",
    vehicleDamage: "Dent in rear bumper",
    vehicleLicense: "BXV7750",
    vehicleState: "WA",
    vehicleVIN: "1VWCH7A36CCC25064",

    vehicleLicensePlate: "DAS",
    licenseVehicleState: "AK",
    licenseVehicleMake: "Subaru",

    lmLicensePlate: "724YJP",
    lmLicenseState: "QLD",
    lmVehicleMake: "HYUNDAI",

    modelYear: "2007",
    modelBrand: "HONDA",
    model: "JAZZ",

    userFirstName: "LubeMobile",
    userLastName: "User",
}

export const userCar = {
    drivetrain: 2,
    engine: "5.0L V8 4951cc (F) 99F DOHC 32V GAS FI 435HP",
    make: "Ford",
    model: "Mustang",
    transmission: 2,
    trim: "GT 50 Years Limited Edition",
    year: 2015,
}

export const userCar2 = {
    engine: "",
    make: "BMW",
    model: "M5",
    trim: "Competition",
    year: 2020
}

export const lmUser = {
    phone: "212345678",
    firstName: "Kaan",
    lastName: "Test",
    email: "kjankurt+kaanTestLubeMobile@wrench.com",
    password: "",
}

export const secondLmUser = {
    phone: "212345678",
    firstName: "Kaan",
    lastName: "Test2",
    email: "kjankurt+kaanTestLubeMobile2@wrench.com",
    password: "",
}

export const auAddress = {
    streetAddress: "27 Frome St",
    city: "Adelaide",
    zip: "5000",
    state: "SA",
}

export const auFullAddress = {
    address: "27 Frome St",
    city: "Adelaide",
    zip: "5000",
    state: "SA",
    country: "AU",
    label: "Home",
    type: "Garage",
}

export const usAddress = {
    streetAddress: "701 5th Ave",
    city: "Seattle",
    zip: "98104",
    state: "WA",
}

export const seaAddress = {
    address: "701 5th Ave",
    city: "Seattle",
    zip: "98104",
    state: "WA",
    country: "US",
    type: "Parking Lot",
    label: "Work"
}

export const usFullAddress = {
    address: "500 Wall St",
    city: "Seattle",
    zip: "98121",
    state: "WA",
    country: "US",
    type: "Parking Lot",
    label: "Work"
}

export const wrenchOrg ={
    organizationName: "Joe's Plumbing",
    organizationID: "1056",
    salesRepName: "Akram sales rep khan",
    managerName: "Meghana Sathyaprakash",
}

export const lmOrg = {
    organizationName: "Peter Bennie Pty Ltd",
    organizationID: "1737",
    salesRepName: "",
    managerName: "lmsys admin",
}

export const wrenchJsUser = {
    phone: "3133552890",
    firstName: "Kadir",
    lastName: "Jankurt",
    email: "kjankurt+user@wrench.com",
    password: "",
}

export const automationTestUser = {
    firstName: "automation",
    lastName: "automation test",
    id: "1000013600",
    email: "automation+test@wrench.com",
    registrationNumber: "BSN878G",
}

export const invalidUser = {
    firstName: "BSN",
    lastName: "BSNk",
    id: "234654",
    email: "randon+123@gmail.com",
    registrationNumber: "724YJ",
}

export const lmUserCar = {
    make: "TOYOTA",
    model: "CAMRY",
    year: 2022,
    makeId: 123,
    modelId: 1803,
    engine: "",
    trim: ""
}

export const wrenchService = {
    display: "Battery Replacement",
    make: "Ford",
    name: "Battery Replacement",
    origin: 7,
    productId: 15,
    productType: 2,
    serviceCode: 113749,
    skillSetId: 1002,
    value: 16,
    vehicleId: 1089157,
}

export const lmService = {
    display: "Mobile Tyre Replacement",
    fixed: true,
    fixedLabor: true,
    fixedLaborPrice: 0,
    fixedPrice: 0,
    hours: 2,
    name: "Mobile Tyre Replacement",
    organizationId: 0,
    origin: 0,
    productId: 10003,
    productType: 2,
    reviewRequired: false,
    serviceCode: 10003,
    skillSetId: 1011,
    value: 1,
    vehicleId: 298370,
    make: "",
    paymentType: 0,
}

export const wrenchJobRequest = {
    laborRate: 170,
    override: true,
    partner: false,
    paymentType: 6,
    serviceHours: 1,
    status: 1,
    type: 3,
    originalStatus: 1,
    organizationStatus: 5,
    partsInHand: 0,
    partsOrdered: 0,
    potentialWarranty: false,
    vehicleFuelType: 1,
    vehicleMake: "Ford",
    vehicleModel: "Mustang",
    vehicleYear: 2015,
}

export const lmJobRequest = {
    laborRate: 180,
    originalStatus: 5,
    organizationStatus: 0,
    partsInHand: 100,
    partsOrdered: 100,
    override: true,
    partner: false,
    paymentType: 43,
    potentialWarranty: true,
    serviceHours: 2,
    status: 1,
    type: 3,
    vehicleFuelType: 1,
    vehicleId: 298370,
    vehicleMake: "TOYOTA",
    vehicleModel: "CAMRY",
    vehicleYear: 2022
}

export const wrenchSubUser = {
    email: "kjankurt+contactTest@wrench.com",
    firstName: "Contact",
    lastName: "Test",
    phone: "(313) 355-2890",
    password: "",
}

export const techData = {
    firstName: "Kadir",
    lastName: "TechBro",
    email: "kjankurt+techBro" + getRandomNumber(9999) + "@wrench.com",
    profileUrl: "techBroKadir",
    phone: "3133552890",
    employeeId: getRandomNumber(99999),
    password: "Musthave8!",
    market: "Seattle"
}

export const discountData = {
    code: "KJ" + getRandomNumber(9999),
    amount: "25",
    consumeByDate: "5/18/2028",
    description: "Describing the discount",
    explanation: "Explaining the discount"
}

export const fleetUsers = {
    migratedFleetadmin: "fleetadmin@wrench.com",
    migratedFleetHubManager:"hubmngr1@wrench.com",
    migratedFleetRegionManager:"rgnmgr1@wrench.com",
    migratedFleetPassword: "Hello@123",
    hubdriver: "hubdvr1@wrench.com",
    breakPadReplacement: "Brake Pad Replacement", 
    breakPadsReplacement: "Brake Pads Replacement", 
    breakPadReplacementServiceNotes: "Need Brake Pad and Rotor Replacement service!",
    intervalServicesServiceNotes: "Need 3 year service Interval Services",
    brakePadandRotorReplacementFrontDescription: "Brake Pad and Rotor Replacement - Front",
    carSoundServiceNotes: "The car sounds so janky please help!",
    phoneNumber: "201 234-2344",
    firstName:"chethan",
    lastName:" test",
    ACDiagnosisFeatureSelect: "A/C Diagnosis",
    batteryReplacement: "Battery Replacement",
    batteryReplacementServiceNotes: "Battery Replacement service required",
    bulkQuoteRequestAlertPopupTitle: "Are you sure you want to exit bulk quote request?",
    cancelBtnTxtOnAlertPopUp: "Cancel",
    closeBtnTxtOnAlertPopUp: "Close",
    reviewAndSubmitBtn: "Review & submit",
    ACdiagnosisFeatureSelect: "A/C Diagnosis",
    alternatorReplacement: "Alternator Replacement",
    starterReplacement: "Starter Replacement",
    intervalServices: "Interval Services",
    radiatorReplacement:"Radiator Replacement",
    bulkQuoteRequestRemoveVehicleAlertPopupTitle: "Are you sure you want remove this vehicle from the bulk quote request?",
    removeBtnTxtOnAlertPopUp: "Remove",
    serviceWarningMsg: "Service was applied from vehicle 1/2, please edit options if needed.",
    editOptions: "Edit Options",
    editBtn: "Edit",
    removeBtn: "Remove",
    removeVehicleAlertTxt: "Are you sure you want remove this vehicle from the bulk quote request?",
    starterReplacementServiceNotes: "Need Starter Replacement, please help!",
    creditCardUserName: "ck",
    creditCardNumber: "4111111111111111",
    creditCardExpiryMonth: "12",
    creditCardExpiryYear: "2025",
    creditCardCVVNumber: "111",
    pinCode: "98105",
    Password: "Hello@123",
    newPassword: "Hello@124",
    editedPhonenumber: "(253) 278-3497",
    editedLastname: "head1",
    originalLastname: "fldadmin",
    originalreginmangername: "region mngr",
    originalhubmngrname: "hub mngr",
    originaldrivername: "hub driver",
    originalphoneNo: "(253) 278-3497",
    keyNotes: "my keys will be on the front drivers wheel",
    licensePlateNumber: "BGZ4487",
    state: "WA",
    companyName: "ck company",
    VIN: "1HGEM21292L047875",
    VINname:'2002 Honda Civic DX',
    VIN2: "4S4BRBAC1B3418941",
    locationNotes: "my car will be in the garage",
    hearAboutUs: "Google",
    name:" ck test",
    address: "1950 6th Aven",
    city: "Seattle",
    State: "WA",
    zip: "98105",
    Region1:"Region one",
    Region2:"Region two",
    Region1Hub1: "hub one",
    Region1Hub2: "Hub 02",
    Region2Hub1: "hub two", 
    Region2Hub2: "hub two", 
    Audi:"Audi",
    vehicleName: "Acura",
    vehicleName2: "Acura",
    vehicleName3: "2002 Volvo V70",
    errorMessage: "Incorrect username or password.",
    vehicleCountInRegion2Hub2: "2",
    vehicleCountInRegion1Hub1: "3"

}
export const lmFleetUser = {
    phoneNumber: "0212342344",
    originalphoneNo: "0212342344",
    pinCode: "5007",  
    licensePlateNumber: "525XJS", 
    state: "QLD",
    address: "Bowden",
    city: "Seattle",
    State: "SA",
    zip: "5007",
    migratedFleetadmin: "fleetadmin1@wrench.com",
    migratedFleetPassword: "Hello@123",
    Region1: "Region 01",
    Region2: "Region 02",
    Region1Hub1: "Hub 01",
    Region1Hub2: "Hub 02",
    Region2Hub1: "Hub 01",
    Region2Hub2: "Hub 02",
    Audi: "AUDI",
    vehicleName: "HOLDEN",
    vehicleName2: "HOLDEN",
    vehicleName3:"1998 HOLDEN COMMODORE",
    errorMessage: "Invalid username or password",
    vehicleCountInRegion2Hub2: "1",
    starterReplacement: "Starter Motor Replacement",
    location1:" bowden SA"
}
export const lmNormalUser = {
    normalUser: 'automation+testCK@wrench.com',
    normalUser1: 'automation+normal@wrench.com',
    danUser: 'danuser@wrench.com',
    password: 'Hello@123',
    newPassword:'Hello@124',
    mechanic: 'Udai',
    danlink:"book/lm-user?postalCode=5000&providerId=1000013244&customerType=dan",
    danid:" ck123test",
    userLastname: "ck-test"
    
  };