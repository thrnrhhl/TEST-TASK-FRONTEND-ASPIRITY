import { useAppSelector } from "../../shared/config/hooks";
import { TaskItem } from "../../features/task-item";
import styles from './styles.module.scss';

export const TaskList = () => {
    const taskList = useAppSelector(state => state.task.list);
    const selectedTasks = useAppSelector(state => state.task.selectedTasks);

    return (
        <div className={styles.task_list}>
            {taskList.map((key) => (
                <TaskItem key={key.id} {...key} checked={selectedTasks.includes(key.id)} />
            ))}
        </div>
    )
}