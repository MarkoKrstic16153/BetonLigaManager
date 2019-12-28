import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";
import Timovi from "./Timovi";

const POST_IGRAC = gql`
  {
    Igrac {
      ime
      godRodjenja
      brojTelefona
      opis
    }
  }
`;
const GET_TIMOVI = gql`
  {
    Tim {
      naziv
    }
  }
`;

const DodajIgraca = () => {
  //const { loading, error, data} = useQuery(GET_TIMOVI);

  const [nizTimova, setNizTimova] = useState([]);
  const [ime, imeInput] = useInput({ type: "text" });
  const [prezime, prezimeInput] = useInput({ type: "text" });
  const [brojDresa, brojDresaInput] = useInput({ type: "number" });
  const [brojTelefona, brojTelefonInput] = useInput({ type: "text" });
  const [godinaRodjenja, godinaRodjenjaInput] = useInput({ type: "text" });
  const [opis, opisInput] = useInput({ type: "text" });
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
  let selektovaniTim;

  const [pozicija, pozicijaSelect] = useSelectPozicije();
  //const [tim, timSelect] = Timovi({tim});

  // if (loading) return 'Ucitava';
  //if (error) return `Error! ${error}`;
  // useEffect(() => {
  //    nizTimova = data;
  //  });
  return (
    <div className="">
      <label>Ime : </label>
      {imeInput}
      <label>Prezime : </label>
      {prezimeInput}
      <label>Broj Dresa : </label>
      {brojDresaInput}
      <label>Godina Rodjenja : </label>
      {godinaRodjenjaInput}
      <label>Broj Telefona : </label>
      {brojTelefonInput}
      <label>Pozicija </label>
      {pozicijaSelect}
      <label>Opis : </label>
      {opisInput}
      <label>Tim : </label>
      {Timovi}
      <button onClick={() => console.log(tim)}>Dodaj Igraca</button>
    </div>
  );

  function useInput({ type }) {
    /*<select onChange={e => selektujTim(e.target.value)}>
                <option>Izaberite Tim</option>
                {data.Tim.map((tim,index)=>
                <option value={tim.naziv} key={tim.naziv}>{(index+1) +" "+tim.naziv}</option>)}
            </select>*/

    const [value, setValue] = useState("");
    const input = (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type={type}
      />
    );
    return [value, input];
  }

  function useSelectPozicije() {
    const mogucePozicije = ["Golman", "Odbrana", "Napad", "Rezerva"];
    const [value, setValue] = useState("");
    const select = (
      <select value={value} onChange={e => setValue(e.target.value)}>
        <option>Izaberite Poziciju</option>
        {mogucePozicije.map((pozicija, index) => (
          <option value={pozicija} key={pozicija}>
            {index + 1 + " " + pozicija}
          </option>
        ))}
      </select>
    );
    return [value, select];
  }

  function useSelectTim() {}

  function selektujTim(tim) {
    selektovaniTim = tim;
  }
};

export default DodajIgraca;
