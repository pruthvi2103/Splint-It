import React, { useState } from "react";
import { Subjects } from "../../../../services/server/account/account.types";
import { ICreateTicketPayload } from "../../../../services/server/tickets/ticket.types";

type Props = {
  handleCreateTicket: (
    queryData: Omit<ICreateTicketPayload, "raisedBy">
  ) => void;
};

const CreateQueryArea: React.FC<Props> = ({ handleCreateTicket }) => {
  const [queryData, setqueryData] = useState({
    query: "",
    subject: Subjects.CHEMISTRY,
  });
  return (
    <div className="px-5 py-2.5 flex flex-col gap-2">
      <p>Have a Query? Chat with us</p>
      <label>
        Query
        <input
          className="border-2 mx-2"
          onChange={(e) => {
            setqueryData((prevData) => {
              return {
                ...prevData,
                query: e.target.value,
              };
            });
          }}
          value={queryData.query}
        ></input>
      </label>
      <label>
        Subject
        <select
          onChange={(e) => {
            setqueryData((prevData) => {
              return {
                ...prevData,
                subject: e.target.value as unknown as Subjects,
              };
            });
          }}
          className="border-2 mx-2"
          value={queryData.subject}
        >
          <option defaultChecked value={Subjects.CHEMISTRY}>
            {Subjects.CHEMISTRY}
          </option>
          <option value={Subjects.PHYSICS}>{Subjects.PHYSICS}</option>
          <option value={Subjects.MATHS}>{Subjects.MATHS}</option>
        </select>
      </label>
      <button onClick={() => handleCreateTicket(queryData)} className="btn">
        Start Chat
      </button>
    </div>
  );
};

export default CreateQueryArea;
