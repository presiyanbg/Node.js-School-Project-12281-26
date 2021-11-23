import { useState, useEffect } from 'react';
import ShoppingListLogin from './shopping-list.logic'

const ShoppingList = () => {
    const [ loadedItems, setLoadedItems ] = useState([{}]);

    const { items } = ShoppingListLogin();

    let itemsHTML = '';

    useEffect(() => {
        setLoadedItems(items);
    }, [items])

    if (loadedItems) {
        itemsHTML = loadedItems.map( item => {
            console.log(item.id);

            return (
                <div className="row m-3 justify-content-around border border-mutted rounded py-3 px-2" key={item.id}>
                    <a className="col-6" href={ item.link }> {item.title} </a>

                    <div className="col-2">
                        <span className='w-100 cursor--default btn btn-success text-white'>{item.price} $</span>
                    </div>

                    <div className="col-2">
                        <button className='w-100 btn bg-info text-white'>Edit</button>
                    </div>

                    <div className="col-2">
                        <button className='w-100 btn bg-danger text-white'>Delete</button>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="page">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Shopping list
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">?</span>
                                        </div>

                                        <input type="text" className="form-control" placeholder="Search for item" aria-label="Search for item" aria-describedby="basic-addon1"/>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <button className='w-100 btn btn-success'>Create new</button>
                                </div>
                            </div>

                            {
                                itemsHTML
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ShoppingList;
