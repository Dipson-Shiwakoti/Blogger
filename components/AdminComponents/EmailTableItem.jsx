import React from "react";

const EmailTableItem = ({ email, mongoId, date, deleteEmail }) => {
  const emailDate = new Date(date);
  return (
    <tr className="bg-whtie border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "No Email"}
      </th>
      <td className="px-6 py-4 hidden sm:block">{emailDate.toDateString()}</td>
      <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => deleteEmail(mongoId)}
      >
        X
      </td>
    </tr>
  );
};

export default EmailTableItem;
