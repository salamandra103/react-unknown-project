import React, { useState, useEffect, useRef } from 'react'

export const useFirstMount = () => {
    const init = useRef(true)
    useEffect(() => {
        init.current = false;
    })
    return init.current
}