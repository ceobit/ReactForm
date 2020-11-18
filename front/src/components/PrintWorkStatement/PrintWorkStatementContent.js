import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";
import moment from "moment";
import arrayCompleteWorks from "../../data/arrayCompleteWorks";
import printTable from "../../aux/printTable";

const useStyles = makeStyles(() => ({
  default: {
    margin: 0,
  },

  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  table: {
    margin: "15px 50px",
  },
}));

export default function PrintWorkStatementContent() {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);

  return (
    <>
      <div className={classes.flex}>
        <p>
          <strong>{`№ ${state.currentFormId} от ${moment(
            state.created_at
          ).format("DD.MM.YYYY")} г.`}</strong>
        </p>
        <p align="right">
          <strong>Приложение № 2 к договору</strong>
        </p>
      </div>
      <p align="center" className={classes.default}>
        <strong>
          {`Акт № ${state.currentFormId} от ${moment(
            state.workStatementDate
          ).format("DD.MM.YYYY")} г.`}
        </strong>
      </p>
      <p align="center" className={classes.default}>
        <strong>о приемке выполненных работ</strong>
      </p>
      <p align="center" className={classes.default}>
        <strong>(оказанных услуг)</strong>
      </p>
      <p className={classes.default}>Исполнитель: ИП Фомченко И.Е</p>
      <p align="center" className={classes.default}>
        Заказчик:{" "}
        {`${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}
      </p>
      <p className={classes.default}>
        В рамках оказания информационных услуг Исполнитель предоставил Заказчику
        информацию о банках:
      </p>
      <p>
        1. Оказал устную консультацию по общим основаниям, правилам и процедурам
        предоставления кредита.
      </p>
      <p className={classes.default}>
        2. Оказал Клиенту консультацию об основных возможных причинах отказа в
        предоставлении Банками кредитов Клиенту на основе анализа Анкеты
        Клиента.
      </p>
      <p>
        3. Оказал Клиенту консультацию – рекомендации по заполнению заявления в
        Банк указанный в пункте 5 настоящего Акта для получения кредита для
        целей указанных в Приложении №1 к договору.
      </p>
      <p className={classes.default}>
        4. Оказал Клиенту устные консультации по способам обеспечения исполнения
        обязательств Клиента перед Банком по возврату кредита для получения
        кредита для целей указанных в Приложении №1 к договору.
      </p>
      <p>
        5. Оказал Клиенту устные консультации по правилам и условиям страхования
        ответственности заемщиков, разъяснил правила возврата страховой премии в
        «период охлаждения».
      </p>
      <p className={classes.default}>
        6. Произвел подбор Банка, предоставляющего кредиты на условиях,
        установленных в Анкете Клиента (Приложение №1) к настоящему договору.
      </p>
      <div className={classes.table}>
        <table border="1" cellSpacing="0" cellPadding="0" width="600">
          <tr>
            <td width="50" align="center">
              №
            </td>
            <td width="550" align="center">
              Наименование работы (услуги)
            </td>
          </tr>
          {state.completeWorks.length > 0 ? (
            printTable(state.completeWorks, arrayCompleteWorks, 2)
          ) : (
            <>
              <tr>
                <td align="center"> 1.</td>
                <td></td>
              </tr>
              <tr>
                <td align="center"> 2.</td>
                <td></td>
              </tr>
              <tr>
                <td align="center"> 3.</td>
                <td></td>
              </tr>
              <tr>
                <td align="center"> 4.</td>
                <td></td>
              </tr>
              <tr>
                <td align="center"> 5.</td>
                <td></td>
              </tr>
              <tr>
                <td align="center"> 6.</td>
                <td></td>
              </tr>
              <tr>
                <td align="center"> 7.</td>
                <td></td>
              </tr>
            </>
          )}
        </table>
      </div>
      <p>
        <strong>
          Заказчик по объему, качеству и срокам оказания услуг претензий не
          имеет.
        </strong>
        <p></p>
        <table width="688">
          <tr>
            <td width="344" colSpan="11">
              Исполнитель
            </td>
            <td width="344" colSpan="11">
              Заказчик
            </td>
          </tr>
          <tr>
            <td width="344" colSpan="11">
              <p className={classes.default}>_________________</p>
              <p className={classes.default}>Подпись</p>
            </td>
            <td width="344" colSpan="11">
              <p></p>
              <p className={classes.default}>
                __________________________________/_________________
              </p>
              <p className={classes.default}>ФИО/Подпись</p>
            </td>
          </tr>
        </table>
      </p>
    </>
  );
}
