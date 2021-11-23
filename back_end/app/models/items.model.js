const sql = require("./db.js");

/**
 * @TODO
 *
 * Make files TypeScript
 */

//interface itemStructure {
//     title: string;
//     link: string;
//     price: number;
// }

const Item = function(item) {
    this.title = item.title;
    this.link = item.link;
    this.price = item.price;
};

/**
 * Create new item.
 *
 * @param newItem
 * @param result
 */
Item.create = (newItem, result) => {
    sql.query("INSERT INTO items SET ?", newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created item: ", { id: res.insertId, ...newItem });

        result(null, { id: res.insertId, ...newItem });
    });
};

/**
 * Get all items.
 *
 * @param title string
 * @param result
 */
Item.getAll = (title, result) => {
    let query = "SELECT * FROM items";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log("items: ", res);
    result(null, res);
    });
};

/**
 * Find item by id.
 *
 * @param id integer
 * @param result
 */
Item.findById = (id, result) => {
    sql.query(`SELECT * FROM items WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found item: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Item with the id
        result({ kind: "not_found" }, null);
    });
};

/**
 * Update item by id.
 *
 * @param id integer
 * @param item itemStructure
 * @param result
 */
Item.updateById = (id, item, result) => {
    sql.query( "UPDATE items SET title = ?, description = ?, published = ? WHERE id = ?",
        [item.title, item.link, item.price, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Item with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated item: ", { id: id, ...item });
            result(null, { id: id, ...item });
        }
    );
};

/**
 * Remove item by id.
 *
 * @param id integer
 * @param result
 */
Item.remove = (id, result) => {
    sql.query("DELETE FROM items WHERE id = ?", id, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
        // not found Item with the id
        result({ kind: "not_found" }, null);
        return;
    }

    console.log("deleted item with id: ", id);
    result(null, res);
    });
};

/**
 * Remove all items.
 *
 * @param result
 */
Item.removeAll = result => {
    sql.query("DELETE FROM items", (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log(`deleted ${res.affectedRows} items`);
    result(null, res);
  });
};

/**
 * Export module
 */
module.exports = Item;
