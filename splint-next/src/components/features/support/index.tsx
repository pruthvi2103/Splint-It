import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineRight } from 'react-icons/ai';
import { getAllTickets } from '../../../../services/client/ticket';
import { ITicket } from '../../../../services/server/tickets/ticket.types';
import { tableActionBtn } from '../../shared/Button';
import ChatPopUp from '../chat-popup';
import Header from '../demopage/Header';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../support/table/index';
import { ReAssignModal } from './ReAssignModal';

const Support = () => {
  const [tickets, setTickets] = useState<ITicket[] | null>([]);
  //   const [openReAssignModal, setOpenReAssignModasl] = useState(true);

  const reAssignMentors = (id: string) => {};

  // table columns
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: 'imgUrl',
        emailAccessor: 'email',
      },
      {
        Header: 'Query',
        accessor: 'query',
      },
      {
        Header: 'Subject',
        accessor: 'subject',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        Cell: StatusPill,
      },
      {
        Header: 'Action',
        Cell: (props: any) => {
          switch (props.row.original.status) {
            case 'ongoing':
              reAssignMentors(props.original._id);
              return <div className='flex'>{tableActionBtn('re-assign')}</div>;
              break;
            case 'pending':
              return <div className='flex'>{tableActionBtn('address')}</div>;
              break;
            case 'completed':
              return null;
              break;
            case 'urgent':
              return <div className='flex'>{tableActionBtn('address')}</div>;
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

    const getTicketsData = async () => {
      const data = await getAllTickets();
      setTickets(data);
    };
    if (isFetching) {
      getTicketsData();
    }
    () => {
      isFetching = false;
    };
  }, []);
  return (
    <div className='relative'>
      <Header />
      {/* Layout */}
      {/* Left Nav */}
      <div className=' w-36 rounded-r-md  absolute top-36 left-0 h-24 flex items-start pl-3 justify-center flex-col shadow-sm bg-indigo-400'>
        <p className=' font-medium flex items-center justify-start mt-1 text-gray-100'>
          <AiOutlineRight className='mr-1' /> Support
        </p>
        <p className=' font-medium  flex items-center justify-center text-gray-100 mt-1.5'>
          <AiOutlineArrowRight className='ml-5  mr-1' /> Tickets
        </p>
      </div>
      {/* Table */}
      <div className=''>
        <div className='min-h-screen bg-gray-100 text-gray-900 pt-12'>
          <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
            <div className=''>
              {/* <h1 className='text-xl font-semibold'>React Table + Tailwind CSS = ❤</h1> */}
            </div>
            <div className='mt-6'>
              <Table columns={columns} data={tickets} />
            </div>
          </main>
        </div>
      </div>
      {/* Chat */}
      <div>
        <ChatPopUp />
      </div>
      {/* <ReAssignModal isModalOpen={openReAssignModal} handleCloseModal={() => setOpenReAssignModal(false)} /> */}
    </div>
  );
};

export default Support;
