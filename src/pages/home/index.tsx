import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import { Container } from './styles';

interface IExame {
  id: string;
  nome: string;
  tipoexame: string;
  nomeexame: string;
  mesanoexame: string;
  laboratorio: string;
}

const Home: React.FC = () => {
  const [nome, setNome] = useState('');
  const [tipoexame, setTipoexame] = useState('');
  const [nomeexame, setNomeexame] = useState('');
  const [mesanoexame, setMesanoexame] = useState('');
  const [laboratorio, setLaboratorio] = useState('');

  const [exames, setExames] = useState<IExame[]>([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/exames',
    })
      .then((response: AxiosResponse<IExame[]>) => {
        setExames(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  function submterFormulario(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    /* chamando a api para cadastrar o exame */
    axios({
      method: 'post',
      url: 'http://localhost:3333/exames',
      data: {
        nome,
        tipoexame,
        nomeexame,
        mesanoexame,
        laboratorio,
      },
    })
      .then((response: AxiosResponse<IExame>) => {
        const novoExame: IExame = {
          id: response.data.id,
          nome: response.data.nome,
          tipoexame: response.data.tipoexame,
          nomeexame: response.data.nomeexame,
          mesanoexame: response.data.mesanoexame,
          laboratorio: response.data.laboratorio,
        };

        setExames([...exames, novoExame]);

        /* limpando os campos do form */
        setNome('');
        setTipoexame('');
        setNomeexame('');
        setMesanoexame('');
        setLaboratorio('');
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  function deletarExame(ID: string): void {
    axios({
      method: 'delete',
      url: `http://localhost:3333/exames/${ID}`,
    })
      .then(() => {
        const novosExames = exames.filter(item => {
          return item.id !== ID;
        });
        setExames(novosExames);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <h1>Realização dos exames</h1>
      <Link to="/total" >Totais</Link>
      <form onSubmit={submterFormulario}>

        <input placeholder="nome" value={nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNome(event.target.value)} ></input>

        <input placeholder="mesanoexame" value={mesanoexame} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMesanoexame(event.target.value)} ></input>

        <select value={tipoexame} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setTipoexame(event.target.value)} >
          <option value="" >Escolha um...</option>
          <option value="Admissional" >Admissional</option>
          <option value="Periódico" >Periódico</option>
          <option value="Demissional" >Demissional</option>
        </select>

        <select value={nomeexame} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setNomeexame(event.target.value)} >
          <option value="" >Escolha um...</option>
          <option value="Hemograma Completo" >Hemograma Completo</option>
          <option value="Audiometria" >Audiometria</option>
          <option value="Acuidade Visual" >Acuidade Visual</option>
        </select>

        <select value={laboratorio} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setLaboratorio(event.target.value)} >
          <option value="" >Escolha um...</option>
          <option value="Lab Funcional" >Lab Funcional</option>
          <option value="Lab Medicina" >Lab Medicina</option>
        </select>

        <button type="submit">Cadastrar Exame</button>
      </form>

      <table>
        <thead>
          <tr>
            <td>nome</td>
            <td>mes e ano do exame</td>
            <td>tipo do exame</td>
            <td>nome do exame</td>
            <td>laboratorio</td>
            <td> </td>
          </tr>
        </thead>

        <tbody>
          {exames.map(item => {
            return (
              <tr key={item.id}>
                <td> {item.nome} </td>
                <td> {item.mesanoexame} </td>
                <td> {item.tipoexame} </td>
                <td> {item.nomeexame} </td>
                <td> {item.laboratorio} </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      deletarExame(item.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

export default Home;
