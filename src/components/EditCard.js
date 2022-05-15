import {toast} from 'react-hot-toast';
import React from 'react';
import * as propTypes from 'prop-types';
import PropTypes from 'prop-types';

function EditCard(props) {
  if (props.editCardVision) {
    let name; let lastName;
    if (props.editPersonId != -1) {
      const per = props.persons.find((item) => item.id == props.editPersonId);
      name = per.name;
      lastName = per.lastName;
    } else {
      name = 'New';
      lastName = 'Person';
    }

    return (
      <div className={'editFilter'}>
        <div className={'editCard'}>

          <button className={'X'} onClick={() => {
            props.setEditCardVision(false);
          }}> X
          </button>

          <div className={'editP'}>
            <input defaultValue={name} onChange={(e) => {
              name = e.target.value;
            }}/>
            <br/>
            <input defaultValue={lastName} onChange={(e) => {
              lastName = e.target.value;
            }
            }/>
          </div>

          <button className={'O'} onClick={() => {
            if ((name != '') & (lastName != '')) {
              setEditCardVision(false);
              if (props.editPersonId != -1) {
                props.deleteRequest(editPersonId);
              }
              props.postRequest({
                'name': name,
                'lastName': lastName,
              });
              if (props.editPersonId == -1) {
                toast.success('Новый пользователь успешно создан');
              } else toast.success('Пользователь изменен');
              props.setIsLoading(true);
            } else {
              toast.error('Все поля должны быть заполнены');
            }
          }
          }> O
          </button>

        </div>
      </div>
    );
  } else return null;
}// модальное окно для редактирования

EditCard.propTypes = {
  persons: propTypes.array,
  editPersonId: PropTypes.number,
  editCardVision: PropTypes.bool,
  setEditCardVision: PropTypes.func,
  deleteRequest: PropTypes.func,
  postRequest: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default EditCard;
