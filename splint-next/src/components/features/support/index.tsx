import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import {
  getAllTickets,
  getAssignedTicket,
} from "../../../../services/client/ticket";
import { UserRoles } from "../../../../services/server/account/account.types";
import { assignTicket } from "../../../../services/client/ticket";
import {
  ITicket,
  TicketStatus,
} from "../../../../services/server/tickets/ticket.types";
import useChat from "../../../hooks/useChat";
import useOnlineUsers from "../../../hooks/useUserRoom";
import { tableActionBtn } from "../../shared/Button";
import ChatPopUp from "../chat-popup";
import Header from "../demopage/Header";
import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
} from "../support/table/index";
import { ReAssignModal } from "./ReAssignModal";

const Support = () => {
  const [tickets, setTickets] = useState<ITicket[] | null>([]);
  const [isTicketAssigned, setIsTicketAssigned] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  //   const [openReAssignModal, setOpenReAssignModasl] = useState(true);
  const getTicketsData = async () => {
    const data = await getAllTickets();
    setTickets(data);
  };
  const reAssignMentors = async (queryData) => {
    const res = await assignTicket({
      query: queryData.query,
      asigneee: "",
      status: TicketStatus.PENDING,
    });
    getTicketsData();
  };
  const fetchTicketsForMentor = async () => {
    const res = await getAssignedTicket();
    if (res.length) {
      setIsTicketAssigned(true);
    }
  };
  useEffect(() => {
    fetchTicketsForMentor();
  }, [status]);
  useEffect(() => {
    if (status !== "loading") {
      if (session?.user.type === UserRoles.STUDENT) {
        router.push("/demo");
      }
    }
  }, [status]);
  const assingSelfToTicket = async (queryData) => {
    console.log(queryData);

    const res = await assignTicket({
      query: queryData.query,
      asigneee: session?.user.email,
      status: TicketStatus.ONGOING,
    });
    if (res) {
      getTicketsData();
      setIsTicketAssigned(true);
    }
  };
  // table columns
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Query",
        accessor: "query",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        Cell: StatusPill,
      },
      {
        Header: "Action",
        Cell: (props: any) => {
          switch (props.row.original.status) {
            case "ongoing":
              return (
                <div
                  onClick={() => reAssignMentors(props.row.original)}
                  className="flex"
                >
                  {tableActionBtn("re-assign")}
                </div>
              );
              break;
            case "pending":
              return (
                <div
                  onClick={() => assingSelfToTicket(props.row.original)}
                  className="flex"
                >
                  {tableActionBtn("address")}
                </div>
              );
              break;
            case "completed":
              return null;
              break;
            case "urgent":
              return (
                <div
                  onClick={() => assingSelfToTicket(props.row.original)}
                  className="flex"
                >
                  {tableActionBtn("address")}
                </div>
              );
              break;
            default:
              break;
          }
        },
      },
    ],
    []
  );

  //
  useEffect(() => {
    let isFetching = true;

    if (isFetching) {
      getTicketsData();
    }
    () => {
      isFetching = false;
    };
  }, []);
  const { beOnline, onlineUsers } = useOnlineUsers();
  return (
    <div className="relative">
      <Header session={session} status={status}></Header>
      {/* Layout */}
      {/* Left Nav */}
      <div className=" w-36 rounded-r-md  absolute top-36 left-0 h-24 flex items-start pl-3 justify-center flex-col shadow-sm bg-indigo-400">
        <p className=" font-medium flex items-center justify-start mt-1 text-gray-100">
          <AiOutlineRight className="mr-1" /> Support
        </p>
        <p className=" font-medium  flex items-center justify-center text-gray-100 mt-1.5">
          <AiOutlineArrowRight className="ml-5  mr-1" /> Tickets
        </p>
      </div>
      {/* Table */}
      <div className="">
        <div className="min-h-screen bg-gray-100 text-gray-900 pt-12">
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
              {/* <h1 className='text-xl font-semibold'>React Table + Tailwind CSS = ❤</h1> */}
            </div>
            <div className="mt-6">
              <Table columns={columns} data={tickets} />
            </div>
          </main>
        </div>
      </div>
      {/* Chat */}
      <div>{isTicketAssigned && <ChatPopUp onlineUsers={onlineUsers} />}</div>
      {/* <ReAssignModal isModalOpen={openReAssignModal} handleCloseModal={() => setOpenReAssignModal(false)} /> */}
    </div>
  );
};

export default Support;
