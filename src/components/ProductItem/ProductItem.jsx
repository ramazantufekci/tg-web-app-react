import React from "react";
import Button from "../Button/Button";
import './ProductItem.css';
const ProductItem = ({product, className, onAdd}) =>{

    const onAddHandler = ()=>{
        onAdd(product)
    }
    return (
        <div className={'product '+className}>
            <div className={'img'}/>
            <div className={'title'}>{ProductItem.title}</div>
            <div className={'description'}>{ProductItem.description}</div>
            <div className={'price'}>
                <span>Fiyat: <b>{ProductItem.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>Sepete Ekle</Button>

        </div>
    )
}

export default ProductItem;