import PropTypes from 'prop-types';
import React from 'react';

function PersonCard(props) {
  return (
    <div className={'personCard'}>
      <div className={'cardContent'}>
        <el className={'idContent'}> {props.id} </el>
        {props.name} {props.lastName}
      </div>

      <div className={'buttonsBlock'}>

        <button className={'editButton'} onClick={() => {
          props.setEditPersonId(props.id);
          props.setEditCardVision(true);
        }}> edit
        </button>

        <button className={'deleteButton'} onClick={() => {
          props.setEditPersonId(props.id);
          props.setAgrVision(true);
        }}> delete
        </button>

      </div>
    </div>
  );
}// компонент карты пользователя

PersonCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  lastName: PropTypes.string,
  setEditPersonId: PropTypes.func,
  setEditCardVision: PropTypes.func,
  setAgrVision: PropTypes.func,
};

export default PersonCard;
