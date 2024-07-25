import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.css'; // Assurez-vous de créer ce fichier pour les styles d'animation

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div>
      <h2>Tasks</h2>
      <TransitionGroup>
        {tasks.map((task) => (
          <CSSTransition key={task.id} timeout={500} classNames="task">
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
              </div>
              <div>
                <Button color="primary" size="sm" onClick={() => editTask(task)} className="mr-2">Edit</Button>
                <Button color="danger" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
              </div>
            </ListGroupItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TaskList;
