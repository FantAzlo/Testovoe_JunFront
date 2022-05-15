import './style.css';
import React from 'react';
import {useEffect, useState} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import Header from './components/Header';
import PersonCard from './components/PersonCard';
import Agr from './components/Agr';
import EditCard from './components/EditCard';

function App() {// Main component
  const url = 'http://localhost:3001/persons';
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
        .then((response) => {
          if (response.ok) return response.json();
          else toast.error('Error' + response.status);
        })
        .then((data) => {
          setPersons(data);
          setIsLoading(false);
        });
  }, [isLoading]);
  useEffect(() => {
    updateCards();
  }, [persons]);

  function deleteRequest(id) {
    fetch(url + '/' + id, {method: 'DELETE'})
        .then((response) => {
          if (response.ok) return response.json();
          else toast.error('Error' + response.status);
        })
        .then((data) => data);
  }

  function postRequest(person) {
    fetch(url,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(person)})

        .then((response) => {
          if (response.ok) return response.json();
          else toast.error('Error' + response.status);
        })
        .then((data) => data);
  }

  const [cards, cardsChange] = useState(persons.map((person) =>
    <PersonCard
      key = {person.id}
      id={person.id}
      name={person.name}
      lastName={person.lastName}
      setAgrVision={setAgrVision}
      setEditCardVision={setEditCardVision}
      setEditPersonId={setEditPersonId}
    />));

  function updateCards() {
    cardsChange(persons.map((person) =>
      <PersonCard
        key ={person.id}
        id={person.id}
        name={person.name}
        lastName={person.lastName}
        setAgrVision={setAgrVision}
        setEditCardVision={setEditCardVision}
        setEditPersonId={setEditPersonId}
      />));
  }// обновляет массив карт

  const [editCardVision, setEditCardVision] = useState(false);
  const [agrVision, setAgrVision] = useState(false);
  const [editPersonId, setEditPersonId] = useState(0);

  if (!isLoading) {
    return (
      <div className='App'>

        <Toaster
          position='bottom-center'
          reverseOrder={false}
        />

        <Header/>

        <Agr persons = {persons}
          editPersonId = {editPersonId}
          agrVision = {agrVision}
          setAgrVision = {setAgrVision}
          deleteRequest = {deleteRequest}
          setIsLoading = {setIsLoading}
        />

        <EditCard persons = {persons}
          editPersonId = {editPersonId}
          editCardVision = {editCardVision}
          setEditCardVision = {setEditCardVision}
          deleteRequest = {deleteRequest}
          postRequest={postRequest}
          setIsLoading = {setIsLoading}/>

        <div className={'content'}>{cards}</div>

        <button className={'addButton'} onClick={() => {
          setEditPersonId(-1);
          setEditCardVision(true);
        }}> + add new person

        </button>

      </div>// Если получен ответ от серввера
    );
  } else {
    return (
      <div className='App'>
        <Toaster
          position='bottom-center'
          reverseOrder={false}/>
        <Header/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p className={'waitMes'}>
            Нет связи с сервером, пожалуйста подождите...
        </p>
      </div>// Если не получен ответ от серввера
    );
  }
}// Main App

export default App;
