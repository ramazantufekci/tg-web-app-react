import React, { useCallback, useEffect, useState } from "react";
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";
const Form = () => {

    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(()=>{
        const data={
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    },[country,street,subject])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked',onSendData)
        return()=>{
            tg.offEvent('mainButtonClicked',onSendData)
        }
    },[onSendData])

    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'main button params'
        })
    },[])

    useEffect(()=>{
        if(!street || !country){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    },[country,street])

    const onChangeCountry = (e)=>{
        setCountry(e.target.value);
    }

    const onChangeStreet = (e)=>{
        setStreet(e.target.value);
    }

    const onChangeSubject = (e) =>{
        setSubject(e.target.value);
    }

    return (
        <div className={"form"}>
            <h3>Adam birşey yazdı ama anlamadım</h3>
            <input className={"input"} type="text" placeholder={"birşey gir işte"} value={country} onChange={onChangeCountry}/>
            <input className={"input"} type="text" placeholder={"birşey gir işte 2"} value={street} onChange={onChangeStreet}/>
            <select className={"select"} value={subject} onChange={onChangeSubject}>
                <option value={'physical'}>Bu ne Hiçbir Fikrim yok</option>
                <option value={'legal'}>Legal birşey galiba</option>
            </select>
        </div>
    )
}
export default Form;