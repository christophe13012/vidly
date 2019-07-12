import React from "react";
import _ from "lodash";

const TableBody = ({ items, headers }) => {
  return (
    <tbody>
      {items.map(item => {
        return (
          <tr key={item._id}>
            {headers.map(header => {
              return (
                <td key={header.path}>
                  {header.content
                    ? header.content(item)
                    : _.get(item, header.path)}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
