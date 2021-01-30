import React, { Component } from 'react'

import  shopData  from "./shop.data"
import CollectionPreview from "../../components/collection-preview/collection-preview.component"

export default class ShopPage extends Component {
    constructor() {
        super();

        this.state = {
            collections: shopData
        }
    }


    render() {
        const collections = this.state.collections;
        return (
            <div>
            {
                collections.map(({id, ...otherProps}) => <CollectionPreview key={id} {...otherProps}/> )
            }
                
            </div>
        )
    }
}
