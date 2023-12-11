import { api } from "@/src/shared/api";
import { Task } from "@/src/shared/config/models";
import { useToggle } from "@uidotdev/usehooks";
import { Edit, Save } from "lucide-react";
import { ChangeEvent, FC, memo, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { selectTask } from "@/src/entities/task/model";
import styles from './styles.module.scss';
import moment from "moment";
interface Props extends Task {
    checked: boolean;
};

export const TaskItem: FC<Props> = memo(({ id, description, checked, createdAt }) => {
    const [updateTaskQuery] = api.useUpdateTaskMutation();
    const [isEdit, toggleEdit] = useToggle();
    const [updatedDescription, setUpdatedDescription] = useState<string>('');
    const dispatch = useDispatch();


    // Нажатие кнопки редактировать
    const handleEdit = (e: MouseEvent<HTMLOrSVGElement>) => {
        e.stopPropagation();
        setUpdatedDescription(description);
        toggleEdit();
    }

    // Изменение описания
    const handleChangeDescrciption = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUpdatedDescription(e.target.value || '');
    };

    // Сохранение изменений
    const handleSave = async (e: MouseEvent<HTMLOrSVGElement>) => {
        e.stopPropagation();
        if (description !== updatedDescription) {
            await updateTaskQuery({ id, description: updatedDescription });
        }
        toggleEdit();
    };

    // Выбор задачи
    const handleSelectTask = () => {
        dispatch(selectTask(id));
    };

    return (
        <div className={styles.task_item}>
            <span className="text-sm text-[#525252]">{moment(createdAt).local().format('DD.MM.YYYY HH:mm')}</span>
            <div className={styles.task_item__wrapper}>
                <input type="checkbox" checked={checked} value={id} onChange={handleSelectTask} />
                {isEdit && (
                    <>
                        <textarea defaultValue={description} className={styles.task_item__textarea} onChange={handleChangeDescrciption} />
                        <Save onClick={handleSave} className={styles.task_item__icon} />
                    </>
                )}
                {!isEdit && (
                    <>
                        <p className={styles.task_item__text}>{description}</p>
                        <Edit onClick={handleEdit} className={styles.task_item__icon} />
                    </>
                )}
            </div>
        </div>
    );
});