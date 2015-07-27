var Mongoose = require('../config/database').Mongoose,
    db = require('../config/database').db,
    Schema = Mongoose.Schema,
    validator = require('mongoose-validators')
    autoIncrement = require('mongoose-auto-increment');
    autoIncrement.initialize(db);

var Contact =  require('./contact').Contact;

var Address = require('./address').Address;

var BusinessPartner = require('./businessPartner').BusinessPartner;

/**
 * @module supplier 
 * @description supplier class contains the details of supplier
 */


var supplierSchema = new Schema({
    /** unique id for supplier and should be alphanumeric and maximum 30 characters */
    supplierId: { type: String, validate: [validator.isAlphanumeric(), validator.isLength(2, 30)] },
    /** reference to Tennant Collection and should save id of Tenant and is the required field */
    tenantRef: { type: String, ref: 'tenant', index: true , required: true  },
    /** Id which supplier see and is the combination of tenantRef and supplierId */
    supplierDisplayId: {type: String, index: true },
     /** reference to supplierGroup Collection and should save id of supplierGroup and is required */
    supplierGroup: { type: String, ref: 'supplierGroup' ,required: true},
    /** nine digit number required for doing business in Europe, US and many other country */
    dunsNo: { type: String, validate: [validator.isLength(0, 9)] },
    /** name of supplier and should be alphaNumeric, between 2 to 30 characters  */
    supplierName: { type: String, validate: [validator.isLength(2, 30),  validator.matches(/^[a-zA-Z0-9\s]+$/)] },
    /** is alphabet and can be maximum 10 characters */
    status: { type: String , validate:[validator.isAlpha(), validator.isLength(0, 10)]},
    /** is string type and can be maximum 50 characters */
    termsOfPayment: { type: String , validate:[ validator.isLength(0, 50)]},
    /** is string type and can be maximum 50 characters */
    termsOfDelivery: { type: String , validate:[ validator.isLength(0, 50)]},
    /** is string type and can be maximum 50 characters */
    methodOfPayment: { type: String , validate:[validator.isLength(0, 50)]},
    /** is string type and can be maximum 50 characters */
    taxIdentificationNo: { type: String, validate:[validator.isLength(0, 50)] },
    /** is string type and can be maximum 50 characters */
    extSupplierID: { type: String, validate:[validator.isLength(0, 50)] },
    /** is string type and can be maximum 50 characters */
    accountNumber: { type: String, validate:[validator.isLength(0, 50)] },
    /** A BIC/SWIFT code is used to identify individual banks around the world. BIC and SWIFT code are interchangeable terms meaning the same thing, and can be maximum 11 characters */
    bankIdentificationCode: { type: String , validate:[validator.isLength(0, 11)]},
    /** is a standard format of Bank Identifier Codes (BIC) and it is unique identification code for a particular bank and should be maximum 11 characters */
    swiftCode: { type: String, validate:[validator.isLength(0, 11)] },
    /** Indentifies the country in which the bank in located and is alphanumeric and maximum 20 characters */
    bankCountryKey: { type: String , validate:[validator.isAlphanumeric(),validator.isLength(0, 20)]},
    /** This field contains a key for checking the combination of bank number and bank account number. */
    extBankControlKey: { type: String, validate:[validator.isAlphanumeric(),validator.isLength(0, 20)] },
     /** abstractBusinessPartner is a class  */
    abstractBusinessPartner: BusinessPartner,
     /** contacts is an array of contact class */
    contacts: [Contact],
     /** addresses is an arrary of address class */
    addresses: [Address]

})

supplierSchema.plugin(autoIncrement.plugin,{ model: 'supplier', field: 'supplierId' });

supplierSchema.pre('save', function (next) {
  this.supplierDisplayId = this.supplierId+this.tenantRef;
  next();
});

var supplier = Mongoose.model('supplier', supplierSchema);

module.exports = {
    Supplier: supplier
};