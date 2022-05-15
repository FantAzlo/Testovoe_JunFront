import {toast} from 'react-hot-toast';
import React from 'react';
import PropTypes from 'prop-types';
import * as propTypes from 'prop-types';

function Agr(props) {
  if (props.agrVision) {
    const per = props.persons.find((item) => item.id === props.editPersonId);
    return (
      <div className={'editFilter'}>
        <div className={'editCard'}>
          <button className={'X'} onClick={() => {
            props.setAgrVision(false);
          }}> X
          </button>

          <div className={'editP'}>
                        Удалить этого пользователя?
            <br/>
                        id :
            <el style={{color: 'white'}}> {per.id} </el>
            <br/>
            <el style={{color: 'white'}}>{per.name} </el>
            <br/>
            <el style={{color: 'white'}}>{per.lastName} </el>
          </div>

          <button className={'O'} onClick={() => {
            props.setAgrVision(false);
            props.deleteRequest(props.editPersonId);
            props.setIsLoading(true);
            toast.success('Пользователь успешно удален');
          }
          }> O
          </button>
        </div>
      </div>);
  } else return null;
}// модальноее окно удаления

Agr.propTypes = {
  persons: propTypes.array,
  editPersonId: PropTypes.number,
  agrVision: PropTypes.bool,
  setAgrVision: PropTypes.func,
  deleteRequest: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default Agr;
