// src/components/Form.tsx
import React, { useState } from 'react';
import ApiService from '../services/api.service.tsx';
import { API_ENDPOINTS } from '../constants/db.constants.tsx';
import {InputField, BooleanInputField} from './InputField.tsx';
import { FullPageContainer, FormContainer } from './StyledComponents.tsx'; // Import the styled component


const Form: React.FC = () => {
  const [formRespond, setFormRespond] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneSms, setPhoneSms] = useState('');
  const [phoneWhatsApp, setPhoneWhatsApp] = useState('');
  const [haveOpinion, setHaveOpinion] = useState(false);
  const [goodOpinion, setGoodOpinion] = useState('');
  const [badOpinion, setBadOpinion] = useState('');
  const [getMessages, setGetMessages] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const emptyForm = () =>{
    setFirstName('')
    setLastName('')
    setIdNumber('')
    setAddress('')
    setEmail('')
    setPhoneSms('')
    setPhoneWhatsApp('')
    setHaveOpinion(false)
    setGoodOpinion('')
    setBadOpinion('')
    setGetMessages(false)
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!getMessages) newErrors.getMessages = 'אישור קבלת דברי פרסום הינו חובה';
    if (!firstName) newErrors.firstName = 'שם פרטי הוא שדה חובה';
    if (!lastName) newErrors.lastName = 'שם משפחה הוא שדה חובה';
    if (!email) newErrors.email = 'כתובת מייל הוא שדה חובה';
    if (!idNumber) newErrors.idNumber = 'מספר תעודת זהות הוא שדה חובה';
    if (!phoneSms && !phoneWhatsApp) {newErrors.phoneSms = 'יש להכניס טלפון אחד לפחות'; newErrors.phoneWhatsApp = 'יש להכניס טלפון אחד לפחות'}
    
    if (idNumber.length != 9 && idNumber) newErrors.idNumber = 'מספר תעודת זהות צריך להכיל תשעה ספרות';
    if (!validateEmail(email) && email) newErrors.email = 'כתובת מייל אינה תקינה';
    if (!validatePhone(phoneSms) && phoneSms) newErrors.phoneSms = 'מספר הטלפון אינו תקין';
    if (!validatePhone(phoneWhatsApp) && phoneWhatsApp) newErrors.phoneWhatsApp = 'מספר הטלפון אינו תקין';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    if (validateForm()) {
      try {
        const response = await ApiService.getInstance().post(API_ENDPOINTS.USERS.CREATE_USER, {
            firstName,
            lastName,
            idNumber,
            address,
            email,
            phoneSms,
            phoneWhatsApp,
            goodOpinion,
            badOpinion,
            getMessages
        })
        setFormRespond('הטופס נשלח בהצלחה')
        emptyForm()
    } catch (error) {
        ApiService.getInstance().post(API_ENDPOINTS.LOGS.LOG_ERROR, {
            error,
            firstName,
            lastName,
            idNumber,
            email,
            phoneSms,
            phoneWhatsApp
        })
        console.error(error);
        setFormRespond(`אירעה שגיאה בעת שליחת הטופס. נא ליצור קשר עם שדה הראיה ${JSON.stringify(error)} ${error}`)
    } finally {
        setIsLoading(false)
    }
    
    } else {
      console.log('validate form failed')
    setIsLoading(false)
    }
  };

  return (
    <FullPageContainer>
      <FormContainer>
        <h2>לקבלת מבצעים, עדכונים  ומידע על בריאות העיניים </h2>
        <h2>הצטרפו למועדון הלקוחות שלנו </h2>
        <form>
          <InputField label="שם פרטי" type="text" value={firstName} onChange={setFirstName} error={errors.firstName} mandatory={true} />
          <InputField label="שם משפחה" type="text" value={lastName} onChange={setLastName} error={errors.lastName} mandatory={true}/>
          <InputField label="מספר תעודת זהות" type="text" value={idNumber} onChange={setIdNumber} error={errors.idNumber} mandatory={true}/>
          <InputField label="עיר מגורים" type="text" value={address} onChange={setAddress} />
          <InputField label="כתובת מייל" type="email" value={email} onChange={setEmail} error={errors.email} mandatory={true}/>
          <InputField label=" פלאפון שמקבל הודעות sms" type="text" value={phoneSms} onChange={setPhoneSms} error={errors.phoneSms} />
          <InputField label=" פלאפון שמקבל הודעות whatsapp" type="text" value={phoneWhatsApp} onChange={setPhoneWhatsApp} error={errors.phoneWhatsApp} />
          <BooleanInputField label="רכשתי בעבר מוצר בחנות" type="checkbox" value={haveOpinion} onChange={setHaveOpinion} />
          {haveOpinion ? <> 
            <InputField label="איזה כיף שכבר נפגשנו, רוצה לספר לנו מה אהבת ? " type="textarea" value={goodOpinion} onChange={setGoodOpinion} />
            <InputField label="אנחנו תמיד רוצים להשתפר, יש לך רעיון?" type="textarea" value={badOpinion} onChange={setBadOpinion}/> </> 
            : <></>}          
          <BooleanInputField label="מאשר/ת בזאת קבלת דברי פרסום ודיוור ישיר" type="checkbox" value={getMessages} onChange={setGetMessages} error={errors.getMessages} mandatory={true}/>
          <h3 >מבטיחים לא להעביר את הפרטים שלכם, זה נשאר בנינו</h3>
          <h3 >ומבטיחים לא להציק {String.fromCodePoint(0x1F609)}</h3>
          <button type="button" onClick={handleSubmit} disabled={isLoading}>שלח</button>
          {formRespond ? <h3>{formRespond}</h3> : <></>}
        </form>
      </FormContainer>
    </FullPageContainer>
  );
};

const validateEmail = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhone = (phone:string) => {
  return phone.startsWith('0',0) && phone.length <= 10 && phone.length >= 9
};

export default Form;
