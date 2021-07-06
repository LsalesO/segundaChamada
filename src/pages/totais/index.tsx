import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom'

interface IExame {
  id: string;
  nome: string;
  tipoexame: string;
  nomeexame: string;
  mesanoexame: string;
  laboratorio: string;
}

const Home: React.FC = () => {
  const [totais, setTotais] = useState({});


  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/exames',
    })
      .then((response: AxiosResponse<IExame[]>) => {
        const total = {
          "Lab Funcional": 0,
          "Lab Medicina": 0,
          "Admissional": 0,
          "Periódico": 0,
          "Demissional": 0,
          "Hemograma Completo": 0,
          "Audiometria": 0,
          "Acuidade Visual": 0
        };

        response.data.forEach(item => {
          if ( item.laboratorio === "Lab Funcional") {
            total["Lab Funcional"]++;
          }
          if ( item.laboratorio === "Lab Medicina") {
            total["Lab Medicina"]++;
          }

          if ( item.tipoexame === "Admissional") {
            total["Admissional"]++;
          }
          if ( item.tipoexame === "Periódico") {
            total["Periódico"]++;
          }
          if ( item.tipoexame === "Demissional") {
            total["Demissional"]++;
          }

          if ( item.nomeexame === "Hemograma Completo") {
            total["Hemograma Completo"]++;
          }
          if ( item.nomeexame === "Audiometria") {
            total["Audiometria"]++;
          }
          if ( item.nomeexame === "Acuidade Visual") {
            total["Acuidade Visual"]++;
          }
        });

        setTotais(total);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);


  return (
    <div>
        <h1>Totais</h1>
        <Link to="/" >Voltar</Link>
        {Object.entries(totais).map((entries: [string, any]) => {
          return (
            <p key={entries[0]} >
              O <strong>{entries[0]}</strong> tem <strong>{entries[1]}</strong> exames.
            </p>
          )
        })}
    </div>
  );
};

export default Home;
