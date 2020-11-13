import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";
import moment from "moment";
import getAge from "../../aux/getAge";
import arrayDebt from "../../data/arrayDebt";
import arrayBankVisit from '../../data/arrayBankVisit';
import arrayContactPersons from '../../data/arrayContactPersons';
import printTable from '../../aux/printTable';

const useStyles = makeStyles((theme) => ({
  default: {
    margin: 0,
    paddingLeft: "5px",
  },
}));

export default function PrintFormContent() {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);

  let familyStatus = state.familyStatus;
  if (state.sex === "Мужской" && state.familyStatus === "10") {
    familyStatus = "Женат";
  } else if (state.sex === "Женский" && state.familyStatus === "10") {
    familyStatus = "Замужем";
  } else if (state.sex === "Мужской" && state.familyStatus === "20") {
    familyStatus = "Холост";
  } else if (state.sex === "Женский" && state.familyStatus === "20") {
    familyStatus = "Не замужем";
  }

  return (
    <>
      <p align="center">
        <strong>
          Анкета – Заявление на получение кредита № {state.currentFormId}
        </strong>
      </p>
      <table
        border="1"
        cellSpacing="0"
        cellPadding="0"
        align="center"
        width="688"
      >
        <tbody>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>ПАРАМЕТРЫ КРЕДИТА</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="220px" colSpan="5" valign="top">
              <h3 className={classes.default}>Сумма кредита:</h3>
            </td>
            <td width="111px" colSpan="5" valign="top">
              <h3 className={classes.default}>Срок</h3>
            </td>
            <td width="353px" colSpan="11" valign="top">
              <h3 className={classes.default}>Цель кредита:</h3>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="220px" colSpan="5" valign="top">
              <p className={classes.default}>{`${state.loanAmount} рублей`}</p>
            </td>
            <td width="111px" colSpan="5" valign="top">
              <p className={classes.default}>{`${state.loanPeriod} мес.`}</p>
            </td>
            <td width="353px" colSpan="11" valign="top">
              <p className={classes.default}>{`${state.loanGoal}`}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>ПЕРСОНАЛЬНЫЕ ДАННЫЕ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Фамилия: </strong>
                {state.clientSurname} <strong>Имя: </strong>
                {state.clientName} <strong> Отчество:</strong>{" "}
                {state.clientPatronymic}
              </p>
              <p className={classes.default}>
                <strong>Менялись ли ваши фамилия, имя, отчество? </strong>
                (если да, укажите прежние Ф.И.О. и год изменения)
              </p>
              <p className={classes.default}>
                <strong>{state.changedNameCheckBox} </strong>
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="107" colSpan="2" valign="top">
              <p className={classes.default}>
                <strong>Пол</strong>
              </p>
              <p className={classes.default}>{state.sex}</p>
            </td>
            <td width="119" colSpan="2" valign="top">
              <p className={classes.default}>
                <strong>Дата рождения: </strong>
              </p>
              <p className={classes.default}>
                <strong>Возраст: </strong>
              </p>
            </td>
            <td width="290" colSpan="12" valign="top">
              <p className={classes.default}>
                {moment(state.birthDayDate).format("DD.MM.YYYY")}
              </p>
              <p className={classes.default}>{getAge(state.birthDayDate)}</p>
            </td>
            <td width="168" colSpan="5" valign="top">
              <p className={classes.default}>
                <strong>Гражданство:</strong>
              </p>
              <p className={classes.default}>{state.clientNationality}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Паспорт гражданина Российской Федерации: </strong>
                <strong>Серия: </strong> {state.passSerial}{" "}
                <strong>Номер: </strong> {state.passNumber}{" "}
                <strong>Дата выдачи: </strong>{" "}
                {moment(state.issueDate).format("DD.MM.YYYY")}
              </p>
              <p className={classes.default}>
                <strong>Выдан: </strong>
                {state.passDepartment}
                <strong> Код подразделения: </strong>
                {state.passDepartmentCode}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>КОНТАКТНАЯ ИНФОРМАЦИЯ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Мобильный телефон: </strong>
                {state.mobilePhone}
              </p>
              <p className={classes.default}>
                <strong>Рабочий телефон: </strong>
                {state.workPhone}
              </p>
              <p className={classes.default}>
                <strong>Адрес электронной почты </strong>
                <strong>(Email): </strong>
                {state.email}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Адрес постоянной регистрации: </strong>
                {state.residenceAddressType}
              </p>
              <p className={classes.default}>
                {`Индекс: ${state.residencePostcode} ${state.residenceRegion}  г. ${state.residenceCity} ул. ${state.residenceStreet}
                д. ${state.residenceHouse} корпус ${state.residenceCase} кв. ${state.residenceFlat}`}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Адрес фактического проживания: </strong>
                {!state.sameAddressCheckBox && state.addressType}
              </p>
              {!state.sameAddressCheckBox ? (
                <p className={classes.default}>
                  {`Индекс: ${state.postcode} ${state.region} г. ${state.city} ул. ${state.street}
                д. ${state.house} корпус ${state.case} кв. ${state.flat}`}
                </p>
              ) : (
                <p className={classes.default}>
                  Совпадает с адресом регистрации{" "}
                </p>
              )}
              <p className={classes.default}>
                <strong>Срок проживания по фактическому адресу: </strong>
                {state.livePeriod}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          {state.tempAddressCheckBox && (
            <tr>
              <td width="684" colSpan="21" valign="top">
                <p className={classes.default}>
                  <strong>Адрес временной регистрации: </strong>
                </p>
                <p className={classes.default}>
                  {`Индекс: ${state.tempPostcode} ${state.tempRegion} г. ${state.tempCity} ул. ${state.tempStreet}
                д. ${state.tempHouse} корпус ${state.tempCase} кв. ${state.tempFlat}`}
                </p>
                <p className={classes.default}>
                  <strong>Срок регистрации : с </strong>
                  {moment(state.tempStartDate).format("DD.MM.YYYY")} <strong> до </strong>
                  {moment(state.tempEndDate).format("DD.MM.YYYY")}
                </p>
              </td>
              <td width="4"></td>
            </tr>
          )}
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>СВЕДЕНИЯ О СЕМЬЕ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Семейное положение: </strong>
                {familyStatus}
              </p>
            </td>
          </tr>
          <tr>
            <td width="518" colSpan="17" valign="top">
              <p className={classes.default}>
                <strong>Количество членов семьи: </strong>
                {state.familyCount},<strong> из них дети: </strong>
                {state.childrenCount}
              </p>
            </td>
            <td width="75" colSpan="3" valign="top">
              <p className={classes.default}>Проживает совместно</p>
            </td>
            <td width="92" valign="top">
              <p className={classes.default}>На иждивении</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Отношение к воинской службе:</strong>{" "}
                {state.militaryStatus}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p align="left" className={classes.default}>
                <strong>Судимости</strong>: {state.criminalStatus}
              </p>
              <p className={classes.default}>
                Подпись _________________________________
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>ИНФОРМАЦИЯ ОБ ОБРАЗОВАНИИ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Образование: </strong>
                {state.educationStatus}
              </p>
            </td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>ИНФОРМАЦИЯ О ТРУДОУСТРОЙСТВЕ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Работа по трудовому договору/контракту: </strong>
                {state.workStatus}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>Название компании/организации : </strong>{" "}
                {state.companyName}
              </p>
              <p className={classes.default}>
                <strong>Ф.И.О. Руководителя компании/организации: </strong>
                {state.companyHeadName}
              </p>
              <p className={classes.default}>
                <strong> Подразделение: </strong> {state.companyDepartment}{" "}
                <strong>Должность: </strong>
                {state.companyPosition}
              </p>
              <p className={classes.default}>
                <strong>Юридический адрес компании/организации: </strong>
              </p>
              <p className={classes.default}>
                {`Индекс: ${state.lawWorkPostcode} ${state.lawWorkRegion} г. ${state.lawWorkCity} ул. ${state.lawWorkStreet}
                д. ${state.lawWorkHouse} корпус ${state.lawWorkCase} оф. ${state.lawWorkOffice}`}
              </p>
              <p className={classes.default}>
                <strong>Фактический адрес компании/организации: </strong>
              </p>
              {!state.sameWorkAddressCheckBox ? (
                <p className={classes.default}>
                  {`Индекс: ${state.workPostcode} ${state.workRegion} г. ${state.workCity} ул. ${state.workStreet}
                д. ${state.workHouse} корпус ${state.workCase} оф. ${state.workOffice}`}
                </p>
              ) : (
                <p className={classes.default}>
                  Совпадает с юридическим адресом
                </p>
              )}
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="308" colSpan="8" valign="top">
              <p className={classes.default}>
                <strong>Количество сотрудников в компании: </strong>{" "}
                {state.workerCount}
              </p>
            </td>
            <td width="376" colSpan="13" valign="top">
              <p className={classes.default}>
                <strong>Как долго Вы работаете в компании: </strong>{" "}
                {state.workTime}
              </p>
              <p className={classes.default}>
                <strong>Количество рабочих мест за последние 3 года: </strong>{" "}
                {state.countWorkPlaces}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p>ИНФОРМАЦИЯ О ДОХОДАХ/РАСХОДАХ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colSpan="6" valign="top" align="center">
              <p className={classes.default}>
                <strong>Ежемесячные доходы</strong>
              </p>
            </td>
            <td width="88" colSpan="7" valign="top" align="center">
              <p className={classes.default}>
                <strong>Размер, руб.</strong>
              </p>
            </td>
            <td width="227" colSpan="6" valign="top" align="center">
              <p className={classes.default}>
                <strong>Обязательные ежемесячные платежи</strong>
              </p>
            </td>
            <td width="94" colSpan="2" valign="top" align="center">
              <p className={classes.default}>
                <strong>Размер, руб.</strong>
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colSpan="6" valign="top">
              <p className={classes.default}>
                Основная Зарплата (после уплаты налогов) форма 2НДФЛ
              </p>
            </td>
            <td width="88" colSpan="7" valign="top">
              <p className={classes.default}>{state.income0}</p>
            </td>
            <td width="227" colSpan="6" valign="top">
              <p className={classes.default}>Плата за образование</p>
            </td>
            <td width="94" colSpan="2" valign="top">
              <p className={classes.default}>{state.cost0}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colSpan="6" valign="top">
              <p className={classes.default}>
                Доход от сдачи в аренду недвижимости (после уплаты налогов)
              </p>
            </td>
            <td width="88" colSpan="7" valign="top">
              <p className={classes.default}>{state.income1}</p>
            </td>
            <td width="227" colSpan="6" valign="top">
              <p className={classes.default}>Арендные платежи</p>
            </td>
            <td width="94" colSpan="2" valign="top">
              <p className={classes.default}>{state.cost1}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colSpan="6" valign="top">
              <p className={classes.default}>Алименты</p>
            </td>
            <td width="88" colSpan="7" valign="top">
              <p className={classes.default}>{state.income2}</p>
            </td>
            <td width="227" colSpan="6" valign="top">
              <p className={classes.default}>Алименты уплачиваемые</p>
            </td>
            <td width="94" colSpan="2" valign="top">
              <p className={classes.default}>{state.cost2}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colSpan="6" valign="top">
              <p className={classes.default}>Прочие (указать вид дохода)</p>
            </td>
            <td width="88" colSpan="7" valign="top">
              <p className={classes.default}>{state.income3}</p>
            </td>
            <td width="227" colSpan="6" valign="top">
              <p className={classes.default}>
                Выплаты по исполнительным документам
              </p>
            </td>
            <td width="94" colSpan="2" valign="top">
              <p className={classes.default}>{state.cost3}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colSpan="6" valign="top">
              <p className={classes.default}>
                <strong>Итого:</strong>
              </p>
            </td>
            <td width="88" colSpan="7" valign="top">
              <p className={classes.default}>{state.incomeSum}</p>
            </td>
            <td width="227" colSpan="6" valign="top">
              <p className={classes.default}>Страхование</p>
            </td>
            <td width="94" colSpan="2" valign="top">
              <p className={classes.default}>{state.cost4}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colSpan="6" valign="top">
              <p className={classes.default}>
                <strong>Среднемесячный доход семьи:</strong>{" "}
                {state.averageIncome}
              </p>
            </td>
            <td width="88" colSpan="7" valign="top"></td>
            <td width="227" colSpan="6" valign="top">
              <p className={classes.default}>
                <strong>Итого:</strong>
              </p>
            </td>
            <td width="94" colSpan="2" valign="top">
              <p className={classes.default}>{state.costSum}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>
                  Документы, подтверждающие право собственности, предоставлены:{" "}
                </strong>
                {state.hasDocumentCheckBox ? "Да" : "Нет"}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colSpan="21" valign="top" align="center">
              <p>Кредитные обязательства</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="176" colSpan="5" align="center">
              <p className={classes.default}>Наименование банка</p>
            </td>
            <td width="165" colSpan="5" align="center">
              <p className={classes.default}>Наличие просрочки платежа</p>
            </td>
            <td width="174" colSpan="5" align="center">
              <p className={classes.default}>
                Оставшаяся для погашения сумма (руб.)
              </p>
            </td>
            <td width="181" colSpan="6" align="center">
              <p className={classes.default}>
                Ежемесячная сумма погашения (руб.)
              </p>
            </td>
            {/*<td width="4" colSpan="1"></td>*/}
          </tr>
          {printTable(state.debt, arrayDebt, 5)}
          <tr>
            <td width="684" colSpan="21" valign="top" align="center">
              <p>Куда обращались (за последние.6 мес.)</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="84" colSpan="7" align="center">
              <p className={classes.default}>Наименование банка</p>
            </td>
            <td width="76" colSpan="7" align="center">
              <p className={classes.default}>Дата обращения</p>
            </td>
            <td width="129" colSpan="7" align="center">
              <p className={classes.default}>Сумма обращения</p>
            </td>
          </tr>
          {printTable(state.bankVisit, arrayBankVisit,7)}
          <tr>
            <td width="684" colSpan="21" valign="top">
              <p className={classes.default}>
                <strong>
                  Наличие кредитной истории (погашенные кредиты):{" "}
                </strong>{" "}
                {state.hasCreditHistory ? "Да" : "Нет"}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="688" colSpan="22" valign="top">
              <p className={classes.default}>
                <strong>Контактные лица: </strong>
              </p>
            </td>
          </tr>
          {printTable(state.contactPersons, arrayContactPersons, 5)}
          <tr>
            <td width="688" colSpan="22" valign="top">
              <p>
                <strong></strong>
              </p>
              <p>
                <strong></strong>
              </p>
              <p>
                <strong></strong>
              </p>
              <p>
                <strong></strong>
              </p>
            </td>
          </tr>
          <tr>
            <td width="688" colSpan="22">
              <p className={classes.default}>
                <strong>
                  Заполнив и подписав настоящую анкету, я понимаю и соглашаюсь с
                  тем, что:
                </strong>
                <br />
              </p>
              <p className={classes.default}>
                1. Я предоставил Анкету-Заявление для получения консультационной
                услуги, направленной на поиск Банка либо иной кредитной
                организации (в том числе микрофинансовой организации) для
                получения мной кредита с примерными параметрами и на цели
                указанные в анкете.
              </p>
              <p className={classes.default}>
                2. Информация, предоставленная мной в связи с кредитованием (в
                том числе в Анкете-Заявлении), является полной, точной и
                достоверной во всех отношениях.
              </p>
              <p className={classes.default}>
                3. Кодовое слово (желательно девичья фамилия матери):
              </p>
              <p className={classes.default}>
                4. Принятие к рассмотрению Анкеты–Заявления Клиента не означает
                возникновения обязательства по предоставлению кредита.
              </p>
              <p className={classes.default}>
                5. Я выражаю свое согласие на осуществление обработки (сбора,
                систематизации, накопления, хранения, уточнения (обновления,
                изменения), использования, распространения (в том числе
                передачи), обезличивания, блокирования и уничтожения), в том
                числе автоматизированной, моих персональных данных, указанных в
                настоящей Анкете-Заявлении, в соответствии с требованиями
                Федерального закона от 27.07.2006 №152-ФЗ «О персональных
                данных». Указанные мной персональные данные предоставляются в
                целях получения кредита и исполнения Договора, а также
                информирования меня о других продуктах и услугах. Согласие
                предоставляется с момента подписания настоящей Анкеты-Заявления
                на весь срок моей жизни.
              </p>
              <p className={classes.default}>
                Настоящее согласие может быть отозвано мной при предоставлении
                заявления в простой письменной форме в соответствии с
                требованиями законодательства Российской Федерации.
              </p>
              <p className={classes.default}>
                6. В случае принятия отрицательного решения ИП Фомченко И.Е не
                обязан возвращать мне настоящую Анкету-заявление.
              </p>
            </td>
          </tr>
          <tr>
            <td width="344" colSpan="11">
              <p className={classes.default}>ИП Фомченко И.Е</p>
            </td>
            <td width="344" colSpan="11">
              <p className={classes.default}>{`Дата заполнения: ${moment(
                state.created_at
              ).format("DD.MM.YYYY")}`}</p>
            </td>
          </tr>
          <tr>
            <td width="344" colSpan="11">
              <p></p>
              <p className={classes.default}>_________________</p>
              <p className={classes.default}>Подпись</p>
            </td>
            <td width="344" colSpan="11">
              <p></p>
              <p className={classes.default}>__________________________________/_________________</p>
              <p className={classes.default}>ФИО/Подпись</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
