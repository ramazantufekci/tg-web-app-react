import React, { useState,useCallback, useEffect } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    {id:'1', title: 'muz', price: 50, description: 'yerli muz'},
    {id:'2', title: 'Elma', price: 20, description: 'Yeşil elma'},
    {id:'3', title: 'Çilek', price: 35, description: 'Kokulu çilek'},
    {id:'4', title: 'Şeftali', price: 70, description: 'yerli Şeftali'},
    {id:'5', title: 'Erik', price: 50, description: 'Papaz eriği'},
    {id:'6', title: 'dut', price: 45, description: 'Kırmızı dut'},
    {id:'7', title: 'kavun', price: 19, description: 'Kırkağaç kavunu'},
    {id:'8', title: 'karpuz', price: 9, description: 'Diyarbakır karpuzu'},
];

const getTotalPrice = (items = []) => {
    return items.reduce((acc,item) => {
        return acc +=item.price
    }, 0)
}
const ProductList = () =>{

    const [addedItems, setAddedItems] = useState([]);
    const {tg,queryId} = useTelegram();

    const onSendData = useCallback(()=>{
        const data={
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://ramazantufekci.com/derya.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    },[addedItems])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked',onSendData)
        return()=>{
            tg.offEvent('mainButtonClicked',onSendData)
        }
    },[onSendData])

    const onAdd = (product) =>{
        const alreadyAdded = addedItems.find(item=>item.id==product.id);
        let newItems = [];
        if(alreadyAdded){
            newItems = addedItems.filter(item=>item.id !== product.id);
        }else{
            newItems = [...addedItems,product];
        }
        setAddedItems(newItems)
        if(newItems.length === 0){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Toplam: ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className={'list'}>
            {products.map(item =>(
                <ProductItem product={item} onAdd={onAdd} className={'item'}/>
            ))}
            
        </div>
    )
}

export default ProductList;