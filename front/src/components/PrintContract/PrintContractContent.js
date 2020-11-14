import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  default: {
    margin: 0,
    padding: 0,
  },
  heading: {
    margin: "10px 0 0 0",
    padding: 0,
  },

  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  wrapper: {
    margin: "10px",
  },
}));

export default function PrintContractContent() {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);

  return (
    <div className={classes.wrapper}>
      <p align="center">
        <strong>Договор</strong>
      </p>
      <p align="center" className={classes.default}>
        об оказании информационных услуг № {state.currentFormId}
      </p>
      <div className={classes.flex}>
        <p>г. Красноярск </p>
        <p> {`${moment(state.created_at).format("DD.MM.YYYY")} г.`}</p>
      </div>
      <p className={classes.default}>
        Индивидуальный предприниматель Фомченко Иван Евгеньевич, именуемый в
        дальнейшем «Исполнитель» с одной стороны, и гражданин/ка{" "}
        {`${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}
        , именуемый в дальнейшем «Клиент», с другой стороны, совместно именуемые
        «Стороны», заключили договор на следующих условиях:
      </p>
      <p className={classes.heading}>
        <strong> Предмет договора:</strong>
      </p>
      <p className={classes.default}>
        1. В соответствии с настоящим Договором Исполнитель обязуется оказать
        Клиенту услуги, направленные на получение для Клиента решение Банка,
        либо иной кредитной организации, в том числе микрофинансовой организации
        (далее Банк) о кредите на любые цели, указанные Клиентом, а также услуги
        по оформлению документации.
      </p>
      <p className={classes.default}>
        2. Клиент обязуется оплатить оказанные ему услуги на условиях,
        определённых настоящим Договором.
      </p>
      <p className={classes.heading}>
        <strong> Права и обязанности Исполнителя:</strong>
      </p>
      <p className={classes.heading}>
        <strong> Исполнитель обязуется:</strong>
      </p>
      <p className={classes.default}>
        1. Оказать Клиенту устные консультации по общим основаниям, правилам и
        процедурам предоставления, кредита.
      </p>
      <p className={classes.default}>
        2. Оказать Клиенту консультации об основных причинах отказа в
        предоставлении Банками кредитов заемщикам.
      </p>
      <p className={classes.default}>
        3. Провести подбор Банка, предоставляющего кредиты на условиях,
        установленных соглашением сторон в Анкете Клиента (Приложение №1) к
        настоящему договору, дать рекомендации по заполнению заявления на
        получение кредита в Банк.
      </p>
      <p className={classes.default}>
        4. Оказать Клиенту устные консультации по способам обеспечения
        исполнения обязательств заемщиков перед Банком по возврату кредитов,
        правилам и условиям страхования ответственности заемщиков, дать
        рекомендации по предоставлению обеспечения возврата кредита.
      </p>
      <p className={classes.default}>
        5. В случае необходимости для получения дополнительной информации об
        условиях кредитования провести переговоры с компетентными сотрудниками
        банка по средствам телефонной или почтовой электронной связи.
      </p>
      <p className={classes.default}>
        6. Оказать полное информационное содействие в подаче документов,
        необходимых для получения решения о кредите в Банке.
      </p>
      <p className={classes.default}>
        7. Осуществлять контроль и устно информировать Клиента об этапах
        принятия Банком решения по кредиту в случае наделения Исполнителя
        полномочиями (при выдаче нотариальной доверенности).
      </p>
      <p className={classes.default}>
        8. Оказать Клиенту услуги, предусмотренные разделом договора «Порядок
        оказания и условия оплаты услуг» в срок не позднее {state.serviceTime}{" "}
        дней с даты заключения договора.
      </p>
      <p className={classes.heading}>
        <strong>Право исполнителя:</strong>
      </p>
      <p className={classes.default}>
        1. На условиях настоящего договора поручить оказание услуг третьим
        лицам.
      </p>
      <p className={classes.default}>
        2. Требовать от Клиента исполнения принятых на себя по настоящему
        Договору обязательства.
      </p>
      <p className={classes.default}>
        3. Проверить правильность оформления предоставляемых Клиентом документов
        на предмет соответствия требованиям Банка.
      </p>
      <p className={classes.default}>
        4. Получить плату за оказанные услуги по настоящему договору, а в случае
        неполучения платы требовать её передачи от Клиента.
      </p>
      <p className={classes.heading}>
        <strong>Права и обязанности Клиента:</strong>
      </p>
      <p className={classes.heading}>
        <strong>Обязанности Клиента:</strong>
      </p>
      <p className={classes.default}>
        1. В течение срока действия настоящего Договора не выдвигать исполнителю
        требований об изменении условий получения кредита, установленных
        соглашением сторон в Приложении №1 к настоящему договору.
      </p>
      <p className={classes.default}>
        2. Совместно с Исполнителем участвовать в переговорах с Банком, в
        случае, если такие переговоры необходимы, при этом проведение
        переговоров проводится в соответствии с п.3 раздела «Обязанности
        исполнителя».
      </p>
      <p className={classes.default}>
        3. Предоставить Исполнителю полную и достоверную информацию, истребуемую
        при заполнении Приложения №1 к договору, достоверные сведения, которые
        требуются для подбора Банка исполнителем
      </p>
      <p className={classes.default}>
        4. Своевременно передать Банку рекомендованному Исполнителем документы,
        необходимые для получения решения Банка о предоставлении кредита.
      </p>
      <p className={classes.default}>
        5.Присутствовать на всех мероприятиях, требующих личного участия Клиента
        либо обеспечить присутствие надлежащим образом уполномоченного
        представителя.
      </p>
      <p className={classes.default}>
        6. В срок действия настоящего Договора не предпринимать без ведома
        Исполнителя действий по получению денежных средств у любого Банка, в том
        числе и на цели, указанные в Приложении №1.
      </p>
      <p className={classes.default}>
        7. В срок действия настоящего договора не заключать с третьими лицами
        договоров, предметом которых является оказание услуг по содействию в
        получении Клиентом кредита в Банке.
      </p>
      <p className={classes.default}>
        8. При выявлении обстоятельств, значительно затрудняющих исполнение
        принятых на себя обязательств, немедленно сообщить об этом Исполнителю.
      </p>
      <p className={classes.default}>
        9. Принять услуги по Акту о приемке оказанных услуг и уплатить их
        стоимость.
      </p>
      <p className={classes.heading}>
        <strong>Права Клиента:</strong>
      </p>
      <p className={classes.default}>
        1. Обращаться к Исполнителю за устными консультациями по вопросам
        банковского кредитования.
      </p>
      <p className={classes.default}>
        2. Получать информацию о статусе рассмотрения обращения Банком через
        исполнителя в случае, если последний надлежащим образом уполномочен на
        это Клиентом (Клиентом на Исполнителя выдана нотариальная доверенность).
      </p>
      <p className={classes.default}>
        3. Требовать от Исполнителя оказания услуг по настоящему договору.
      </p>
      <p className={classes.heading}>
        <strong>Порядок оказания и оплаты услуг:</strong>
      </p>
      <p className={classes.default}>
        Оказания услуг по настоящему договору осуществляется в два этапа:
      </p>
      <p className={classes.default}>
        1. Консультирование и информационное сопровождение в соответствии с
        разделом «Права и обязанности исполнителя
      </p>
      <p className={classes.default}>
        2. Абонентское сопровождение процедуры подписания кредитного договора с
        Банком при положительном решении о выдаче кредита.
      </p>
      <p className={classes.default}>
        Оплата услуг, предусмотренных этапом №1 производится Клиентом при
        подписании настоящего договора, при этом стоимость услуг установлена
        сторонами в размере
      </p>
      <p className={classes.default}>
        {state.costFirstStep} рублей. В стоимость оказываемых на этапе №1 входят
        проведение опроса и сбор информации о клиенте (посредством его
        интервьюирования), сопоставления свойств клиента, как заемщика, с
        требованиями Банка и проведения анализа банков, подбор банка, в котором
        вероятность одобрения заявки по кредиту наиболее высока, а так же
        услуги, предусмотренные разделом «Обязанности исполнителя».
      </p>
      <p className={classes.default}>
        Оплата услуг, предусмотренных этапом №2 производится клиентом в течение
        3-х дней с момента получения положительного решения Банка о выдаче
        кредита, но не позднее момента получения наличных средств в том числе в
        виде электронного перевода) при этом стоимость услуг установлена
        сторонами
      </p>
      <p className={classes.default}>
        {state.costSecondStep} рублей. Услуги, оказываемые на этапе №2,
        представляют собой абонентское обслуживание в целях помощи в оформлении
        необходимых документов при получении кредитных денежных средств от
        Банка.
      </p>
      <p className={classes.heading}>
        <strong>В порядке абонентского обслуживания Клиент имеет право:</strong>
      </p>
      <p className={classes.default}>
        1. Обращаться к исполнителю за устными, (в т.ч. телефонными)
        консультациями и задавать вопросы относительно проекта кредитного
        договора, обращаться за разъяснением его положений. Здесь и далее под
        проектом кредитного договора подразумевается предлагаемый банком
        кредитный договор до его подписания сторонами.
      </p>
      <p className={classes.default}>
        2. Обращаться за устным, (в т.ч. телефонным) консультированием по поводу
        страхования в рамках проекта кредитного договора и процедуре отказа от
        страхования в рамках проекта кредитного договора между Клиентом и
        Банком.
      </p>
      <p className={classes.default}>
        3. Обращаться к исполнителю за помощью в составлении заявления об отказе
        от страхования, сопутствующего кредитному договору.
      </p>
      <p className={classes.default}>
        Оказание услуг, предусмотренных на этапе №2 настоящего договора является
        договором с исполнением по требованию. Оплата указанных услуг
        производится клиентом вне зависимости от фактического обращения Клиента
        за перечисленными услугами, так как исполнитель со своей стороны
        предоставил Клиенту право требовать оказания этих услуг.
      </p>
      <p className={classes.default}>
        Оплата услуг, предусмотренных этапом №2 производится Клиентом не позднее
        3-х дней после получения денежных средств по кредиту в случае, если
        Клиент решит не обращаться за услугами, предусмотренными этапом №2.
      </p>
      <p className={classes.default}>
        Оплата услуг исполнителя может быть произведена за клиента любым третьим
        лицом, о чем такое лицо должно своевременно уведомить исполнителя.
      </p>
      <p className={classes.heading}>
        <strong> Срок действия договора:</strong>
      </p>
      <p className={classes.default}>
        1. Настоящий договор вступает в силу с момента оплаты услуг,
        предусмотренных этапом №1 и действует в течение одного месяца, а в
        случае принятия рекомендованным Банком положительного решения, до дня
        фактического получения кредитных денежных средств Клиентом.
      </p>
      <p className={classes.default}>
        2. Если последний день срока действия договора приходится на нерабочий
        день, днем окончания срока считается следующий за ним рабочий день.
      </p>
      <p className={classes.default}>
        3. Действие настоящего договора считается продленным в случае, если на
        момент окончания срока его действия были поданы в Банк документы, и они
        находятся на рассмотрении Банка. В том случае действие договора
        продлевается до дня принятия банком решения либо до получения кредитных
        денежных средств Клиентом.
      </p>
      <p className={classes.heading}>
        <strong>Порядок передачи и приема оказанных услуг.</strong>
      </p>
      <p className={classes.default}>
        1. По факту оказания предусмотренных договором услуг стороны подписывают
        акт оказанных услуг не позднее трех дней с момента их оказания
      </p>
      <p className={classes.default}>
        2. Услуги считаются оказанными Исполнителем и принятыми Клиентом после
        подписания Акта оказанных услуг.
      </p>
      <p className={classes.default}>
        3. В случае, если Клиент отказывается от подписания акта, подписанный со
        стороны Исполнителя Акт направляется заказным письмом с уведомлением о
        вручении Клиенту по адресу, указанному им при подписании договора. В
        этом случае Акт о приемке оказанных услуг считается подписанным
        Клиентом.
      </p>
      <p className={classes.heading}>
        <strong>Досрочное расторжение договора.</strong>
      </p>
      <p className={classes.default}>
        1. Клиент вправе до подписания Акта приемки выполненных работ в
        одностороннем порядке досрочно расторгнуть настоящий договор путем
        направления Исполнителю заявления на расторжение договора, при этом
        внесенная Исполнителем оплата возвращается Клиенту, за вычетом стоимости
        фактически оказанных Исполнителем услуг.
      </p>
      <p className={classes.default}>
        2. Уведомление о расторжении договора должно быть сделано сторонами в
        письменном виде.
      </p>
      <p className={classes.heading}>
        <strong>Ответственность сторон</strong>
      </p>
      <p className={classes.default}>
        1. При множественности лиц со стороны Клиента их обязательства
        (ответственность) являются солидарными.
      </p>
      <p className={classes.default}>
        2. Сторона, не исполнившая или исполнившая ненадлежащим образом
        обязательства по договору, несет ответственность в соответствии с
        действующим законодательством.
      </p>
      <p className={classes.default}>
        3. Отсутствие вины за неисполнение или ненадлежащее исполнение договора
        доказывается стороной, допустившей нарушение (неисполнение).
      </p>
      <p className={classes.default}>
        4. Ответственность за последствия, связанные с предоставлением
        Исполнителю недостоверных документов и (или) информации, а так же за не
        предоставление необходимых для оказания услуг документов или информации,
        возлагается в полном объеме на Заказчика.
      </p>
      <p className={classes.heading}>
        <strong>Порядок разрешения споров.</strong>
      </p>
      <p className={classes.default}>
        1. При возникновении разногласий Стороны будут стремиться разрешить в
        досудебном (претензионном) порядке.
      </p>
      <p className={classes.default}>
        2. Для целей настоящего договора под претензионным порядком понимается
        фиксирование юридических фактов, имеющих значение для дальнейшего
        разрешения спора, в том числе направление требования одной стороны к
        другой в письменном виде, который позволяет однозначно установить
        основания требования, дату его предъявления и т.п.
      </p>
      <p className={classes.default}>
        3. Споры, не урегулированные в досудебном порядке, подлежат разрешению в
        суде общей юрисдикции. Стороны определили договорную территориальную
        подсудность по месту нахождения Исполнителя: судебный участок № 48 в
        Железнодорожном районе г. Красноярска или в Железнодорожный районный суд
        г. Красноярска.
      </p>
      <p className={classes.default}>
        4. Стороны при этом не лишены прав, предоставленных процессуальным
        законодательством РФ.
      </p>
      <p className={classes.heading}>
        <strong>Заключительные положения.</strong>
      </p>
      <p className={classes.default}>
        1. Настоящий договор составлен в двух экземплярах, имеющих равную
        юридическую силу, по одному для каждой из сторон.
      </p>
      <p className={classes.default}>
        2. Настоящий договор не является договором присоединения и подтверждает
        право Клиента на изменения его существенных условий.
      </p>
      <p className={classes.default}>
        3. Все изменения, дополнения к настоящему договору действительны в
        случае, если они составлены в письменном виде и подписанные сторонами.
      </p>
      <p className={classes.default}>
        4. Клиент подтверждает, что при заключении договора он был в достаточной
        степени осведомлен об информационной и посреднической природе
        оказываемых услуг и был вправе как заключать договор, так и отказаться
        от его заключения.
      </p>
      <p className={classes.heading}>
        <strong>Адреса и реквизиты сторон:</strong>
      </p>
      <table
        border="0"
        cellSpacing="0"
        cellPadding="0"
        align="left"
        width="600"
      >
        <tbody>
          <tr>
            <td width="300" valign="top">
              <p>
                <strong>Исполнитель: </strong>
              </p>
              <p className={classes.default}>ИП Фомченко Иван Евгеньевич</p>
              <p className={classes.default}>
                660077, г. Красноярск ул. Авиаторов, д. 21 офис 656.
              </p>
              <p className={classes.default}>
                Почтовый адрес для корреспонденции 660077
              </p>
              <p className={classes.default}>ОГРНИП 319246800133560</p>
              <p className={classes.default}>
                Филиал Точка Публичного акционерного общества
              </p>
              <p className={classes.default}>
                Банка «Финансовая Корпорация Открытие»
              </p>
              <p className={classes.default}>
                р/сч 40802810706500005300 БИК 044525999
              </p>
              <p className={classes.default}>кор.сч. 30101810845250000999</p>
              <p className={classes.default}>тел. +79233410100, +79233410300</p>
              <p className={classes.default}>Фомченко И.Е</p>
            </td>
            <td width="300" valign="top">
              <p>
                <strong>Заказчик:</strong>
              </p>
              <p
                className={classes.default}
              >{`${state.clientSurname} ${state.clientName} ${state.clientPatronymic}`}</p>
              <p className={classes.default}>
                Паспорт РФ: Серия: {state.passSerial} номер: {state.passNumber}
              </p>
              <p className={classes.default}>
                дата выдачи: {moment(state.issueDate).format("DD.MM.YYYY")}
              </p>
              <p className={classes.default}>
                выдан: {state.passDepartment} код подразделения:
                {state.passDepartmentCode}
              </p>
              <p className={classes.default}>Тел. {state.mobilePhone}</p>
            </td>
          </tr>
          <tr>
            <td width="300">
              <p>Подпись ______________________/</p>
            </td>
              <td width="300">
                  <p>Подпись ______________________/</p>
              </td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong></strong>
      </p>
      <p>
        <strong></strong>
      </p>
      <p>
        <strong></strong>
      </p>
    </div>
  );
}