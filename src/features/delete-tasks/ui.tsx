import { useAppSelector } from "../../shared/config/hooks";
import { api } from "../../shared/api";
import { Button } from "../../shared/ui";
import { MinusCircle } from "lucide-react";
import styles from './styles.module.scss';

export const DeleteTasks = () => {
    const selectedTasks = useAppSelector(state => state.task.selectedTasks);
    const [deleteTasksQuery] = api.useDeleteTaskMutation();

    const handleDeleteTasks = async () => {
        try {
            await deleteTasksQuery(selectedTasks);
        } catch (e) {
            console.log(e);
        }
    };

    return <Button variant="danger" onClick={handleDeleteTasks}>
        <MinusCircle className={styles.delete_tasks__w_5_h_5} />
        Удалить
    </Button>
};