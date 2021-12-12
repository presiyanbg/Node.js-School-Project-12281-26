$(function( $ ){
    const mainLink = 'http://127.0.0.1:9110/';
    const itemWrapper = $('.list-items-wrapper');

    /**
     * Load all items from API.
     */
    async function loadItems() {
        const response = await $.ajax({
            url: `${mainLink}items`
        });

        if (response.results && response.results.length) {
            clearItemsList();
        }

        $(response.results).each( (index, item) => {
            const itemElement = $('<div class="no-items list-item row align-items-center justify-content-around"></div>');
            const itemTitle = $('<div class="col-3 item-title"></div>');
            const itemURL = $('<div class="col-4"></div>');
            const itemLink = $('<a class="item-link" target="_blank"></a>');
            const itemPrice = $('<div class="col-2 text-success item-price"></div>');
            const itemEdit = $('<div class="col-1 item-action item-edit badge badge-info">Edit</div>');
            const itemDelete = $('<div class="col-1 item-action item-delete badge badge-danger">Delete</div>');

            $(itemTitle).text(item.title);

            if (item.link.includes('https://')) {
                $(itemLink).attr('href', item.link);
            } else {
                $(itemLink).attr('href', 'https://' + item.link);
            }

            $(itemLink).text(item.link);
            $(itemPrice).text(item.price + ' $');
            $(itemEdit).attr('item-id', item.id);
            $(itemDelete).attr('item-id', item.id);

            $(itemWrapper).append(itemElement);
            $(itemElement).append(itemTitle);
            $(itemElement).append(itemURL);
            $(itemURL).append(itemLink);
            $(itemElement).append(itemPrice);
            $(itemElement).append(itemEdit);
            $(itemElement).append(itemDelete);
        })
    }

    /**
     * Load items from search.
     */
    async function loadSearchItems(items) {
        $(items).each( (index, item) => {
            const itemElement = $('<div class="no-items list-item row align-items-center justify-content-around"></div>');
            const itemTitle = $('<div class="col-3 item-title"></div>');
            const itemURL = $('<div class="col-4"></div>');
            const itemLink = $('<a class="item-link" target="_blank"></a>');
            const itemPrice = $('<div class="col-2 text-success item-price"></div>');
            const itemEdit = $('<div class="col-1 item-action item-edit badge badge-info">Edit</div>');
            const itemDelete = $('<div class="col-1 item-action item-delete badge badge-danger">Delete</div>');

            $(itemTitle).text(item.title);

            if (item.link.includes('https://')) {
                $(itemLink).attr('href', item.link);
            } else {
                $(itemLink).attr('href', 'https://' + item.link);
            }

            $(itemLink).text(item.link);
            $(itemPrice).text(item.price + ' $');
            $(itemEdit).attr('item-id', item.id);
            $(itemDelete).attr('item-id', item.id);

            $(itemWrapper).append(itemElement);
            $(itemElement).append(itemTitle);
            $(itemElement).append(itemURL);
            $(itemURL).append(itemLink);
            $(itemElement).append(itemPrice);
            $(itemElement).append(itemEdit);
            $(itemElement).append(itemDelete);
        })
    }

    /**
     * Clear list with items.
     */
    function clearItemsList() {
        $(itemWrapper).html('');
    }

    /**
     * Search for items
     */
    $(document).on('keyup', '#searchForItem', async function (e) {
        const searchForItem = await $.ajax({
            type: "GET",
            url: `${mainLink}items/search?content=${($(this).val()).toString()}`
        });

        clearItemsList();
        loadSearchItems(searchForItem.results);
    });

    /**
     * Create new item.
     */
    $('#newItemFrom').submit(async function (e) {
        e.preventDefault();

        const data = $('#newItemFrom').serializeArray();

        const createNewItem = await $.ajax({
            type: "POST",
            url: `${mainLink}items`,
            data: data,
        });

        clearItemsList();
        loadItems();
    })

    /**
     * Toggle form for new item.
     */
    $(document).on('click', '.icon-plus', function (e) {
        $('.card-new-item').toggleClass('d-none');
    })

    /**
     * Show the form for editing item.
     */
    $(document).on('click', '.item-edit', async function (e) {
        $('.list-item').removeClass('d-none');
        $(this).parent().addClass('d-none');

        $('#editItemFrom').attr('data-item-id', $(this).attr('item-id'));
        $('#editItemTitle').val($(this).parent().find('.item-title').text());
        $('#editItemLink').val($(this).parent().find('.item-link').text());
        $('#editItemPrice').val(parseInt($(this).parent().find('.item-price').text()));

        $('.edit-item').removeClass('d-none');
    })

    /**
     * Update item.
     */
     $('#editItemFrom').submit(async function (e) {
        e.preventDefault();

        const data = $('#editItemFrom').serializeArray();

        data[3] = {name: 'id', value: $(this).attr('data-item-id')};

        const editItem = await $.ajax({
            type: "POST",
            url: `${mainLink}items/update`,
            data: data,
        });

        $('.edit-item').addClass('d-none');
        clearItemsList();
        loadItems();
    })

    /**
     * Delete item.
     */
    $(document).on('click', '.item-delete', async function (e) {
        const itemId = $(this).attr('item-id');

        const deleteItem = await $.ajax({
            type: "DELETE",
            url: `${mainLink}items`,
            data: {id : itemId},
        });

        clearItemsList();
        loadItems();
    })

    /**
     * Load all items on boot.
     */
    loadItems();
});
