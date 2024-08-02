import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  list: Todo[];
  onDelete: (id: number) => void;
  idTodo: number;
  onTodoStatus: (id: number) => void;
  editTitle: string;
  editingTodoId: number | null;
  onEditChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEdit: () => void;
  onStartEditing: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  list,
  onDelete,
  idTodo,
  onTodoStatus,
  onStartEditing,
  editTitle,
  onEditChange,
  onSaveEdit,
  editingTodoId,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSaveEdit();
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {list.map(({ title, id, completed, userId }) => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: completed })}
          key={id}
        >
          {/* eslint-disable jsx-a11y/label-has-associated-control  */}
          <label className="todo__status-label" htmlFor={String(id)}>
            <input
              id={'' + id}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => onTodoStatus(id)}
            />
          </label>

          {id === editingTodoId ? (
            <input
              type="text"
              className="todo__edit-input"
              value={editTitle}
              onChange={onEditChange}
              onBlur={onSaveEdit}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() =>
                onStartEditing({ id, title, completed, userId })
              }
            >
              {title}
            </span>
          )}

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(id)}
          >
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': id === idTodo,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
