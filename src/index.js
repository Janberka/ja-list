import { useState, useEffect } from 'react';

const List = (props) => {
  const { items: initialItems, load, children, update, query } = props;
  const [ items, setItems ] = useState(initialItems);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  update.current = async() => {
    setError(false);
    setLoading(true);
    try {
      const items = await load(query);
      setItems(items);    
    } catch(e) {
      setItems([]);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    update.current();
  }, [JSON.stringify(query)]);

  const childrenProps = {
    loading,
    items,
    error,
    update: update.current
  };

  return children(childrenProps);
};

export default List;
