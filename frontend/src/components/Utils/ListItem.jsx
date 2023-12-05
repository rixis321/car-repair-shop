// ListItem.jsx
import React, { useState } from 'react';
import { ListGroup, Spinner, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./list-item.css"

const ListItem = ({ items, template, loading, detailsLinkBuilder, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <ListGroup>
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    currentItems.map((item) => (
                        <ListGroup.Item className={"item"} key={item.id}>
                            {template(item)}
                            <Link to={detailsLinkBuilder(item)}>
                                Szczegóły
                            </Link>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
            <Pagination className={"pagination-container"}>
                {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, index) => (
                    <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default ListItem;
