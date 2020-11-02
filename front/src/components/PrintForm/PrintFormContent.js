import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppContext} from '../../context';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  default: {
    margin: 0,
    padding: 0,
  },
}));

export default function PrintFormContent() {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);
  
  return (
    <>
      <p align="center">
        <strong>Анкета – Заявление на получение кредита № {state.currentFormId}</strong>
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
              <p>
                <strong>{`Фамилия: ${state.clientSurname} Имя: ${state.clientName} Отчество: ${state.clientPatronymic}`}</strong>
              </p>
              <p>
                <strong>Менялись ли ваши фамилия, имя, отчество? </strong>
                (если да, укажите прежние Ф.И.О. и год изменения)
              </p>
              <p>
                <strong>{state.changedNameCheckBox} </strong>
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="107" colspan="2" valign="top">
              <p className={classes.default}>
                <strong>Пол</strong>
              </p>
              <p>{state.sex}</p>
            </td>
            <td width="119" colspan="2" valign="top">
              <p className={classes.default}>
                <strong>Дата рождения: </strong>
              </p>
              <p>
                <strong className={classes.default}>Возраст: </strong>
              </p>
            </td>
            <td width="290" colspan="12" valign="top">
              <p className={classes.default}>{moment(state.birthDayDate).format("DD.MM.YYYY")}</p>
              <p>{state.yearsOld}</p>
            </td>
            <td width="168" colspan="6" valign="top">
              <p className={classes.default}>
                <strong>Гражданство:</strong>
              </p>
              <p>{state.clientNationality}</p>
            </td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Паспорт гражданина Российской Федерации: </strong>
                {`Серия ${state.passSerial} Номер ${state.passNumber}  Дата выдачи: ${moment(state.issueDate).format("DD.MM.YYYY")}`}
              </p>
              <p>{`Кем выдан паспорт: ${state.passDepartment}`}</p>
              <p>{`Код подразделения: ${state.passDepartmentCode}`}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>КОНТАКТНАЯ ИНФОРМАЦИЯ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Мобильный телефон: </strong>
                {state.mobilePhone}
              </p>
              <p>
                <strong>Рабочий телефон: </strong>
                {state.workPhone}
              </p>
              <p>
                <strong>Адрес электронной почты </strong>
                <strong>(Email)</strong>
                {state.email}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Укажите адрес постоянной регистрации</strong>:
                {state.residenceAddressType}
              </p>
              <p>
                {`Индекс: ${state.residencePostcode} Регион: ${state.residenceRegion}  Город: ${state.residenceCity}  Улица: ${state.residenceStreet}
                Дом: ${state.residenceHouse} Корпус: ${state.residenceCase} Квартира: ${state.residenceFlat}`}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Адрес фактического проживания: </strong>
                {state.AddressType}
              </p>
              <p>
                {`Индекс: ${state.postcode} Регион: ${state.region}  Город: ${state.city}  Улица: ${state.street}
                Дом: ${state.house} Корпус: ${state.case} Квартира: ${state.flat}`}
              </p>
              <p>
                <strong>Укажите срок проживания по фактическому адресу:</strong>
                {state.livePeriod}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Укажите адрес временной регистрации</strong>:
              </p>
              <p>
                {`Индекс: ${state.tempPostcode} Регион: ${state.tempRegion}  Город: ${state.tempCity}  Улица: ${state.tempStreet}
                Дом: ${state.tempHouse} Корпус: ${state.tempCase} Квартира: ${state.tempFlat}`}
              </p>
              <p>
                <strong>Укажите срок регистрации : с </strong>
                {state.idStartDateTempAddress} <strong> до </strong>
                {state.idEndDateTempAddress}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>СВЕДЕНИЯ О СЕМЬЕ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p className={classes.default}>
                <strong>Семейное положение:</strong>
                {state.familyStatus}
              </p>
            </td>
          </tr>
          <tr>
            <td width="518" colspan="17" valign="top">
              <p>
                <strong>Укажите количество членов семьи</strong>:{" "}
                {state.familyCount},<strong>из них дети</strong>
                {state.childrenCount}
              </p>
            </td>
            <td width="75" colspan="3" valign="top">
              <p>Проживает совместно</p>
            </td>
            <td width="92" valign="top">
              <p>На иждивении</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Отношение к воинской службе:</strong>
              </p>
              <p>{state.militaryStatus}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p align="left">
                <strong>Судимости</strong>:
              </p>
              <p>{state.criminalStatus}</p>
              <p>Подпись _________________________________</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>ИНФОРМАЦИЯ ОБ ОБРАЗОВАНИИ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Образование:</strong>
                {state.educationStatus}
              </p>
            </td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>ИНФОРМАЦИЯ О ТРУДОУСТРОЙСТВЕ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>Работа по трудовому договору/контракту:</strong>
                {state.workStatus}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                <strong>
                  Укажите название компании/организации : {state.companyName}
                </strong>
              </p>
              <p>
                Ф.И.О. Руководителя компании/организации:{" "}
                {state.companyHeadName}
              </p>
              <p>
                Подразделение {state.companyDepartment} Должность{" "}
                {state.companyPosition}
              </p>
              <p>
                <strong>Юридический адрес компании/организации</strong>:
              </p>
              <p>
                {`Индекс: ${state.lawWorkPostcode} Регион: ${state.lawWorkRegion}  Город: ${state.lawWorkCity}  Улица: ${state.lawWorkStreet}
                Дом: ${state.lawWorkHouse} Корпус: ${state.lawWorkCase} офис: ${state.lawWorkOffice}`}
              </p>
              <p>
                <strong>Фактический адрес компании/организации</strong>:
              </p>
              <p>
                {`Индекс: ${state.workPostcode} Регион: ${state.workRegion}  Город: ${state.workCity}  Улица: ${state.workStreet}
                Дом: ${state.workHouse} Корпус: ${state.workCase} офис: ${state.workOffice}`}
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="308" colspan="8" valign="top">
              <p>
                <strong>Количество сотрудников в компании: </strong>
              </p>
              <p>{state.workerCount}</p>
            </td>
            <td width="376" colspan="13" valign="top">
              <p>
                <strong>Как долго Вы работаете в компании</strong>:
              </p>
              <p>{state.workTime}</p>
              <p>
                <strong>Количество рабочих мест за последние 3 года</strong>
              </p>
              <p>{state.countWorkPlaces}</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>ИНФОРМАЦИЯ О ДОХОДАХ/РАСХОДАХ</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colspan="6" valign="top">
              <p>
                <strong>Ежемесячные доходы</strong>
              </p>
            </td>
            <td width="88" colspan="7" valign="top">
              <p>
                <strong>Размер, руб.</strong>
              </p>
            </td>
            <td width="227" colspan="6" valign="top">
              <p>
                <strong>Обязательные ежемесячные платежи</strong>
              </p>
            </td>
            <td width="94" colspan="2" valign="top">
              <p>
                <strong>Размер, руб.</strong>
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colspan="6" valign="top">
              <p>Основная Зарплата (после уплаты налогов)форма 2НДФЛ</p>
            </td>
            <td width="88" colspan="7" valign="top"></td>
            <td width="227" colspan="6" valign="top">
              <p>Плата за образование</p>
            </td>
            <td width="94" colspan="2" valign="top"></td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colspan="6" valign="top">
              <p>Доход от сдачи в аренду недвижимости (после уплаты налогов)</p>
            </td>
            <td width="88" colspan="7" valign="top"></td>
            <td width="227" colspan="6" valign="top">
              <p>Арендные платежи</p>
            </td>
            <td width="94" colspan="2" valign="top"></td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colspan="6" valign="top">
              <p>Алименты</p>
            </td>
            <td width="88" colspan="7" valign="top"></td>
            <td width="227" colspan="6" valign="top">
              <p>Алименты уплачиваемые</p>
            </td>
            <td width="94" colspan="2" valign="top"></td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colspan="6" valign="top">
              <p>Прочие (указать вид дохода)</p>
            </td>
            <td width="88" colspan="7" valign="top"></td>
            <td width="227" colspan="6" valign="top">
              <p>Выплаты по исполнительным документам</p>
            </td>
            <td width="94" colspan="2" valign="top"></td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colspan="6" valign="top">
              <p>
                <strong>ИТОГО:</strong>
              </p>
            </td>
            <td width="88" colspan="7" valign="top"></td>
            <td width="227" colspan="6" valign="top">
              <p>Страхование</p>
            </td>
            <td width="94" colspan="2" valign="top"></td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="276" colspan="6" valign="top">
              <p>
                <strong>Среднемесячный доход семьи:</strong>
              </p>
            </td>
            <td width="88" colspan="7" valign="top"></td>
            <td width="227" colspan="6" valign="top">
              <p>
                <strong>ИТОГО:</strong>
              </p>
            </td>
            <td width="94" colspan="2" valign="top"></td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>
                ДОКУМЕНТЫ, ПОДТВЕРЖДАЮЩИЕ ПРАВО СОБСТВЕННОСТИ, ПРЕДОСТАВЛЕНЫ
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>{state.hasDocumentCheckBox}</p>
              <p>
                <strong></strong>
              </p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="342" colspan="14" valign="top">
              <p>КРЕДИТНЫЕ ОБЯЗАТЕЛЬСТВА</p>
            </td>
            <td width="342" colspan="7" valign="top">
              <p>КУДА ОБРАЩАЛИСЬ (за последние.6 мес.)</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="92" align="center">
              <p>Наименование банка</p>
            </td>
            <td width="99" colspan="2" align="center">
              <p>Наличие просрочки платежа</p>
            </td>
            <td width="108" colspan="4">
              <p align="center">Оставшаяся для погашения сумма (валюта)</p>
            </td>
            <td width="96" colspan="7">
              <p align="center">Ежемесячная сумма погашения (валюта)</p>
            </td>
            <td width="84">
              <p align="center">Наименование банка</p>
            </td>
            <td width="76" colspan="3">
              <p align="center">Дата обращения</p>
            </td>
            <td width="129" colspan="3">
              <p align="center">Сумма обращения</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="92" valign="top"></td>
            <td width="99" colspan="2" valign="top"></td>
            <td width="108" colspan="4" valign="top"></td>
            <td width="96" colspan="7" valign="top"></td>
            <td width="84" valign="top"></td>
            <td width="76" colspan="3" valign="top"></td>
            <td width="129" colspan="3" valign="top"></td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="684" colspan="21" valign="top">
              <p>НАЛИЧИЕ КРЕДИТНОЙ ИСТОРИИ (ПОГАШЕННЫЕ КРЕДИТЫ)</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="328" colspan="9" valign="top">
              <p>Да</p>
            </td>
            <td width="356" colspan="12" valign="top">
              <p>Нет</p>
            </td>
            <td width="4"></td>
          </tr>
          <tr>
            <td width="688" colspan="22" valign="top">
              <p>КОНТАКТНЫЕ ЛИЦА ( Ф.И.О.):</p>
            </td>
          </tr>
          <tr>
            <td width="688" colspan="22" valign="top">
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
            <td width="688" colspan="22">
              <p>
                <strong>
                  Заполнив и подписав настоящую анкету, я понимаю и соглашаюсь с
                  тем, что:
                </strong>
                <br />
              </p>
              <p>
                1. Я предоставил Анкету-Заявление для получения консультационной
                услуги, направленной на поиск Банка либо иной кредитной
                организации (в том числе микрофинансовой организации) для
                получения мной кредита с примерными параметрами и на цели
                указанные в анкете.
              </p>
              <p>
                2. Информация, предоставленная мной в связи с кредитованием (в
                том числе в Анкете-Заявлении), является полной, точной и
                достоверной во всех отношениях.
              </p>
              <p>3. Кодовое слово (желательно девичья фамилия матери):</p>
              <p>
                4. Принятие к рассмотрению Анкеты–Заявления Клиента не означает
                возникновения обязательства по предоставлению кредита.
              </p>
              <p>
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
              <p>
                Настоящее согласие может быть отозвано мной при предоставлении
                заявления в простой письменной форме в соответствии с требованиями законодательства Российской Федерации.
              </p>
              <p>
                6. В случае принятия отрицательного решения ИП Фомченко И.Е не
                обязан возвращать мне настоящую Анкету-заявление.
              </p>
            </td>
          </tr>
          <tr>
            <td width="344" colspan="11">
              <p>ИП Фомченко И.Е</p>
            </td>
            <td width="344" colspan="11">
              <p>{`Дата заполнения: ${moment(state.created_at).format("DD.MM.YYYY")}`}</p>
            </td>
          </tr>
          <tr>
            <td width="344" colspan="11">
              {" "}
              <p>_______________________________</p>
            </td>
            <td width="344" colspan="11">
              <p>__________________________________ _________________ Ф.И.О.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
