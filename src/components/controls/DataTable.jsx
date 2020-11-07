import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";

const DataTable = (props) => {
  const { columns, data, actions } = props;
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
        toolbar: false,
        actionsColumnIndex: -1,
        headerStyle: {
          fontSize: 20,
        },
      }}
      {...props}
    />
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  actions: PropTypes.array,
};

export default DataTable;
