import React, { Fragment, useEffect, useState } from "react";
import { getDocument } from "../../../actions/documentActions";
import M from "materialize-css";

export const Document = (props) => {
  const [doc, setDoc] = useState({ files: [] });

  useEffect(() => {
    const fetch = async () => {
      const tree = document.querySelectorAll(".collapsible");
      M.Collapsible.init(tree, {});
      const data = await getDocument(props.match.params.id);
      if (data) setDoc(data);
    };
    fetch();
  }, [props]);

  return (
    <Fragment>
      <h4>Document Files</h4>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">
            <p className="mr-2">Barcode: {doc.barcode}</p>
            <p>Warehouse: {doc.warehouse}</p>
          </div>
          <div className="collapsible-body">
            <ul
              style={{
                borderLeft: "1px dashed",
              }}
            >
              {doc.files.map((file) => (
                <li>-- {file}</li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

export default Document;
