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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!getMessages) newErrors.getMessages = 'אישור קבלת דברי פרסום הינו חובה';
    if (!firstName) newErrors.firstName = 'שם פרטי הוא שדה חובה';
    if (!lastName) newErrors.lastName = 'שם משפחה הוא שדה חובה';
    if (!email) newErrors.email = 'כתובת מייל הוא שדה חובה';
    if (!phoneSms && !phoneWhatsApp) {newErrors.phoneSms = 'יש להכניס טלפון אחד לפחות'; newErrors.phoneWhatsApp = 'יש להכניס טלפון אחד לפחות'}
    
    if (!validateEmail(email) && email) newErrors.email = 'כתובת מייל אינה תקינה';
    if (!validatePhone(phoneSms) && phoneSms) newErrors.phoneSms = 'מספר הטלפון אינו תקין';
    if (!validatePhone(phoneWhatsApp) && phoneWhatsApp) newErrors.phoneWhatsApp = 'מספר הטלפון אינו תקין';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await ApiService.getInstance().post(API_ENDPOINTS.USERS.CREATE_USER, {firstName,
          lastName,
          idNumber,
          address,
          email,
          phoneSms,
          phoneWhatsApp,
          goodOpinion,
          badOpinion,
          getMessages})
          setFormRespond('הטופס נשלח בהצלחה')
      } catch (error) {
        console.error(error);
        setFormRespond('אירעה שגיאה בעת שליחת הטופס. נא ליצור קשר עם שדה הראיה')
      }
    } else {
      console.log('validate form failed')
    }
  };

  return (
    <FullPageContainer>
      <FormContainer>
        <h2>הצטרפות למועדון לקוחות שדה הראיה</h2>
        <h3>לקבלת מבצעים, עדכונים  ומידע על בריאות העין <br />יש להרשם</h3>
        <form>
          <InputField label="שם פרטי" type="text" value={firstName} onChange={setFirstName} error={errors.firstName} mandatory={true} />
          <InputField label="שם משפחה" type="text" value={lastName} onChange={setLastName} error={errors.lastName} mandatory={true}/>
          <InputField label="מספר תעודת זהות" type="text" value={idNumber} onChange={setIdNumber}/>
          <InputField label="כתובת" type="text" value={address} onChange={setAddress} />
          <InputField label="כתובת מייל" type="email" value={email} onChange={setEmail} error={errors.email} mandatory={true}/>
          <InputField label="sms פלאפון שמקבל הודעות " type="text" value={phoneSms} onChange={setPhoneSms} error={errors.phoneSms} />
          <InputField label="whatsapp פלאפון שמקבל הודעות " type="text" value={phoneWhatsApp} onChange={setPhoneWhatsApp} error={errors.phoneWhatsApp} />
          <BooleanInputField label="רכשתי בעבר מוצר בחנות" type="checkbox" value={haveOpinion} onChange={setHaveOpinion} />
          {haveOpinion ? <> 
            <InputField label="נשמח לשמוע את חוות דעתך החיובית על שדה הראיה " type="textarea" value={goodOpinion} onChange={setGoodOpinion} />
            <InputField label="נשמח לשמוע במה לדעתך אנחנו צריכים להשתפר" type="textarea" value={badOpinion} onChange={setBadOpinion}/> </> 
            : <></>}          
          <BooleanInputField label="מאשר/ת בזאת קבלת דברי פרסום ודיוור ישיר" type="checkbox" value={getMessages} onChange={setGetMessages} error={errors.getMessages} mandatory={true}/>
          <button type="button" onClick={handleSubmit}>שלח</button>
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
