import { Table as AntdTable } from "antd";
import { t } from "i18next";
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Table = (props) => {
  const { dataSource, columns } = props;
  return (
    <AntdTable columns={columns} dataSource={dataSource} onChange={onChange} />
  );
};
export default Table;
