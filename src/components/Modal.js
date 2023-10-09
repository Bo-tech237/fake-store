import { useRef, useEffect } from 'react';

export default function Modal({ open, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialogNode = dialogRef.current;
        if (open) {
            dialogNode.showModal();
        } else {
            dialogNode.close();
        }
    }, [open]);

    return <dialog ref={dialogRef}>{children}</dialog>;
}
