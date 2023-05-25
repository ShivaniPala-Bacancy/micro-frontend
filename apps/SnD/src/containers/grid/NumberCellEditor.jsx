import React, {
    forwardRef,
    useState,
    useEffect,
    useRef,
    useImperativeHandle
} from 'react';

/* eslint-disable radix,react/destructuring-assignment,class-methods-use-this,no-unused-vars,no-undef */
const NumberCellEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState(parseInt(props.value));
    const refInput = useRef(null);

    useEffect(() => {
        // focus on the input
        setTimeout(() => refInput.current.focus());
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                return value;
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            isCancelBeforeStart() {
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            isCancelAfterEnd() {
                // reject values less then 0
                return value < 0;
            }
        };
    });

    return (
        <input
            type="number"
            min={0}
            step={1}
            ref={refInput}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            style={{width: '100%'}}
        />
    );
});
export default NumberCellEditor;
