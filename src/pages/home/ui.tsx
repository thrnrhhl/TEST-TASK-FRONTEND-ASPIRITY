import { api } from "../../shared/api";
import { AddTask } from "../../features/add-task";
import { DeleteTasks } from "../../features/delete-tasks";
import { Title } from "../../shared/ui";
import { TaskList } from "../../widgets/task-list";
import styles from './styles.module.scss';

export const HomePage = () => {
    api.useGetTasksQuery(null);

    return (
        <div className={styles.home_page}>

            <div className={styles.home_page__btn_group}>
                <Title className={styles.home_page__btn_group__flex_1}>TODO</Title>
                <AddTask />
                <DeleteTasks />
            </div>
            <TaskList />
        </div>
    );
};