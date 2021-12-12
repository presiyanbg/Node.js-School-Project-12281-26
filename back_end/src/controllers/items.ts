import { Request, Response, NextFunction } from "express";
import { createConnection } from "mysql";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = 'Items Controller';

/**
 * Search for item.
 *
 * @param req
 * @param res
 * @param next
 */
const searchItem = (req: Request, res: Response, next: NextFunction) => {
    logging.info( NAMESPACE, 'Getting all items');
    let search = req.query.content;

    let query = `SELECT * FROM items WHERE title LIKE "%${search}%" OR  link LIKE "%${search}%" `;

    Connect()
        .then(connection => {
            Query(connection, query)
                .then( results => {
                    return res.status(200).json({
                        results
                    });
                })
                .finally( () => {
                    connection.end();
                });
        })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            })
        });
};

/**
 * Get all items.
 *
 * @param req
 * @param res
 * @param next
 */
const getAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info( NAMESPACE, 'Getting all items');

    let query = 'SELECT * FROM items';

    Connect()
        .then(connection => {
            Query(connection, query)
                .then( results => {
                    return res.status(200).json({
                        results
                    });
                })
                .finally( () => {
                    connection.end();
                });
        })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            })
        });
};

/**
 * Create item.
 *
 * @param req
 * @param res
 * @param next
 */
const createItem = (req: Request, res: Response, next: NextFunction) => {
    logging.info( NAMESPACE, 'Creating item');

    let { title, link, price } = req.body;

    let query = `INSERT INTO items (title, link, price) VALUES ("${title}", "${link}", "${price}")`;

    Connect()
    .then(connection => {
        Query(connection, query)
            .then( results => {
                return res.status(200).json({
                    results
                });
            })
            .finally( () => {
                connection.end();
            });
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    });
};

/**
 * Update item.
 *
 * @param req
 * @param res
 * @param next
 */
const updateItem = (req: Request, res: Response, next: NextFunction) => {
    logging.info( NAMESPACE, 'Creating item');

    let { title, link, price, id } = req.body;

    console.log('foking id' + id);


    let query = `UPDATE items SET title="${title}", link="${link}", price="${price}" WHERE id = ${id} `;

    Connect()
    .then(connection => {
        Query(connection, query)
            .then( results => {
                return res.status(200).json({
                    results
                });
            })
            .finally( () => {
                connection.end();
            });
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    });
};

/**
 * Delete item.
 *
 * @param req
 * @param res
 * @param next
 */
const deleteItem = (req: Request, res: Response, next: NextFunction) => {
    logging.info( NAMESPACE, 'Creating item');

    let { id } = req.body;

    console.log(id);


    let query = `DELETE FROM items WHERE id = ${id}`;

    Connect()
    .then(connection => {
        Query(connection, query)
            .then( results => {
                return res.status(200).json({
                    results
                });
            })
            .finally( () => {
                connection.end();
            });
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    });
};

export default {
    getAll,
    searchItem,
    createItem,
    updateItem,
    deleteItem
};
