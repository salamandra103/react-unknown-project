import { useRef, useEffect } from 'react'

const useFirstInitial = () => {

    const isFirstInitial = useRef<boolean>(true);

    useEffect(() => {
        isFirstInitial.current = false;
    }, []);

    return isFirstInitial.current;
}