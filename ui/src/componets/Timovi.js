import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";

const GET_TIMOVI = gql`
  {
    Tim {
      naziv
    }
  }
`;

function Timovi({ onTimSelected }) {
  const { loading, error, data } = useQuery(GET_TIMOVI);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <select name="timovi" onChange={onTimSelected}>
      {data.Tim.map(tim => (
        <option key={tim.naziv} value={tim.naziv}>
          {tim.naziv}
        </option>
      ))}
    </select>
  );
}

export default Timovi;
