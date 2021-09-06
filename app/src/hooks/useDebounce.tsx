import React, { useState, useEffect } from 'react'

export const useDebounce = (value: string, delay: number) => {
    const [stateValue, setStateValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStateValue(value)
        }, delay)
        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return stateValue;
}