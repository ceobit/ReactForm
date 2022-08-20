import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppContext} from "../../context";
import moment from "moment";

const useStyles = makeStyles(() => ({
    default: {
        margin: 0,
        fontSize: "14px"
    },

    flex: {
        display: "flex",
        justifyContent: "space-between",
    },
    table: {
        marginTop: "10px",
        marginBottom: "10px"
    },

    td: {
        paddingTop: "20px",
    },

    mainText: {
        fontSize: "14px"
    }
}));

export default function PrintWorkStatementContent() {
    const classes = useStyles();
    const [state] = useContext(AppContext);

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
            <div className={classes.mainText}>
                <p className={classes.default}>Исполнитель: ИП Колотилина В.А.</p>
                <p className={classes.default}>
                    Заказчик:{" "}
                    {`${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}
                </p>
                <p className={classes.default}>
                    В рамках договора оказания информационных услуг «Исполнитель» оказал Клиенту
                    {` ${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`} следующие услуги:
                </p>
                <p className={classes.default}>
                    1. устную консультацию направленную на выявление финансовых рисков Клиента;
                </p>
                <p className={classes.default}>
                    2. устную консультацию по расчету кредитной нагрузки в целях своевременного исполнения клиентом
                    кредитных обязательств,
                    в том числе с учетом наличия действующих кредитных обязательств клиента;
                </p>
                <p className={classes.default}>
                    3. устную консультацию по определению кредитного рейтинга Клиента;
                </p>
                <p className={classes.default}>
                    4. устную консультацию Клиенту об основных причинах отказа в предоставлении Банками кредитов
                    заемщикам;
                </p>
                <p className={classes.default}>
                    5. услуга по подбору Банка, предоставляющего кредиты на условиях, установленных соглашением сторон в
                    Анкете Клиента (Приложение №1) к Договору, даны рекомендации по заполнению заявления на получение
                    кредита в Банк;
                </p>
                <p className={classes.default}>
                    6. устную консультацию Клиенту по способам обеспечения исполнения обязательств заемщиков перед
                    Банком по возврату кредитов, правилам и условиям страхования ответственности заемщиков,
                    рекомендациям по предоставлению обеспечения возврата кредита.
                </p>
                <p className={classes.default}>
                    7. услуга по получению дополнительной информации об условиях кредитования и проведению переговоров с
                    компетентными сотрудниками банка по средствам телефонной или почтовой электронной связи.
                    Услуга по оказанию полного информационного содействия в подаче клиентом документов, необходимых для
                    олучения клиентом решения о кредите в Банке.
                </p>
            </div>
            <p className={classes.default}>
                Вышеперечисленные услуги оказаны согласно договору своевременно и в необходимом объеме и в
                соответствии с требованиями, установленными Договором к их качеству.
            </p>
            <p align='center'>Подпись ______________________/{` ${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}</p>
            <p className={classes.default}>
                Клиент {` ${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`} претензий по объему,
                качеству и срокам оказания услуг не имеет.
            </p>
            <p align='center'>Подпись ______________________/{` ${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}</p>
            <p className={classes.default}>В рамках оказания информационных услуг Исполнитель предоставил Заказчику
                информацию о банках:</p>
            <div className={classes.table}>
                <table border="1" cellSpacing="0" cellPadding="0" width="688">
                    <tr>
                        <td width="50" align="center">
                            №
                        </td>
                        <td width="638" align="center">
                            Наименование кредитной организации (адрес, контактные данные)
                        </td>
                        <td width="638" align="center">
                            Перечень документов предоставляемых в кредитную организацию
                        </td>
                        <td width="638" align="center">
                            Параметры подобранного кредитного продукта
                        </td>
                    </tr>
                    <tr>
                        <td align="center"> 1.</td>
                        <td height="80"></td>
                        <td height="80"></td>
                        <td height="80"></td>
                    </tr>
                    <tr>
                        <td align="center"> 2.</td>
                        <td height="80"></td>
                        <td height="80"></td>
                        <td height="80"></td>
                    </tr>
                    <tr>
                        <td align="center"> 3.</td>
                        <td height="80"></td>
                        <td height="80"></td>
                        <td height="80"></td>
                    </tr>
                </table>
            </div>
            <p className={classes.default}>
                <p className={classes.default}>
                    Вышеперечисленные услуги оказаны согласно договору своевременно и
                    в необходимом объеме и в соответствии с требованиями, установленными Договором к их качеству.
                </p>
                <p align='center'>Подпись ______________________/{` ${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}</p>
                <p>
                Клиент {` ${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`} претензий по объему, качеству и срокам оказания услуг не имеет.
            </p>
                <p className={classes.default} align='center'>Подпись ______________________/{` ${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}</p>
                <table style={{'marginTop': '12px'}}>
                    <tr>
                        <td>
                            Исполнитель
                        </td>
                        <td>
                            _________________/ ИП Колотилина В.А.
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <p className={classes.default}>Подпись</p>
                        </td>
                        {/*<td width="344" colSpan="11">*/}
                        {/*    <p></p>*/}
                        {/*    <p className={classes.default}>*/}
                        {/*        __________________________________/_________________*/}
                        {/*    </p>*/}
                        {/*    <p className={classes.default}>ФИО/Подпись</p>*/}
                        {/*</td>*/}
                    </tr>
                </table>
            </p>
        </>
    );
}
