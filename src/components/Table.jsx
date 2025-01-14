import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { clearEditedItem, clearViewedItem, setActiveTab, setViewedItem } from '../redux/tabContents/tabSlice';
import { useLocation } from 'react-router-dom';
import { deleteApi } from '../service/api/api';
import { Error, Success } from './Notification';

const Table = ({ data, columnHeaders, exportFileName = 'table_data' }) => {
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch()
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        dispatch(clearViewedItem())
        dispatch(clearEditedItem())


        if (Array.isArray(data)) {
            setTableData(data);
        }
    }, [data]);

    const handleView = (id) => {
        dispatch(setViewedItem(id));
        dispatch(setActiveTab("add"))
    }

    const handleDelete = async (id) => {
        const currentPage = pathname.split('/')[2];
        const endpoints = {
            'role-management': `/admin/deleteRole/${id}`,
            company: `/api/companies/${id}`,
            role: `/api/roles/${id}`
        };
    
        const endpoint = endpoints[currentPage];
        
        try {
            const response = await deleteApi(endpoint);
            if (response.status === 200) {
                setTableData(prevData => prevData.filter(item => item.id !== id));
                Success('Item successfully deleted');
            }
        } catch (error) {
            console.error('Delete operation failed:', error);
            
            switch (error.response?.status) {
                case 400:
                    Error('ID not found. Please check and try again.');
                    break;
                case 404:
                    Error('No roles found with this ID.');
                    break;
                case 500:
                    Error('Server error occurred. Please try again later.');
                    break;
                default:
                    Error('Failed to delete item. Please try again.');
            }
        }
    };

    const columns = [
        ...columnHeaders.map((header) => ({
            accessorKey: header.key,
            header: header.label,
            size: header.size || 150,
        })),
        {
            id: 'actions',
            header: 'Actions',
            size: 100,
            Cell: ({ row }) => (
                <>
                    <button onClick={() => handleView(row.original.id)}
                        className='hover:bg-primary box-border h-8 w-8 rounded-md mx-2'>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                        className='hover:bg-primary box-border h-8 w-8 rounded-md mx-2'>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button onClick={() => handleDelete(row.original.id)}
                        className='hover:bg-primary box-border h-8 w-8 rounded-md mx-2'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </>
            ),
        }
    ];

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
        filename: exportFileName,
    });

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(tableData);
        download(csvConfig)(csv);
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={tableData}
            enableRowSelection
            enableColumnFilters
            enablePagination
            enableBottomToolbar
            enableTopToolbar
            muiTableContainerProps={{
                sx: {
                    minHeight: '380px', // Set minimum height here
                    backgroundColor: '#403e3e',
                },
            }}
            muiTableProps={{
                sx: {
                    backgroundColor: '#403e3e',
                    '& .MuiTableCell-root': {
                        color: 'white'
                    },
                },
            }}
            muiTableHeadCellFilterProps={{
                sx: {
                    '& .MuiInputBase-root': {
                        backgroundColor: 'red',
                        color: 'white',
                    },
                    '& .MuiInputBase-input': {
                        backgroundColor: 'red',
                        color: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white',
                    },
                },
            }}
            muiTableHeadProps={{
                sx: {
                    '& .MuiTableCell-root': {
                        backgroundColor: 'black',
                        color: 'white',
                        fontWeight: 'bold',
                        height: '50px',
                    }
                }
            }}
            muiTableBodyProps={{
                sx: {
                    '& .MuiTableCell-root': {
                        backgroundColor: '#403e3e',
                        color: 'white',
                    },
                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    whiteSpace: 'nowrap',
                    color: 'white',
                }
            }}
            muiTopToolbarProps={{
                sx: {
                    backgroundColor: '#403e3e',
                    '& .MuiToolbar-root': {
                        color: 'white'
                    },
                    '& .MuiInputBase-root': {
                        color: 'white'
                    },
                    '& .MuiInputBase-input': {
                        color: 'white'
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white'
                    },
                    '& .MuiIconButton-root': {
                        color: 'white'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white'
                    },
                    '& .MuiSelect-select': {
                        color: 'white'
                    }
                }
            }}
            muiBottomToolbarProps={{
                sx: {
                    borderTop: 'none',
                    backgroundColor: "#403e3e",
                    '& .MuiToolbar-root': {
                        color: 'white',
                    },
                    '& .MuiSelect-select': {
                        color: 'white',
                    },
                    '& .MuiTablePagination-displayedRows': {
                        color: 'white'
                    },
                    '& .MuiTablePagination-selectLabel': {
                        color: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white'
                    },
                    '& .MuiInputBase-root': {
                        color: 'white',
                    }
                }
            }}
            muiSearchTextFieldProps={{
                sx: {
                    '& .MuiInputBase-root': {
                        color: 'white'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                        backgroundColor: 'red'
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white'
                    }
                }
            }}
            renderTopToolbarCustomActions={({ table }) => (
                <Box
                    sx={{
                        display: 'flex',
                        gap: '16px',
                        padding: '8px',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        onClick={handleExportData}
                        className='text-primary px-3 rounded-md hover:bg-zinc-700'
                    >
                        <FileDownloadIcon /> EXPORT ALL DATA
                    </button>

                    <button
                        disabled={table.getRowModel().rows.length === 0}
                        onClick={() => handleExportRows(table.getRowModel().rows)}
                        className='text-primary px-3 rounded-md hover:bg-zinc-700'
                    >
                        <FileDownloadIcon /> EXPORT PAGE ROWS
                    </button>

                    <button
                        disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        className={`text-primary px-3 rounded-md hover:bg-zinc-700 
                         disabled:text-slate-400 disabled:bg-gray-200 
                        disabled:cursor-not-allowed disabled:hover:bg-gray-200`}
                    >
                        <FileDownloadIcon /> EXPORT SELECTED ROWS
                    </button>
                </Box>
            )}
        />
    );
};

export default Table;