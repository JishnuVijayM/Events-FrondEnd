import React, { useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = ({ data, columnHeaders, exportFileName = 'table_data' }) => {
    const [tableData, setTableData] = useState(data);

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
                // <Button
                //     variant="outlined"
                //     color="error"
                //     startIcon={<DeleteIcon />}
                //     onClick={() => handleDeleteRow(row.original.id)}
                //     sx={{ whiteSpace: 'nowrap' }}
                // >
                //     Delete
                // </Button>
                <>
                    <button className='hover:bg-primary box-border h-8 w-8 rounded-md mx-2'>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className='hover:bg-primary box-border h-8 w-8 rounded-md mx-2'>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className='hover:bg-primary box-border h-8 w-8 rounded-md mx-2'>
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

    const handleDeleteRow = (id) => {
        const updatedData = tableData.filter((row) => row.id !== id);
        setTableData(updatedData);
    };

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
            muiTableProps={{
                sx: {
                    backgroundColor: '#403e3e',
                    '& .MuiTableCell-root': {
                        color: 'white'
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

                    {/* export all data that is currently in the table (ignore pagination, sorting, filtering, etc.) */}
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

                    {/* //only export selected rows */}
                    <button
                        disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        className='text-primary px-3 rounded-md hover:bg-zinc-700 disabled:text-gray-500 disabled:cursor-not-allowed'
                    >
                        <FileDownloadIcon /> EXPORT SELECTED ROWS
                    </button>

                </Box>
            )}
        />
    );
};

export default Table;