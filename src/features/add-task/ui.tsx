import { api } from '../../shared/api';
import { IAddTaskForm } from '@/src/shared/api/model';
import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
import { useToggle } from '@uidotdev/usehooks';
import { Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, useRef } from 'react';
import { initialValues, validationSchema } from './model';
import { Button } from '../../shared/ui';
import styles from './styles.module.scss';
import { PlusCircle } from 'lucide-react';

export const AddTask = () => {
    const [addTaskQuery] = api.useAddTaskMutation();
    const [open, toggleOpen] = useToggle();
    const formikRef = useRef<null | FormikProps<IAddTaskForm>>(null)

    const handleClick = () => toggleOpen();

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        formikRef.current?.setFieldValue('description', e.target.value)
    };

    const onSubmit = async (values: IAddTaskForm) => {
        try {
            await addTaskQuery(values);
            toggleOpen();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleClick}>
                <PlusCircle className={styles.add_task__w_5_h_5} />
                Добавить задачу
            </Button>
            <Dialog open={open} onOpenChange={toggleOpen}>
                <DialogOverlay className="dialog__overlay" />
                <DialogContent className="dialog__content">
                    <Formik
                        innerRef={formikRef}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div>
                                <label>Введите задачу</label>
                                <textarea className={styles.add_task__textarea} onChange={handleChangeDescription} />
                            </div>
                            <Button variant="primary" className={styles.add_task__submit}>
                                <PlusCircle className={styles.add_task__w_5_h_5} />
                                Cоздать
                            </Button>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};