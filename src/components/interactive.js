import React, {useState , useEffect} from 'react';
import Style from "../assets/styles/interactive.module.scss"
import UiCard from './card';
import { UiInput } from './input/input';


const UiInteractive = () => {
    const [cardNumber,setCardNumber] = useState("")
    const [cardName,setCardName] = useState("")
    const [cardMonth,setCardMonth] = useState("")
    const [cardYear,setCardYear] = useState("")
    const [cardCVV,setCardCVV] = useState("")
    const [formatedCardNumber,setFormatedCardNumber] = useState("0000 0000 0000 0000")
    const [formatedCardDate,setFormatedCardDate] = useState("0000 0000 0000 0000")
    
    const [requiredError,setRequiredError] = useState([false,false,false,false,false])
    const [dateError,setDateError] = useState(false)
    let numberMask = "0000 0000 0000 0000"
    let nameMask = "Иван Иванов"
    let dateMask = "00 / 00"
    let cvvMask = "123"

    useEffect (() => {
        let m = ""
        let y = ""
        setDateError(false)
        if (cardMonth) {
            if (cardMonth < 10)
                m = "0" + cardMonth
            else 
                if (cardMonth <= 12)
                    m = cardMonth
                else {
                    m = "00"
                    setDateError(true)
                } 
        }
        else {
            m = "00"
        }
        if (cardYear)
            y = cardYear
        else 
            y = "00"
        setFormatedCardDate (m + " / " + y)
        },[cardMonth,cardYear])

    const handleCardNumberChange = (e) => {
        let formattedValue = formatDigit(e.target.value,16).replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedValue);
        setFormatedCardNumber(formattedValue + numberMask.slice(formattedValue.length,19))
    };

    function formatDigit(value,limit) {
        let formattedValue = value.replace(/\s/g, '').replace(/\D/g, '');
        if (formattedValue.length > limit) 
            formattedValue = formattedValue.slice(0, limit);
        return formattedValue;
    }

    const handleCardName = (e) => {
        let formattedValue = e.target.value;
        if (!/^\D*$/.test(formattedValue)) {
            formattedValue = cardName;
        } else {
            formattedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
        }
        setCardName(formattedValue)
    }

    

    function submitData () {
        setRequiredError([  (cardName)? false : true,
                            (cardNumber.length == 19)? false : true,
                            (cardMonth)? false : true,
                            (cardYear)? false : true,
                            (cardCVV.length == 3)? false : true])
        
        const timer = setTimeout(() => {
            setRequiredError([false,false,false,false,false])
            }, 2000);
        
            return () => {
            clearTimeout(timer);
            };
    }


    return (
        <div className={Style.input}>
            <UiCard 
            number={formatedCardNumber}
            name={(cardName)? cardName : nameMask}
            date={(formatedCardDate)? formatedCardDate : dateMask}
            cvv={(cardCVV)? cardCVV : cvvMask}
            />
            <div className={Style.formdata}>
                <div className={Style.item}>
                    <h3>Имя владельца</h3>
                    <UiInput
                        onChange={(e) => handleCardName(e)}
                        value={cardName}
                        placeholder="Например Иван Иванов"
                        className={(requiredError[0]) && Style.error}
                    />
                    {(requiredError[0]) && <h4 className={Style.errorMsg}>Это обязательное поле!</h4>}
                </div>
                <div className={Style.item}>
                    <h3>Номер карты</h3>
                    <UiInput
                        onChange={(e) => handleCardNumberChange(e)}
                        value={cardNumber}
                        placeholder={numberMask}
                        className={(requiredError[1]) && Style.error}
                    />
                    {(requiredError[1]) && <h4 className={Style.errorMsg}>Это обязательное поле!</h4>}
                </div>
                <div className={Style.largeItem}>
                    <div className={Style.item}>
                        <h3 ><p className={Style.date}>Срок <br /> Службы</p> (ММ/ГГ)</h3>
                        <div className={Style.flex}>
                            <UiInput
                                onChange={(e) => setCardMonth(formatDigit(e.target.value,2))}
                                value={cardMonth}
                                className={[Style.smallInput,(dateError || requiredError[2]) && Style.error].join(" ")}
                                placeholder="ММ"
                            />
                            <UiInput
                                onChange={(e) => setCardYear(formatDigit(e.target.value,2))}
                                value={cardYear}
                                className={[Style.smallInput,(requiredError[3]) && Style.error].join(" ")}
                                placeholder="ГГ"
                            />
                        </div>
                        {(dateError) && <h4 className={Style.errorMsg}>Некорректный формат даты!</h4>}
                        {((requiredError[2]) || (requiredError[3])) && <h4 className={Style.errorMsg}>Это обязательное поле!</h4>}
                        
                    </div>
                    <div className={Style.item}>
                        <h3>CVV</h3>
                        <UiInput
                            onChange={(e) => setCardCVV(formatDigit(e.target.value,3))}
                            value={cardCVV}
                            className={[Style.mediumInput,(requiredError[4]) && Style.error].join(" ")}
                            placeholder="Например 123"
                        />
                        {(requiredError[4]) && <h4 className={Style.errorMsg}>Это обязательное поле!</h4>}
                    </div>
                </div>
            <button className={Style.submit} onClick={() => submitData()}>Подтвердить</button>
            </div>
        </div>
    );
};

export default UiInteractive;