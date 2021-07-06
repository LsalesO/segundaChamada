import styled from 'styled-components';

export const Container = styled.div`
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 1rem;

    input, select {
      padding: 0.5rem;
      margin: 0.5rem 0;
      border: 5px inset;
    }

    button {
      border: 5px outset;
      width: 10rem;
    }
  }

  table {
    width: 100%;
    border-spacing: 0;

    button {
      border: 3px outset;
    }

    tr td {
      outline: 1px solid;
      padding: 0.5rem;
      text-align: center;
    }
  }
`;

