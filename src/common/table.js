import * as React from "react";
import "./table.css";

const Table = (props) => {
  const headerTitles = props.titles;
  const elements = props.Elements;

  return (
    <table>
      <thead>
        <tr>
          {headerTitles.forEach((title) => {
            <td>{title}</td>;
          })}
        </tr>
      </thead>
      {elements.forEach((element) => {
        <tr>{element.value}</tr>;
      })}
    </table>
  );
};

export default Table;
