import { useEffect, useState } from "react";
import { USERS_API } from "../GlobalConstants";
import TableRowComponent from "./TableRow";
import axios from "axios";

export type TableRow = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
};

type UserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserAddressGeo;
};

type UserAddressGeo = {
  lat: string;
  lang: string;
};

export const Table: React.FunctionComponent = (): any => {
  const [data, setData] = useState<TableRow[] | []>([]);
  const [offset, setOffset] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(5);

  let limitedData = [];
  limitedData = data?.slice(offset, offset + rowCount);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(USERS_API);
      setData([
        ...response.data,
        ...response.data,
        ...response.data,
        ...response.data,
      ]);
    };
    getData();
  }, []);

  const pageButtonLength =
    data.length % rowCount === 0
      ? data.length / rowCount
      : data.length / rowCount + 1;

  const pageButtons = Array.from(
    { length: pageButtonLength },
    (_, index) => index + 1
  );

  const handleNext = () => {
    setOffset(offset + rowCount);
  };

  const handlePrevious = () => {
    setOffset(offset - rowCount);
  };

  return (
    <div>
      <select
        value={rowCount}
        onChange={(e) => setRowCount(Number(e.target.value))}
        name="rowCount"
        id="rowCount"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {limitedData &&
            limitedData.map((el, index) => (
              <TableRowComponent key={index} index={index} data={el} />
            ))}
        </tbody>
      </table>
      {offset + rowCount < data.length && (
        <button onClick={handleNext}>Next</button>
      )}
      {offset - rowCount >= 0 && (
        <button onClick={handlePrevious}>Previous</button>
      )}
      <div>
        {pageButtons.map((el) => (
          <button onClick={() => setOffset(el * rowCount - rowCount)}>
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};
