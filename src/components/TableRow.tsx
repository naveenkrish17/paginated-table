import { TableRow } from "./Table";

type TableRowProps = {
  index: number;
  data: TableRow;
};

const TableRowComponent: React.FunctionComponent<TableRowProps> = (
  props
): any => {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.data.name}</td>
      <td>{props.data.username}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
    </tr>
  );
};

export default TableRowComponent;
