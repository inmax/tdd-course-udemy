import React, { useState } from "react";
import { connect } from "react-redux";
import { agregar, eliminar } from "./reducers/finanzas";
import "./App.css";

function Titulo() {
  return <h2 className="title">Finanzly</h2>;
}

function Form({ agregarFinanza }) {
  const [cant, setCant] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    agregarFinanza({ desc, cant: Number(cant) });
    setDesc("");
    setCant("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="column is-half">
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              value={desc}
              placeholder="Descripción"
              onChange={e => setDesc(e.target.value)}
              type="text"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-align-justify" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              value={cant}
              placeholder="Cantidad"
              onChange={e => setCant(e.target.value)}
              type="number"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-money-bill-alt" />
            </span>
          </p>
        </div>
        <button className="button is-primary" type="submit" value="Enviar">
          Enviar
        </button>
      </div>
    </form>
  );
}

function Dashboard({ valor }) {
  return (
    <div className="column is-half">
      <div className="box">
        <p>Total</p>
        <strong>{valor}</strong>
      </div>
    </div>
  );
}

function Finanzas({ finanzas, eliminarFinanza }) {
  return (
    <div className="column is-half">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {finanzas.map((x, i) => (
            <tr key={i}>
              <td>{x.desc}</td>
              <td>{x.cant}</td>
              <td>
                <button
                  className="button is-warning"
                  onClick={() => eliminarFinanza(i)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App({ finanzas, agregarFinanza, eliminarFinanza }) {
  const total = finanzas.reduce((acc, el) => acc + el.cant, 0);
  return (
    <div className="section">
      <div className="container">
        <Titulo />
        <Form agregarFinanza={agregarFinanza} />
        <Dashboard valor={total} />
        <Finanzas finanzas={finanzas} eliminarFinanza={eliminarFinanza} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  agregarFinanza: finanza => dispatch(agregar(finanza)),
  eliminarFinanza: index => dispatch(eliminar(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
