import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";

const GET_IGRAC = gql`
  {
    Igrac {
      ime
      god_rodjenja
      broj_telefona
      opis
    }
  }
`;

const Igrac = () => {
  const { loading, error, data } = useQuery(GET_IGRAC);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div className="Igrac-info">
      {data.Igrac.length === 0 ? null : (
        <div>
          {" "}
          <p>First name : {data.Igrac[0].ime}</p>
          <p>Last name : {data.Igrac[0].god_rodjenja}</p>
          <p>Number : {data.Igrac[0].broj_telefona}</p>
      <p>Opis : {data.Igrac[0].opis}</p>
          {console.log(data.Igrac)}
        </div>
      )}
    </div>
  );
};

export default Igrac;
