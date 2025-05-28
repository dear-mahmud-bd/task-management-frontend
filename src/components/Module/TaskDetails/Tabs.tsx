import React from 'react';

interface TabsProps {
  selected: number;
  setSelected: (value: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ selected, setSelected }) => {
  return (
    <div className="tabs tabs-boxed">
      <button
        className={`tab ${selected === 0 && 'tab-active font-bold underline'}`}
        onClick={() => setSelected(0)}
      >
        Details
      </button>
      <button
        className={`tab ${selected === 1 && 'tab-active font-bold underline'}`}
        onClick={() => setSelected(1)}
      >
        Activity
      </button>
    </div>
  );
};

export default Tabs;
