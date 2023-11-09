// src/components/StyledComponents.tsx
import styled from 'styled-components';

export const FullPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url('/background-image.webp') center center no-repeat;
    background-size: cover; /* Cover the entire container with the image */
    background-color: #f0f0f0; /* Fallback background color */
`;  

export const FormContainer = styled.div`
  background-color: #edfeb1;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 500px;
  text-align: center;
  display: grid;
  justify-items: center;
  justify-content: space-around;


  form {
    display: inline-flex;
    flex-direction: column;
  }

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


 export const BooleanInput = styled.div`
 background-color: #edfeb1;
 border-radius: 5px;
 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
 padding: 20px;
 width: 500px;
 text-align: center;
 display: flex;
 flex-wrap: wrap;
 justify-items: center;
 justify-content: space-evenly;
 align-items: baseline;

 label {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: larger;
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