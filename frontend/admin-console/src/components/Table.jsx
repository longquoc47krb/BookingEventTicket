import { Table as AntdTable } from "antd";

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
    />
  );
};
export default Table;
