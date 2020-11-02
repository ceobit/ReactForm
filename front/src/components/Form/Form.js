import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Calendar from "../Calendar/Calendar";
import ResidenceAddress from "../Address/ResidenceAddress";
import Address from "../Address/Address";
import ChildrenInfo from "../ChildrenInfo/ChildrenInfo";
import { AppContext } from "../../context";
import IncomeTable from "../IncomeTable/IncomeTable";
import ChangedName from "../ChangedName/ChangedName";
import TempAddress from "../Address/TempAddress";
import WorkAddress from "../Address/WorkAddress";
import LawWorkAddress from "../Address/LawWorkAddress";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  part: {
    padding: "30px 0 0 0",
  },
  formControl: {
    minWidth: 120,
  },
  gridSubtitle: {
    padding: "20px 12px 0 12px!important",
    margin: theme.spacing(0),
  },
  table: {
    padding: "5px 0 0 0!important",
    margin: theme.spacing(0),
    fontSize: "3px!important",
  },
  tableHead: {
    fontSize: "3px!important",
  },
}));

export default function Form() {
  const cost = [
    "Плата за образование",
    "Арендные платежи",
    "Алименты уплачиваемые",
    "Выплаты по исполнительным документам",
    "Страхование",
  ];

  const debt = [
    "Наименование банка",
    "Наличие просрочки платежа",
    "Оставшаяся для погашения сумма",
    "Ежемесячная сумма погашения",
  ];

  const classes = useStyles();

  const [state, setState] = useContext(AppContext);

  const { request } = useHttp();
  const token = useContext(AuthContext);

  const [commonState, setCommonState] = useState({
    sex: "",
    familyStatus: "",
    militaryStatus: "",
    criminalStatus: "",
    educationStatus: "",
    workStatus: "",
    workerCount: "",
    workTime: "",
    loanAmount: "",
    loanPeriod: "",
    loanGoal: "",
    clientSurname: "",
    clientName: "",
    clientPatronymic: "",
    clientNationality: "",
    passSerial: "",
    passNumber: "",
    passDepartment: "",
    passDepartmentCode: "",
    mobilePhone: "",
    livePeriod: "",
    familyCount: "",
    familyStatusNote: "",
    companyName: "",
    companyHeadName: "",
    companyDepartment: "",
    companyPosition: "",
    countWorkPlaces: "",
  });

  const [inputDisabled, setInputDisabled] = useState(false);

  const [childrenCount, setChildrenCount] = useState([]);
  const [changedNameCheckBox, setChangedNameCheckBox] = useState(false);
  const [sameAddressCheckBox, setSameAddressCheckBox] = useState(false);
  const [tempAddressCheckBox, setTempAddressCheckBox] = useState(false);
  const [sameWorkAddressCheckBox, setSameWorkAddressCheckBox] = useState(false);
  const [hasDocumentCheckBox, setHasDocumentCheckBox] = useState(false);

  const [birthDayDate, setBirthDayDate] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());

  const [costSum, setCostSum] = useState("");

  const cost1 = useRef(0);
  const cost2 = useRef(0);
  const cost3 = useRef(0);
  const cost4 = useRef(0);
  const cost5 = useRef(0);

  const fetchForms = useCallback(async () => {
    try {
      const data = await request(`/form/${state.currentFormId}`, "GET", null, {
        Authorization: `Bearer${token}`,
      });
      setCommonState(data.data);
      setState(data.data);
      setInputDisabled(true);
    } catch (e) {
      console.log("ошибка");
    }
  }, [request]);

  useEffect(() => {
    console.log(state);
    if (state.currentFormId !== "") {
      fetchForms();
    }

    if (state.pullData) {
      setState((state) => {
        return {
          ...state,
          ...commonState,
          changedNameCheckBox,
          sameAddressCheckBox,
          tempAddressCheckBox,
          sameWorkAddressCheckBox,
          hasDocumentCheckBox,
          birthDayDate,
          issueDate,
        };
      });
    }
  }, [state.pullData, fetchForms]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommonState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

  const handleBirthDayDate = (date) => setBirthDayDate(date);

  const handleIssueDate = (date) => setIssueDate(date);

  const handleChangedCheckBox = (event) => {
    const name = event.target.name;
    let setName = "set" + name[0].toUpperCase() + name.slice(1);
    eval(setName)(!eval(name));
  };

  const handleChildrenCount = (event) => {
    setChildrenCount(initializeArrayWithValues(+event.target.value));
    //  setChildrenCount(...childrenCount, childrenCount.concat([event.target.value]));
  };

  const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);

  const costCalculation = () => {
    let sum =
      +cost1.current.value +
      +cost2.current.value +
      +cost3.current.value +
      +cost4.current.value +
      +cost5.current.value;
    setCostSum(sum);
  };

  return (
    <React.Fragment>
        <Typography variant="h4" gutterBottom align="center">
          Анкета-заявление на получение кредита
        </Typography>
        <Typography variant="h6">Параметры кредита</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              name="loanAmount"
              label="Сумма кредита"
              fullWidth
              value={commonState.loanAmount}
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              name="loanPeriod"
              label="Срок кредита"
              fullWidth
              value={commonState.loanPeriod}
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={commonState.loanGoal}
              required
              name="loanGoal"
              label="Цель кредита"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" className={classes.part}>
          Персональные данные
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={commonState.clientSurname}
              required
              type="text"
              name="clientSurname"
              label="Фамилия"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={commonState.clientName}
              required
              type="text"
              name="clientName"
              label="Имя"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={commonState.clientPatronymic}
              required
              type="text"
              name="clientPatronymic"
              label="Отчество"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="changedNameCheckBox"
                  value="no"
                />
              }
              label="Менялись ли ваши фамилия, имя, отчество?"
              onChange={handleChangedCheckBox}
              disabled={inputDisabled}
            />
          </Grid>
          {changedNameCheckBox && <ChangedName />}
          <Grid item xs={12} sm={3}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="labelSexId">Пол</InputLabel>
              <Select
                labelId="labelSexId"
                name="sex"
                value={commonState.sex}
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value="m">Мужской</MenuItem>
                <MenuItem value="f">Женский</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Calendar
              label="Дата рождения"
              id="idBirthday"
              value={birthDayDate}
              onChangeValue={handleBirthDayDate}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              value={commonState.clientNationality}
              required
              type="text"
              name="clientNationality"
              label="Гражданство"
              fullWidth
              autoComplete="off"
              defaultValue="Россия"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Паспорт гражданина Российской Федерации:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.subtitle}>
            <TextField
              value={commonState.passSerial}
              required
              type="text"
              name="passSerial"
              label="Серия"
              autoComplete="off"
              inputProps={{
                maxLength: 4,
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.subtitle}>
            <TextField
              value={commonState.passNumber}
              required
              type="text"
              name="passNumber"
              label="Номер"
              autoComplete="off"
              inputProps={{
                maxLength: 6,
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Calendar
              label="Дата выдачи"
              id="idPassDate"
              value={issueDate}
              onChangeValue={handleIssueDate}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              value={commonState.passDepartment}
              required
              type="text"
              name="passDepartment"
              label="Кем выдан"
              fullWidth
              autoComplete="off"
              multiline
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              value={commonState.passDepartmentCode}
              required
              type="text"
              name="passDepartmentCode"
              label="Код подразделения"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" className={classes.part}>
          Контактная информация
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={commonState.mobilePhone}
              required
              type="number"
              name="mobilePhone"
              label="Мобильный телефон"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              name="workPhone"
              label="Рабочий телефон"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="Адрес электронной почты (E-mail)"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Адрес постоянной регистрации:
            </Typography>
          </Grid>
          <ResidenceAddress />
          <Grid item xs={12} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Адрес фактического проживания:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="sameAddressCheckBox"
                  // value={sameAddressCheckBox}
                  onChange={handleChangedCheckBox}
                  disabled={inputDisabled}
                />
              }
              label="Совпадает с адресом регистрации"
            />
          </Grid>
          {/*Фактический адрес показываем в зависимости от установленного значения sameAddress*/}
          {!sameAddressCheckBox && (
            <Address sameAddress={sameAddressCheckBox} />
          )}
          <Grid item xs={12}>
            <TextField
              value={commonState.livePeriod}
              type="text"
              id="livePeriod"
              name="livePeriod"
              label="Срок проживания по фактическому адресу"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridSubtitle}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="tempAddressCheckBox"
                  onChange={handleChangedCheckBox}
                  disabled={inputDisabled}
                />
              }
              label="Временная регистрация"
            />
          </Grid>
          {/*Временный адрес показываем в зависимости от установленного значения sameAddress*/}
          {tempAddressCheckBox && (
            <>
              <TempAddress />
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Срок регистрации:</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Calendar label="c" id="idStartDateTempAddress" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Calendar label="по" id="idEndDateTempAddress" />
              </Grid>
            </>
          )}
        </Grid>
        <Typography variant="h6" className={classes.part}>
          Сведения о семье
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl} size="medium">
              <InputLabel id="labelFamilyStatusId">Статус</InputLabel>
              <Select
                labelId="labelFamilyStatusId"
                name="familyStatus"
                value={commonState.familyStatus}
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={10}>
                  {commonState.sex === "m" ? "Женат" : "Замужем"}
                </MenuItem>
                <MenuItem value={20}>
                  {commonState.sex === "m" ? "Холост" : "Не замужем"}
                </MenuItem>
                <MenuItem value={30}>В разводе</MenuItem>
                <MenuItem value={40}>Гражданский брак</MenuItem>
                <MenuItem value={50}>Другое</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {commonState.familyStatus === 50 && (
            <Grid item xs={12} sm={6}>
              <TextField
                value={commonState.familyStatusNote}
                type="text"
                name="familyStatusNote"
                label="Семейное положение"
                fullWidth
                autoComplete="off"
              />
            </Grid>
          )}
          <Grid item xs={12} sm={7}>
            <Typography variant="subtitle1">
              Укажите количество членов семьи
            </Typography>
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              value={commonState.familyCount}
              type="text"
              name="familyCount"
              label=""
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1">из них дети</Typography>
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              // value={commonState.childrenCount}
              type="text"
              name="childrenCount"
              label=""
              fullWidth
              autoComplete="off"
              onChange={handleChildrenCount}
              disabled={inputDisabled}
            />
          </Grid>
          {childrenCount.map((item, index) => (
            <ChildrenInfo
              key={index}
              idBirthDay={`idBirthDay${index}`}
              liveTogetherId={`liveTogetherId${index}`}
              dependenceId={`dependenceId${index}`}
            />
          ))}
        </Grid>
        <Typography variant="h6" className={classes.part}>
          Дополнительная информация
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Отношение к воинской службе:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <Select
                labelId="labelMilitaryStatusId"
                value={commonState.militaryStatus}
                name="militaryStatus"
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={10}>Отслужил/Запас</MenuItem>
                <MenuItem value={20}>Военнослужащий(Офицер и т.д.)</MenuItem>
                <MenuItem value={30}>Освобожден</MenuItem>
                <MenuItem value={40}>Не служил</MenuItem>
                <MenuItem value={50}>Невоеннообязанный</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">Судимости:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} required>
              <Select
                labelId="labelMilitaryStatusId"
                value={commonState.criminalStatus}
                name="criminalStatus"
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={true}>Судим</MenuItem>
                <MenuItem value={false}>Не судим</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="h6" className={classes.part}>
          Информация об образовании
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">Образование:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <Select
                labelId="labelEducationStatusId"
                value={commonState.educationStatus}
                name="educationStatus"
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={10}>Ученая степень/МВА</MenuItem>
                <MenuItem value={20}>Высшее</MenuItem>
                <MenuItem value={30}>Незаконченное высшее</MenuItem>
                <MenuItem value={40}>Средне-специальное</MenuItem>
                <MenuItem value={50}>Среднее</MenuItem>
                <MenuItem value={60}>Ниже среднего</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="h6" className={classes.part}>
          Информация о трудоустройстве
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Работа по трудовому договору/контракту:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <Select
                labelId="labelWorkStatusId"
                name="workStatus"
                value={commonState.workStatus}
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={10}>Срочному</MenuItem>
                <MenuItem value={20}>Без срока (постоянная занятость)</MenuItem>
                <MenuItem value={30}>Частная практика</MenuItem>
                <MenuItem value={40}>Индивидуальный предприниматель</MenuItem>
                <MenuItem value={50}>Агент на комиссионном договоре</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={commonState.companyName}
              type="text"
              id="companyName"
              name="companyName"
              label="Название компании/организации"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={commonState.companyHeadName}
              type="text"
              name="companyHeadName"
              label="ФИО руководителя"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={commonState.companyDepartment}
              type="text"
              name="companyDepartment"
              label="Подразделение"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={commonState.companyPosition}
              type="text"
              name="companyPosition"
              label="Должность"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Юридический адрес компании/организации
            </Typography>
          </Grid>
          <LawWorkAddress />
          <Grid item xs={12} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Фактический адрес компании/организации:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="sameWorkAddressCheckBox"
                  onChange={handleChangedCheckBox}
                  disabled={inputDisabled}
                />
              }
              label="Совпадает с юридическим адресом"
            />
          </Grid>
          {!sameWorkAddressCheckBox && <WorkAddress />}
          {/*<Grid item xs={12} className={classes.gridSubtitle}>*/}
          {/*  <Typography variant="subtitle1">*/}
          {/*    Сведения о работе супруги(а)*/}
          {/*  </Typography>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12}>*/}
          {/*  <TextField*/}
          {/*    type="text"*/}
          {/*    id="partnerCompanyName"*/}
          {/*    name="partnerCompanyName"*/}
          {/*    label="Название компании/организации"*/}
          {/*    fullWidth*/}
          {/*    autoComplete="off"*/}
          {/*  />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} sm={6}>*/}
          {/*  <TextField*/}
          {/*    type="text"*/}
          {/*    id="partnerCompanyDepartment"*/}
          {/*    name="partnerCompanyDepartment"*/}
          {/*    label="Подразделение"*/}
          {/*    fullWidth*/}
          {/*    autoComplete="off"*/}
          {/*  />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} sm={6}>*/}
          {/*  <TextField*/}
          {/*    type="text"*/}
          {/*    id="partnerCompanyPosition"*/}
          {/*    name="companyPosition"*/}
          {/*    label="Должность"*/}
          {/*    fullWidth*/}
          {/*    autoComplete="off"*/}
          {/*  />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} className={classes.gridSubtitle}>*/}
          {/*  <Typography variant="subtitle1">*/}
          {/*    Адрес компании/организации*/}
          {/*  </Typography>*/}
          {/*</Grid>*/}
          {/*<WorkAddress />*/}
          <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Количество сотрудников в компании:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <Select
                labelId="labelWorkerCountId"
                name="workerCount"
                value={commonState.workerCount}
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={10}>До 10</MenuItem>
                <MenuItem value={20}>11-30</MenuItem>
                <MenuItem value={30}>31-50</MenuItem>
                <MenuItem value={40}>51-100</MenuItem>
                <MenuItem value={50}>Более 100</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Как долго Вы работаете в компании:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <Select
                labelId="labelWorkTimeId"
                id="selectWorkTimeId"
                name="workTime"
                value={commonState.workTime}
                onChange={handleInputChange}
                disabled={inputDisabled}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={10}>Испытательный срок</MenuItem>
                <MenuItem value={20}>3-6 месяцев</MenuItem>
                <MenuItem value={30}>6-12 месяцев</MenuItem>
                <MenuItem value={40}>более 1 года</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={commonState.countWorkPlaces}
              type="number"
              name="countWorkPlaces"
              label="Количество рабочих мест за последние 3 года"
              fullWidth
              autoComplete="off"
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" className={classes.part}>
          Информация о доходах и расходах
        </Typography>
        <Grid container spacing={3}>
          <IncomeTable />
          <Grid item xs={12} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Обязательные ежемесячные платежи:
            </Typography>
          </Grid>
          {cost.map((item, index) => {
            return (
              <>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  className={classes.table}
                  key={Math.random()}
                >
                  <TextField
                    variant="outlined"
                    defaultValue={item}
                    InputProps={{
                      readOnly: true,
                    }}
                    size="small"
                    margin="none"
                    fullWidth
                    key={Math.random()}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  className={classes.table}
                  key={Math.random()}
                >
                  <TextField
                    type="number"
                    variant="outlined"
                    inputRef={eval(`cost${index + 1}`)}
                    size="small"
                    fullWidth
                    label="Сумма"
                    onChange={() => {
                      costCalculation();
                    }}
                    key={Math.random()}
                  />
                </Grid>
              </>
            );
          })}
          <Grid item xs={12} sm={8} className={classes.table}>
            <TextField
              variant="outlined"
              defaultValue="Итого:"
              InputProps={{
                readOnly: true,
              }}
              size="small"
              margin="none"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.table}>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              label="Сумма"
              name="costSum"
              value={costSum}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridSubtitle}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="hasDocumentCheckBox"
                  onChange={handleChangedCheckBox}
                  disabled={inputDisabled}
                />
              }
              label="Документы, подтверждающие право собственности, предоставлены"
            />
          </Grid>
          <Grid item xs={12} className={classes.gridSubtitle}>
            <Typography variant="subtitle1">
              Кредитные обязательства:
            </Typography>
          </Grid>
          {debt.map((item, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={3}
                className={classes.table}
                key={Math.random()}
              >
                <TextField
                  type="text"
                  variant="outlined"
                  id={`debt${index}`}
                  size="small"
                  fullWidth
                  defaultValue={item}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  rows={3}
                  key={Math.random()}
                />
              </Grid>
            );
          })}
        </Grid>
    </React.Fragment>
  );
}
