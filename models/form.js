const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    workPhone: {
      type: String,
    },
    residenceAddressType: {
      type: String,
    },
    addressType: {
      type: String,
    },
    cas: {
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
    childrenCount: {
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
    hasCreditHistory: {
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
    email: {
      type: String,
    },
    income0: {
      type: Number,
    },
    income1: {
      type: Number,
    },
    income2: {
      type: Number,
    },
    income3: {
      type: Number,
    },
    incomeSum: {
      type: Number,
    },
    cost0: {
      type: Number,
    },
    cost1: {
      type: Number,
    },
    cost2: {
      type: Number,
    },
    cost3: {
      type: Number,
    },
    cost4: {
      type: Number,
    },
    costSum: {
      type: Number,
    },
    debt: [
      {
        type: String,
      },
    ],
    bankVisit: [
      {
        type: String,
      },
    ],
    contactPersons: [
      {
        type: String,
      },
    ],
    completeWorks: [
      {
        type: String,
      },
    ],
    childrenArray: { type: Array, default: [] },

    tempStartDate: {
      type: String,
    },
    tempEndDate: {
      type: String,
    },
    averageIncome: {
      type: Number,
    },
    serviceTime: {
      type: Number,
    },
    costFirstStep: {
      type: Number,
    },
    costSecondStep: {
      type: Number,
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

formSchema.plugin(AutoIncrement, { inc_field: "formNumber" });

module.exports = mongoose.model("form", formSchema);
