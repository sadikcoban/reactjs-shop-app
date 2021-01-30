import React from 'react'

import "./collection-preview.styles.scss"
import CollectionItem from "../collection-item/collection-item.component"

const CollectionPreview = ({ title, items }) => {
    return (
        <div className="collection-preview">
            <div className="title">{title.toUpperCase()}</div>
            <div className="preview">
                {items
                    .filter((i, idx) => idx < 4)
                    .map(({ id, ...otherProps }) => <CollectionItem key={id} {...otherProps} />)}
            </div>
        </div>
    )
}

export default CollectionPreview
