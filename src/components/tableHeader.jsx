import React from "react";

const TableHeader = ({ headers, onSort, sort }) => {
  const classe = "fa fa-sort-" + sort.order;
  return (
    <thead>
      <tr>
        {headers.map(header => {
          return (
            <th
              key={header.path}
              onClick={header.sort ? () => onSort(header.path) : undefined}
            >
              {header.label}{" "}
              {sort.path === header.path && (
                <i className={classe} aria-hidden="true" />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
