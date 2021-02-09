import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformance } from "../store/actions";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function ShowPerformance() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [periode, setPeriode] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const kompositColor = (color) => {
    if (color === "merah") return "red";
    if (color === "hijau") return "green";
    if (color === "kuning") return "yellow";
  };
  React.useEffect(() => {
    dispatch(fetchPerformance());
  }, []);

  React.useEffect(() => {
    let temp = [];
    state.performances.forEach((performance) => {
      temp.push(performance.periode);
    });
    setPeriode([...new Set(temp)]);
    console.log(periode, "<<< periode");
  }, [state.performances]);

  const filterPerfromance = (e) => {
    e.preventDefault();
    setFiltered(
      [...state.performances].filter((item) => item.periode.includes(filter))
    );
  };
  return (
    <React.Fragment>
      <div className="has-text-centered">
        <h1 className="title">Kinerja Bank</h1>
        <form onSubmit={filterPerfromance} style={{ display: "inline-block" }}>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Periode:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select
                      name="filter"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">Semua Periode</option>
                      {periode.map((period) => {
                        return (
                          <option
                            selected={period == filter ? true : false}
                            value={period}
                          >
                            {period}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="button is-link">
            View
          </button>
        </form>

        <table
          class="table is-bordered mt-5"
          style={{ marginLeft: "auto", marginRight: "auto" }}
          id="performance-table"
        >
          <thead>
            <tr>
              <th>Periode</th>
              <th>NPL</th>
              <th>ROA</th>
              <th>ROE</th>
              <th>LDR</th>
              <th>BOPO</th>
              <th>CAR</th>
              <th>Kr</th>
              <th>Pr</th>
              <th>Lk</th>
              <th>Ef</th>
              <th>Re</th>
              <th>Komposit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              return (
                <tr>
                  <td>{item.periode}</td>
                  <td>{item.NPL}%</td>
                  <td>{item.ROA}%</td>
                  <td>{item.ROE}%</td>
                  <td>{item.LDR}%</td>
                  <td>{item.BOPO}%</td>
                  <td>{item.CAR}%</td>
                  <td
                    style={{
                      backgroundColor: item.Kr === "merah" ? "red" : "green",
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: item.Pr === "merah" ? "red" : "green",
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: item.Lk === "merah" ? "red" : "green",
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: item.Ef === "merah" ? "red" : "green",
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: item.Re === "merah" ? "red" : "green",
                    }}
                  ></td>
                  <td
                    style={{ backgroundColor: kompositColor(item.Komposit) }}
                  ></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button button is-primary"
          table="performance-table"
          filename="performance-table"
          buttonText="Export"
        />
      </div>
    </React.Fragment>
  );
}

export default ShowPerformance;
