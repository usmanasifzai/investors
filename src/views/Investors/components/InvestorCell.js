import { useState, useEffect, useRef } from 'react';

export default function InvestorCell({ index, info, handleInvesterInfoChange }) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(info.text);
  const inputRef = useRef(null);

  useEffect(() => setValue(info.text), [info.text]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleValueChange = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (event) => {
    const { key, target } = event;

    if (['Enter', 'Tab'].includes(key)) {
      handleInvesterInfoChange({ [info.type]: target.value }, index);

      setValue(target.value);
      setEditing(false);
    } else if (key === 'Escape') {
      setValue(info.text);
      setEditing(false);
    }
  };

  const handleOnBlur = (event) => {
    const { key, target } = event;

    setEditing(false);

    if (key === 'Escape') return;

    setValue(target.value);
    handleInvesterInfoChange({ [info.type]: target.value }, index);
  };

  return(
    <>
      {
        isEditing ? (
          <td
            onBlur={handleOnBlur}
            onKeyDown={handleKeyDown}
          >
            <input
              type={(info.type === 'allocation' || info.type === 'equity') ? 'number' : 'text' }
              ref={inputRef} value={value}
              onChange={handleValueChange}
            />
          </td>
        ) : <td onClick={() => setEditing(true)}>
            {info.type === 'allocation' && '$'}
            {(info.type === 'allocation' || info.type === 'equity') ?  value?.toLocaleString() : value}
            {info.type === 'equity' && '%'}
          </td>
      }
    </>
  )
};
