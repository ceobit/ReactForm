import React, { useState, useEffect, useContext, useCallback } from "react";
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
import CostTable from "../CostTable/CostTable";
import CustomTable from "../CustomTable/CustomTable";
import arrayDebt from "../../data/arrayDebt";
import arrayBankVisit from "../../data/arrayBankVisit";
import arrayContactPersons from "../../data/arrayContactPersons";
import arrayChildren from "../../data/arrayChildren";

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
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);

  const { request } = useHttp();
  const token = useContext(AuthContext);

  const [inputDisabled, setInputDisabled] = useState(false);

  const fetchForms = useCallback(async () => {
    try {
      const data = await request(
        `/api/form/${state.currentFormId}`,
        "GET",
        null,
        {
          Authorization: `Bearer${token}`,
        }
      );

      setState((state) => ({ ...state, ...data.data, load: true }));
    } catch (e) {
      console.log("ошибка получения данных при открытии анкеты");
    }
  }, [request]);

  useEffect(() => {
    if (state.currentFormId !== "") {
      fetchForms();
      if (!state.needChangeForm) {
        setInputDisabled(true);
      }
    }

    if (state.pullData) {
      setState((state) => {
        return {
          ...state,
        };
      });
    }
  }, [state.pullData, fetchForms]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

  const handleChangedCheckBox = (event) => {
    const { name, checked } = event.target;
    setState((prev) => ({ ...prev, ...{ [name]: checked } }));
  };

  const handleBirthDayDate = (value) => {
    setState((prev) => ({ ...prev, ...{ ["birthDayDate"]: value } }));
  };

  const handleIssueDate = (value) => {
    setState((prev) => ({ ...prev, ...{ ["issueDate"]: value } }));
  };

  const handleTempStartDate = (value) => {
    setState((prev) => ({ ...prev, ...{ ["tempStartDate"]: value } }));
  };

  const handleTempEndDate = (value) => {
    setState((prev) => ({ ...prev, ...{ ["tempEndDate"]: value } }));
  };

  const handleChildrenCount = (event) => {
    setState((prevState) => ({
      ...prevState,
      ["childrenArray"]: [],
      childrenCount: event.target.value
    }));

    let i = event.target.value;
    while (i) {
      setState((prevState) => ({
        ...prevState,
        ["childrenArray"]: [...prevState["childrenArray"], ""],
      }));
      i--;
    }
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
            required={true}
            type="number"
            name="loanAmount"
            label="Сумма кредита (руб.)"
            fullWidth
            value={state.loanAmount}
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
            label="Срок кредита (мес.)"
            fullWidth
            value={state.loanPeriod}
            autoComplete="off"
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={state.loanGoal}
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
            value={state.clientSurname}
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
            value={state.clientName}
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
            value={state.clientPatronymic}
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
                checked={state.changedNameCheckBox}
                onChange={handleChangedCheckBox}
              />
            }
            label="Менялись ли ваши фамилия, имя, отчество?"
            disabled={inputDisabled}
          />
        </Grid>
        {state.changedNameCheckBox && <ChangedName />}
        <Grid item xs={12} sm={3}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="labelSexId">Пол</InputLabel>
            <Select
              labelId="labelSexId"
              name="sex"
              value={state.sex}
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value="Мужской">Мужской</MenuItem>
              <MenuItem value="Женский">Женский</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Calendar
            label="Дата рождения"
            id="idBirthday"
            name="birthDayDate"
            value={state.birthDayDate}
            onChangeValue={(value) => handleBirthDayDate(value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            value={state.clientNationality}
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
            value={state.passSerial}
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
            value={state.passNumber}
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
            value={state.issueDate}
            onChangeValue={handleIssueDate}
            disabled={inputDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            value={state.passDepartment}
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
            value={state.passDepartmentCode}
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
            value={state.mobilePhone}
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
            value={state.workPhone}
            type="number"
            name="workPhone"
            label="Рабочий телефон"
            fullWidth
            autoComplete="off"
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={state.email}
            type="email"
            name="email"
            label="Адрес электронной почты (E-mail)"
            fullWidth
            autoComplete="off"
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </Grid>
        <Grid item xs={12} className={classes.gridSubtitle}>
          <Typography variant="subtitle1">
            Адрес постоянной регистрации:
          </Typography>
        </Grid>
        <ResidenceAddress data={state} />
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
                checked={state.sameAddressCheckBox}
                onChange={handleChangedCheckBox}
                disabled={inputDisabled}
              />
            }
            label="Совпадает с адресом регистрации"
          />
        </Grid>
        {/*Фактический адрес показываем в зависимости от установленного значения sameAddress*/}
        {!state.sameAddressCheckBox && (
          <Address sameAddress={state.sameAddressCheckBox} />
        )}
        <Grid item xs={12}>
          <TextField
            value={state.livePeriod}
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
                checked={state.tempAddressCheckBox}
                onChange={handleChangedCheckBox}
                disabled={inputDisabled}
              />
            }
            label="Временная регистрация"
          />
        </Grid>
        {/*Временный адрес показываем в зависимости от установленного значения sameAddress*/}
        {state.tempAddressCheckBox && (
          <>
            <TempAddress />
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Срок регистрации:</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Calendar
                label="c"
                name="tempStartDate"
                value={state.tempStartDate}
                onChangeValue={(value) => handleTempStartDate(value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Calendar
                label="по"
                name="tempEndDate"
                value={state.tempEndDate}
                onChangeValue={(value) => handleTempEndDate(value)}
              />
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
              value={state.familyStatus}
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={10}>
                {state.sex === "Мужской" ? "Женат" : "Замужем"}
              </MenuItem>
              <MenuItem value={20}>
                {state.sex === "Мужской" ? "Холост" : "Не замужем"}
              </MenuItem>
              <MenuItem value={"В разводе"}>В разводе</MenuItem>
              <MenuItem value={"Гражданский брак"}>Гражданский брак</MenuItem>
              <MenuItem value={"Другое"}>Другое</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {state.familyStatus === 50 && (
          <Grid item xs={12} sm={6}>
            <TextField
              value={state.familyStatusNote}
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
            value={state.familyCount}
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
            value={state.childrenCount}
            type="text"
            name="childrenCount"
            label=""
            fullWidth
            autoComplete="off"
            onChange={handleChildrenCount}
            disabled={inputDisabled}
          />
        </Grid>
        {state.childrenCount !== "" && (
          <ChildrenInfo stateKey="childrenArray" />
        )}
        {/*{state.childrenCount !== "" && <CustomTable tableHeading="Информация о детях" arrayHeading={arrayChildren} stateKey="childrenArray" />}*/}
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
              value={state.militaryStatus}
              name="militaryStatus"
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={"Отслужил/Запас"}>Отслужил/Запас</MenuItem>
              <MenuItem value={"Военнослужащий(Офицер и т.д.)"}>
                Военнослужащий(Офицер и т.д.)
              </MenuItem>
              <MenuItem value={"Освобожден"}>Освобожден</MenuItem>
              <MenuItem value={"Не служил"}>Не служил</MenuItem>
              <MenuItem value={"Невоеннообязанный"}>Невоеннообязанный</MenuItem>
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
              value={state.criminalStatus}
              name="criminalStatus"
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={"Судим"}>Судим</MenuItem>
              <MenuItem value={"Не судим"}>Не судим</MenuItem>
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
              value={state.educationStatus}
              name="educationStatus"
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={"Ученая степень/МВА"}>
                Ученая степень/МВА
              </MenuItem>
              <MenuItem value={"Высшее"}>Высшее</MenuItem>
              <MenuItem value={"Незаконченное высшее"}>
                Незаконченное высшее
              </MenuItem>
              <MenuItem value={"Средне-специальное"}>
                Средне-специальное
              </MenuItem>
              <MenuItem value={"Среднее"}>Среднее</MenuItem>
              <MenuItem value={"Ниже среднего"}>Ниже среднего</MenuItem>
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
              value={state.workStatus}
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={"Срочному"}>Срочному</MenuItem>
              <MenuItem value={"Без срока (постоянная занятость)"}>
                Без срока (постоянная занятость)
              </MenuItem>
              <MenuItem value={"Частная практика"}>Частная практика</MenuItem>
              <MenuItem value={"Индивидуальный предприниматель"}>
                Индивидуальный предприниматель
              </MenuItem>
              <MenuItem value={"Агент на комиссионном договоре"}>
                Агент на комиссионном договоре
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={state.companyName}
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
            value={state.companyHeadName}
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
            value={state.companyDepartment}
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
            value={state.companyPosition}
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
                checked={state.sameWorkAddressCheckBox}
                disabled={inputDisabled}
              />
            }
            label="Совпадает с юридическим адресом"
          />
        </Grid>
        {!state.sameWorkAddressCheckBox && <WorkAddress />}
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
              value={state.workerCount}
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={"До 10"}>До 10</MenuItem>
              <MenuItem value={"11-30"}>11-30</MenuItem>
              <MenuItem value={"31-50"}>31-50</MenuItem>
              <MenuItem value={"51-100"}>51-100</MenuItem>
              <MenuItem value={"Более 100<"}>Более 100</MenuItem>
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
              value={state.workTime}
              onChange={handleInputChange}
              disabled={inputDisabled}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={"Испытательный срок"}>
                Испытательный срок
              </MenuItem>
              <MenuItem value={"3-6 месяцев"}>3-6 месяцев</MenuItem>
              <MenuItem value={"6-12 месяцев"}>6-12 месяцев</MenuItem>
              <MenuItem value={"более 1 года"}>более 1 года</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={state.countWorkPlaces}
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
        <CostTable />
        <Grid item xs={12} className={classes.gridSubtitle}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="hasDocumentCheckBox"
                checked={state.hasDocumentCheckBox}
                onChange={handleChangedCheckBox}
              />
            }
            label="Документы, подтверждающие право собственности, предоставлены"
            disabled={inputDisabled}
          />
        </Grid>
        <CustomTable
          arrayHeading={arrayDebt}
          tableHeading="Кредитные обязательства:"
          stateKey="debt"
        />
        <CustomTable
          arrayHeading={arrayBankVisit}
          tableHeading="Куда обращались (за последние.6 мес.):"
          stateKey="bankVisit"
        />
        <Grid item xs={12} className={classes.gridSubtitle}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="hasCreditHistory"
                checked={state.hasCreditHistory}
                onChange={handleChangedCheckBox}
              />
            }
            label="Наличие кредитной истории (погашенные кредиты)"
            disabled={inputDisabled}
          />
        </Grid>
        <CustomTable
          arrayHeading={arrayContactPersons}
          tableHeading="Контактные лица:"
          stateKey="contactPersons"
        />
      </Grid>
    </React.Fragment>
  );
}
