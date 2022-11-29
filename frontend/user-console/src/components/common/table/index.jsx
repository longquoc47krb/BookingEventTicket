import { get } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
function TableRowCell({ item, column }) {
  const value = get(item, column.key);
  return (
    <td className="text-left py-3 px-4 text-black text-sm ">
      {column.render ? column.render(column, item) : value}
    </td>
  );
}
function TableHeader({ columns }) {
  return (
    <tr>
      {columns.map((column, columnIndex) => (
        <th
          key={`table-head-cell-${columnIndex}`}
          style={{ width: column.width }}
          className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm"
        >
          {t(column.title)}
        </th>
      ))}
    </tr>
  );
}
function TableRow({ data, columns }) {
  return (
    <>
      {data.map((item, itemIndex) => (
        <tr
          key={`table-body-${itemIndex}`}
          className={itemIndex % 2 === 1 ? "bg-gray-100" : ""}
        >
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </tr>
      ))}
    </>
  );
}
function Table({ data, columns }) {
  const { t } = useTranslation();
  return (
    <div class="overflow-hidden rounded border-b border-gray-200">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <TableHeader columns={columns} />
        </thead>
        <tbody class="text-gray-700">
          <TableRow data={data} columns={columns} />
        </tbody>
      </table>
    </div>
  );
}

export default Table;
