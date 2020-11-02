const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const formSchema = new mongoose.Schema(
  {
    loanAmount: {
      type: Number,
      required: true,
    },
    loanPeriod: {
      type: Number,
      required: true,
    },
    loanGoal: {
      type: String,
      required: true,
    },
    clientSurname: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientPatronymic: {
      type: String,
      required: true,
    },
    oldName: {
      type: String,
    },
    oldNameDate: {
      type: String,
    },
    sex: {
      type: String,
    },
    birthDayDate: {
      type: String,
    },
    clientNationality: {
      type: String,
    },
    passSerial: {
      type: String,
    },
    passNumber: {
      type: String,
    },
    passDepartment: {
      type: String,
    },
    passDepartmentCode: {
      type: String,
    },
    mobilePhone: {
      type: String,
    },

    residenceAddressType: {
      type: String,
    },
    addressType: {
      type: String,
    },
    case: {
      type: String,
    },
    changedNameCheckBox: {
      type: Boolean,
    },
    city: {
      type: String,
    },
    companyDepartment: {
      type: String,
    },
    companyHeadName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyPosition: {
      type: String,
    },
    countWorkPlaces: {
      type: String,
    },

    criminalStatus: {
      type: String,
    },
    educationStatus: {
      type: String,
    },
    familyCount: {
      type: String,
    },
    familyStatus: {
      type: String,
    },
    familyStatusNote: {
      type: String,
    },
    flat: {
      type: String,
    },
    hasDocumentCheckBox: {
      type: Boolean,
    },
    house: {
      type: String,
    },
    issueDate: {
      type: String,
    },
    lawWorkCase: {
      type: String,
    },
    lawWorkCity: {
      type: String,
    },
    lawWorkHouse: {
      type: String,
    },
    lawWorkOffice: {
      type: String,
    },
    lawWorkPostcode: {
      type: String,
    },
    lawWorkRegion: {
      type: String,
    },
    lawWorkStreet: {
      type: String,
    },
    livePeriod: {
      type: String,
    },
    militaryStatus: {
      type: String,
    },
    postcode: {
      type: String,
    },
    region: {
      type: String,
    },
    residenceCase: {
      type: String,
    },
    residenceCity: {
      type: String,
    },
    residenceFlat: {
      type: String,
    },
    residenceHouse: {
      type: String,
    },
    residencePostcode: {
      type: String,
    },
    residenceRegion: {
      type: String,
    },
    residenceStreet: {
      type: String,
    },
    sameAddressCheckBox: {
      type: Boolean,
    },
    sameWorkAddressCheckBox: {
      type: Boolean,
    },
    street: {
      type: String,
    },
    tempAddressCheckBox: {
      type: Boolean,
    },
    tempAddressType: {
      type: String,
    },
    tempCase: {
      type: String,
    },
    tempCity: {
      type: String,
    },
    tempFlat: {
      type: String,
    },
    tempHouse: {
      type: String,
    },
    tempPostcode: {
      type: String,
    },
    tempRegion: {
      type: String,
    },
    tempStreet: {
      type: String,
    },
    workCase: {
      type: String,
    },
    workCity: {
      type: String,
    },
    workHouse: {
      type: String,
    },
    workOffice: {
      type: String,
    },
    workPostcode: {
      type: String,
    },
    workRegion: {
      type: String,
    },
    workStatus: {
      type: String,
    },
    workStreet: {
      type: String,
    },
    workTime: {
      type: String,
    },
    workerCount: {
      type: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

formSchema.plugin(AutoIncrement, {inc_field: 'formNumber'});

module.exports = mongoose.model("form", formSchema);
