import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';

type MessageType = string | undefined | null;

function useMessage(
    success: MessageType,
    error: MessageType,
    warning: MessageType,
    resetMessages: any
) {
    const [t] = useTranslation();
    useEffect(() => {
        if (success) {
            toast.success(t(success));
            resetMessages();
        }
    }, [success]);
    useEffect(() => {
        if (error) {
            toast.error(t(error));
            resetMessages();
        }
    }, [error]);
    useEffect(() => {
        if (warning) {
            toast.warning(t(warning));
            resetMessages();
        }
    }, [warning]);
}

export default useMessage;
