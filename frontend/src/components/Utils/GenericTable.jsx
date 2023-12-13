// GenericTable.jsx
import React, { useState } from 'react';
import { Container, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./table-styles.css";
import {jwtDecode} from "jwt-decode";
import {useContext} from "react";
import AuthContext from "../../security/AuthProvider.jsx";

const GenericTable = ({
                          data,
                          columns,
                          onDelete,
                          onPageChange,
                          sortConfig,
                          onSort,
                          currentPage,
                          itemsPerPage,
                          onDetailsClick,
                          onEndServiceClick,
                          invoiceMode
                      }) => {
    const [isSortingEnabled, setSortingEnabled] = useState(true);
    const handleSort = (key) => {
        if (!isSortingEnabled) return;
        onSort(key);
    };

    const { auth } = useContext(AuthContext);
    const token = jwtDecode(auth.accessToken)

    const sortedData = () => {
        if (sortConfig.key !== null) {
            const sortedData = [...data].sort((a, b) => {
                if (sortConfig.key === 'roles[0].name') {
                    const roleNameA = getFirstRoleName(a.roles);
                    const roleNameB = getFirstRoleName(b.roles);

                    if (roleNameA < roleNameB) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (roleNameA > roleNameB) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                } else {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                }
            });
            return sortedData;
        }
        return data;
    };
    const getFirstRoleName = (roles) => {
        if (roles && roles.length > 0 && roles[0].name) {
            return roles[0].name;
        } else {
            return 'No Role';
        }
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data ? sortedData().slice(indexOfFirstItem, indexOfLastItem) : [];

    return (
        <>
        <Container fluid>
            <Table striped bordered hover className={"table-data"}>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key} onClick={() => handleSort(column.key)}>
                            {column.label} {sortConfig.key === column.key && (sortConfig.direction === 'asc' ? <i className="bi bi-arrow-up" /> : <i className="bi bi-arrow-down" />)}
                        </th>
                    ))}
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={column.key}>
                                {column.key === 'roles[0].name' ? getFirstRoleName(item.roles) : item[column.key]}
                            </td>
                        ))}
                        <td>
                            <div className="action-buttons">
                                {onDetailsClick(item.id)}
                    <span className="detail-span" onClick={() => onDetailsClick(item.id)}>
                         {item.serviceStatus === 'OCZEKUJE NA KLIENTA' && (
                             <span className="end-service-span text-primary" onClick={() => onEndServiceClick(item.id)}>
                        Zakończ serwis
                      </span>
                         )}
                    </span>
                                {invoiceMode ? (
                                    token.role === 'ADMIN' ? (
                                        <span className="delete-span" onClick={() => onDelete(item.id)}>
            Pobierz fakturę
        </span>
                                    ) : (
                                        <span className="delete-span" onClick={() => onDelete(item.id)}>
            Pobierz fakturę
        </span>
                                    )
                                ) : (
                                    token.role === 'ADMIN' ? (
                                        <span className="delete-span" onClick={() => onDelete(item.id)}>
            Usuń
        </span>
                                    ) : null
                                )}
                            </div>
                        </td>
                    </tr>

                ))}
                </tbody>
            </Table>
            {data && (
                <div className="pagination-container">
                    <Pagination>
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => onPageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            )}
        </Container>
        </>
    );
};

export default GenericTable;
