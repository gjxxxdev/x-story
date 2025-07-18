import { useState, useRef, useCallback } from 'react';

const useStateRef = (defaultValue) => {
  let [state, setState] = useState(defaultValue);
  let ref = useRef(state);

  let dispatch = useCallback(function (val) {
    ref.current = typeof val === "function" ? val(ref.current) : val;

    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
};

export default useStateRef;
