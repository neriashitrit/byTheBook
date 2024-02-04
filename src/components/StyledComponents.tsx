// src/components/StyledComponents.tsx
import styled from 'styled-components';

export const FullPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url('/byTheBook/background-image.jpg') center center no-repeat;
    background-size: cover; /* Cover the entire container with the image */
    background-color: #f0f0f0; /* Fallback background color */
`;  

export const FormContainer = styled.div`
  background-color: #edfeb1;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding-top: 20px;
  padding-bottom: 20px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  display: grid;
  justify-items: center;
  justify-content: space-around;
  direction: rtl;

  form {
    display: inline-flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: larger;
  }  
  h2 {
    font-size: 90%;
  }

  h3 {
    font-size: 90%;
  }

  textarea {
    width: 450px;
    height:100px
  }

  input {
    display: justify
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    direction: rtl important;
  }

  .error {
    color: #e74c3c; /* Red color for errors */
    font-size: medium;
  }

  button {
    padding: 10px 20px;
    background-color: #3498db; /* Blue color for the button */
    color: #ffffff;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 3px;
    font-size: larger;
    &:hover {
      background-color: #2980b9; /* Slightly darker blue on hover */
    }
  }
`;


export const InputContainer = styled.div`
  background-color: #edfeb1;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 500px;
  text-align: center;
  display: grid;
  justify-items: center;
  justify-content: space-around;
  direction: rtl;

  label {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: larger;
  }

  textarea {
    width: 450px;
    height:100px
  }

  input {
    display: justify
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    direction: rtl important;
  }

  .error {
    color: #e74c3c; /* Red color for errors */
    font-size: medium;
  }

  }
`;
export const LabelWithMandatory = styled.div`
p {
  color: #f40404;
  font-size: xx-large;
  font-weight: bold;
  display: inline;
  margin-bottom: 8px;
  justify-content: center;

}

label {
  font-weight: bold;
  margin-bottom: 8px;
  margin-right: 8px;
  font-size: larger;
  display: inline;
}
`
 export const BooleanInput = styled.div`
 background-color: #edfeb1;
 border-radius: 5px;
 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
 padding: 20px;
 max-width: 500px;
 text-align: center;
 display: flex;
 flex-wrap: wrap;
 justify-items: center;
 justify-content: center;
 align-items: baseline;

 label {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: larger;
  margin-left: 8px;

}

input {
  display: justify
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 17px;
  height: 17px;
}

.error {
  color: #e74c3c; /* Red color for errors */
  font-size: medium;
}
`; 