import { useMatches, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const usePageTitle = () => {
  const matches = useMatches();
  const location = useLocation(); 
  const [title, setTitle] = useState("Helpify");

  useEffect(() => {
    const lastMatch = matches[matches.length - 1];
    setTitle(lastMatch?.handle?.title || "Helpify");
  }, [location, matches]);

  return title;
};

export default usePageTitle;