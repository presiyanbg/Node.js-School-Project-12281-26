module.exports = app => {
    const item = require("../controllers/item.controller.js");

    let router = require("express").Router();

    /**
     * Create a new Item
     */
    router.post("/create", item.create);

    /**
     * Retrieve all Items
     */
    router.get("/", item.findAll);

    /**
     * Retrieve a single Item with id
     */
    router.get("/:id", item.findOne);

    /**
     * Update a Item with id
     */
    router.put("/:id", item.update);

    /**
     * Delete a Item with id
     */
    router.delete("/delete/:id", item.delete);

    /**
     * Delete all Items
     */
    router.delete("/deleteAll", item.deleteAll);

    app.use('/api/items', router);
};
