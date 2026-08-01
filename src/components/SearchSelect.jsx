import Select from "react-select";
import {useEffect, useState} from "react";
import axios from "axios";

export default function SearchSelect({url, placeholder, value, onChange}){
    const [options, setOptions] = useState([]);

    const allOptions = options.map(option =>({
        value: option.slug,
        label: option.name
    }));

    const selectedOption =
    allOptions.find(option => option.value === value) || null;

    useEffect(()=>{
        const controller = new AbortController();
        axios.get(import.meta.env.VITE_BASE_API_URL + url, {signal: controller.signal})
             .then((res)=>{
                console.log('options:', res.data);
                setOptions(res.data.data);
             })
             .catch((err)=>{
                if (err.name !== 'CanceledError') {
                    console.error(err);
                }
             });
        return ()=>{controller.abort();};
    },[]);

    useEffect(()=> console.log(value));

    return (
        <>
        <Select 
        options={allOptions} 
        placeholder={placeholder} 
        value={selectedOption} 
        onChange={(option) => {
        onChange(option ? option.value : null)}}
        styles={{
        control: (base) => ({
            ...base,
            backgroundColor: "#212529",
            borderColor: "gray",
            color: "white"
        }),
        placeholder: (base) => ({
            ...base,
            color: "white",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#212529"
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#343a40" : "#212529",
            color: "white"
        }),
        singleValue: (base) => ({
            ...base,
            color: "white"
        })
    }} 

    isClearable></Select>
        </>
    )
}