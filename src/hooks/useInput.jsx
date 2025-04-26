import { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  const setNewValue = (newValue) => {
    setValue(newValue);
  }

  return {
    value,
    onChange,
    reset,
    setNewValue
  };
}

export default useInput;