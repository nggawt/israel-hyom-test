import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormatToDb} from "../utils/helpers/Dt";

const TabelComponent = ({
  headData,
  dataItems,
  tableClicked,
  onDeleteWriter,
  pageId,
}) => {
  console.log("Data table", dataItems);
  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr
          className="text-start"
          style={{
            cursor: "pointer",
          }}
        >
          {headData &&
            typeof headData === "object" &&
            Object.keys(headData).map((item, idx) => (
              <th key={idx}>{headData[item]}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {dataItems &&
          dataItems.length &&
          dataItems.map((items, index) => (
            <tr
              key={items.id}
              onClick={(e) => tableClicked(e, items)}
              style={{
                cursor: "pointer",
              }}
            >
              {Object.keys(items).map((item, idx) => {
                return item in headData ? (
                  <td
                    key={index + "" + idx}
                    dir="rtl"
                    className="text-start"
                  >
                    {item === "login_at" ||
                      item === "logout_at"
                      ? FormatToDb(
                        new Date(items[item]),
                        true
                      )
                      : items[item]}
                  </td>
                ) : null;
              })}
              <td>
                <Button
                  to={`${items.id}/edit-writer?page=${pageId}`}
                  as={Link}
                  size="sm"
                  variant="outline-warning"
                  onClick={(e) =>
                    tableClicked(e, items, "edit")
                  }
                >
                  Edit
                </Button>{" "}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={(e) => onDeleteWriter(e, items.id)}
                >
                  Danger
                </Button>{" "}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TabelComponent;
