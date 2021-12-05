import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import initialState from "../data/initialState";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Search } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";

function createData(
  state,
  id,
  createDate,
  loanAmount,
  loanPeriod,
  clientSurname,
  clientName,
  clientPatronymic,
  birthDayDate
) {
  return {
    state,
    id,
    createDate,
    loanAmount,
    loanPeriod,
    clientSurname,
    clientName,
    clientPatronymic,
    birthDayDate,
  };
}

const createRows = (forms = []) => {
  return Array.from(
    forms.map((item, index) =>
      createData(
        index,
        item.formNumber,
        moment(item.created_at).format("DD.MM.YYYY"),
        item.loanAmount,
        item.loanPeriod,
        item.clientSurname,
        item.clientName,
        item.clientPatronymic,
        moment(item.birthDayDate).format("DD.MM.YYYY")
      )
    )
  );
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "state", numeric: false, disablePadding: true, label: "№" },
  { id: "id", numeric: true, disablePadding: false, label: "Номер документа" },
  {
    id: "createDate",
    numeric: true,
    disablePadding: false,
    label: "Дата cоздания",
  },
  {
    id: "loanAmount",
    numeric: true,
    disablePadding: false,
    label: "Сумма кредита",
  },
  {
    id: "loanPeriod",
    numeric: true,
    disablePadding: false,
    label: "Срок кредита",
  },
  {
    id: "clientSurname",
    numeric: true,
    disablePadding: false,
    label: "Фамилия",
  },
  { id: "clientName", numeric: true, disablePadding: false, label: "Имя" },
  {
    id: "clientPatronymic",
    numeric: true,
    disablePadding: false,
    label: "Отчество",
  },
  {
    id: "birthDayDate",
    numeric: true,
    disablePadding: false,
    label: "Дата рождения",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Выбраны все записи" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {},
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(2),
  },
  searchInput: {
    width: "75%",
  },
}));

const EnhancedTableToolbar = ({
  numSelected,
  handleChangeForm = (f) => f,
  handleSearch = (f) => f,
}) => {
  const classes = useToolbarStyles();

  const history = useHistory();

  const handleCreateForm = () => {
    history.push("/create");
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <div className={classes.buttons}>
          <Typography
            className={classes.title}
            color="primary"
            variant="subtitle1"
            component="div"
          >
            {numSelected} Выбрано
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleCreateForm}
          >
            {" "}
            Открыть
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleChangeForm}
          >
            {" "}
            Редактировать
          </Button>
        </div>
      ) : (
        <div className={classes.buttons}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Клиенты
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleCreateForm}
          >
            {" "}
            Создать
          </Button>
        </div>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <TextField
              label="Поиск клиента"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // selected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [state, setState] = useContext(AppContext);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [forms, setForms] = useState([]);
  const [savedStateForm, setSavedStateForm] = useState([]);

  const { request } = useHttp();
  const token = useContext(AuthContext);
  const history = useHistory();

  let rows = [];

  const fetchForms = useCallback(async () => {
    try {
      const data = await request("/api/form", "GET", null, {
        Authorization: `Bearer${token}`,
      });
      setForms((prev) => [...prev, ...data.data]);
      setSavedStateForm((prev) => [...prev, ...data.data]);
    } catch (e) {
      console.log("ошибка при получении данных на главной странице");
    }
  }, [request]);

  //При открытии обнулим стейт
  useEffect(() => {
    const userName = state.userName;
    const login = state.login;
    setState({ ...initialState, userName, login });
  }, []);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      currentFormId: "",
      submit: false,
      pullData: false,
    }));
    fetchForms();
  }, [fetchForms]);

  rows = createRows(forms);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id, currentId) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    let currentFormId;

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);

    currentFormId = selectedIndex !== 0 ? currentId : "";

    setState((state) => {
      return { ...state, currentFormId: currentFormId };
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  //Поиск в таблице
  const handleSearch = (e) => {
    let target = e.target;
    let result = [];
    if (target.value === "") {
      setForms([...savedStateForm]);
    } else {
      //Поиск по фамилии
      result = forms.filter((x) =>
        x.clientSurname.toLowerCase().includes(target.value.toLowerCase())
      );
      //Поиск по номеру документа
      if (result.length === 0) {
        debugger;
        result = forms.filter((x) => String(x.formNumber).includes(target.value));
      }
      setForms([...result]);
    }
  };

  //Установим признак режима редактирования
  const handleChangeForm = () => {
    history.push("/create");
    setState((state) => {
      return { ...state, needChangeForm: true };
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleChangeForm={handleChangeForm}
          handleSearch={handleSearch}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.state);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.state, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index + 1}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.createDate}</TableCell>
                      <TableCell align="right">{row.loanAmount}</TableCell>
                      <TableCell align="right">{row.loanPeriod}</TableCell>
                      <TableCell align="right">{row.clientSurname}</TableCell>
                      <TableCell align="right">{row.clientName}</TableCell>
                      <TableCell align="right">
                        {row.clientPatronymic}
                      </TableCell>
                      <TableCell align="right">{row.birthDayDate}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Компактно"
      />
    </div>
  );
}
