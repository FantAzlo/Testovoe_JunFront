import "./style.css"
import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";

function App() {
    const url = 'http://localhost:3001/persons'
    const [persons, setPersons] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (response.ok) return response.json()
                else toast.error('Error' + response.status)
            })
            .then(data => {
                setPersons(data)
                setIsLoading(false)
            })
    }, [isLoading])
    useEffect(() => {
        updateCards()
    }, [persons])

    function deleteRequest(id) {
        fetch(url + '/' + id, {method: 'DELETE'})
            .then(response => {
                if (response.ok) return response.json()
                else toast.error('Error' + response.status)
            })
            .then(data => console.log(data))
    }

    function postRequest(person) {
        fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(person)})
            .then(response => {
                if (response.ok) return response.json()
                else toast.error('Error' + response.status)
            })
            .then(data => console.log(data))
    }

    function Header() {
        return (
            <div className={"Header"}>
                <div className={"HeadText"}>
                    <el className={"idContent"}>id</el>
                    Имя Фамилия
                </div>
            </div>
        )
    }

    const [cards, cardsChange] = useState(persons.map(person =>
        <PersonCard
            id={person.id}
            name={person.name}
            lastName={person.lastName}
        />))

    function updateCards() {
        cardsChange(persons.map(person =>
            <PersonCard
                id={person.id}
                name={person.name}
                lastName={person.lastName}
            />))
    }//обновляет массив карт

    function PersonCard(props) {

        return (
            <div className={"personCard"}>
                <div className={"cardContent"}>
                    <el className={"idContent"}> {props.id} </el>
                    {props.name} {props.lastName}
                </div>

                <div className={"buttonsBlock"}>

                    <button className={"editButton"} onClick={() => {
                        setEditPersonId(props.id)
                        setEditCardVision(true)
                    }}> edit
                    </button>

                    <button className={"deleteButton"} onClick={() => {
                        setEditPersonId(props.id)
                        setAgrVision(true)
                    }}> delete
                    </button>

                </div>
            </div>
        )
    }//компонент карты пользователя

    const [editCardVision, setEditCardVision] = useState(false)
    const [agrVision, setAgrVision] = useState(false)

    function Agr() {
        let per = persons.find(item => item.id == editPersonId)
        if (agrVision) return (
            <div className={"editFilter"}>
                <div className={"editCard"}>
                    <button className={"X"} onClick={() => {
                        setAgrVision(false)
                    }}> X
                    </button>

                    <div className={"editP"}>
                        Удалить этого пользователя?
                        <br/>
                        id :
                        <el style={{color: "white"}}> {per.id} </el>
                        <br/>
                        <el style={{color: "white"}}>{per.name} </el>
                        <br/>
                        <el style={{color: "white"}}>{per.lastName} </el>
                    </div>

                    <button className={"O"} onClick={() => {
                        setAgrVision(false)
                        deleteRequest(editPersonId)
                        setIsLoading(true)
                        toast.success('Пользователь успешно удален')
                    }
                    }> O
                    </button>
                </div>
            </div>)
        else return null
    }//модальноее окно удаления

    const [editPersonId, setEditPersonId] = useState(0)

    function EditCard() {
        if (editCardVision) {
            let name, lastName
            if (editPersonId != -1) {
                let per = persons.find(item => item.id == editPersonId)
                name = per.name
                lastName = per.lastName
            } else {
                name = 'New'
                lastName = 'Person'
            }

            return (
                <div className={"editFilter"}>
                    <div className={'editCard'}>

                        <button className={"X"} onClick={() => {
                            setEditCardVision(false)
                        }}> X
                        </button>

                        <div className={"editP"}>
                            <input defaultValue={name} onChange={(e) => {
                                name = e.target.value
                            }}/>
                            <br/>
                            <input defaultValue={lastName} onChange={(e) => {
                                lastName = e.target.value
                            }
                            }/>
                        </div>

                        <button className={"O"} onClick={() => {
                            if ((name != '') & (lastName != '')) {
                                setEditCardVision(false)
                                if (editPersonId != -1) deleteRequest(editPersonId)
                                postRequest({
                                    "name": name,
                                    "lastName": lastName
                                })
                                if (editPersonId == -1) toast.success('Новый пользователь успешно создан')
                                else toast.success('Пользователь изменен')
                                setIsLoading(true)
                            }
                            else {
                                toast.error('Все поля должны быть заполнены')
                            }
                        }
                        }> O
                        </button>

                    </div>
                </div>
            )
        } else return null
    }//модальное окно для редактирования


    if (!isLoading) return (
        <div className="App">

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

            <Header/>
            <Agr/>
            <EditCard/>

            <div className={"content"}>{cards}</div>

            <button className={"addButton"} onClick={() => {
                setEditPersonId(-1)
                setEditCardVision(true)
            }}> + add new person

            </button>

        </div>//Если получен ответ от серввера
    )
    else return (
        <div className="App">
            <Toaster
                position="bottom-center"
                reverseOrder={false}/>
            <Header/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p className={'waitMes'}>Нет связи с сервером, пожалуйста подождите...</p>
        </div>//Если не получен ответ от серввера
    )
}

export default App;
