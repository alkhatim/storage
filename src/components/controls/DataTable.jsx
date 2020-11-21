import React from "react";
import MaterialTable from "material-table";

const DataTable = (props) => {
  const { columns, data, actions, editable } = props;
  return (
    <MaterialTable
      columns={columns}
      data={data}
      actions={actions}
      localization={{
        header: {
          actions: "",
        },
      }}
      options={{
        toolbar: editable ? true : false,
        actionsColumnIndex: -1,
        headerStyle: {
          fontSize: 20,
        },
      }}
      editable={editable}
      {...props}
    />
  );
};

export default DataTable;
