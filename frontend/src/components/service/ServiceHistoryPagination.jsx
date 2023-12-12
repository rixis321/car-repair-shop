import React from 'react';
import { Pagination } from 'react-bootstrap';

const ServiceHistoryPagination = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    );
};

export default ServiceHistoryPagination;
