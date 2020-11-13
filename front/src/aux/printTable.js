import ReactHtmlParser from "react-html-parser";

const printTable = (stateTable, array, col = 1) => {
  let html = [];
  html.push(`<tr>`);
  stateTable.forEach((el, i) => {
    if (array.length > 1) {
      if ((i + 1) % array.length === 0) {
        html.push(
          `<td width="174" colSpan=${
            array.length === 4 ? col + 1 : col
          } align="center"><p className={classes.default}>${el}</p></td>`
        );
        html.push("</tr>");
        html.push("<tr>");
      } else {
        html.push(
          `<td width="174" colSpan=${col} align="center"><p className={classes.default}>${el}</p></td>`
        );
      }
    } else {
        html.push(`<td align="center"><p className={classes.default}>${i+1}</p></td>`);
        html.push(
            `<td width="174" colSpan=${col} align="center"><p className={classes.default}>${el}</p></td>`
        );
        html.push("</tr>");
        html.push("<tr>");
    }
  });
  html.push(`</tr>`);
  return ReactHtmlParser(html.join(" "));
};

export default printTable;
