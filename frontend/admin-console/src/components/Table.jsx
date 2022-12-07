import { Table as AntdTable, Input, Button, Space } from "antd";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const Table = (props) => {
  const { dataSource, columns } = props;
  return (
    <AntdTable
      bordered
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      width={"100%"}
      pagination={{
        pageSize: 5,
      }}
      scroll={{
        y: 240,
      }}
    />
  );
};
export default Table;
