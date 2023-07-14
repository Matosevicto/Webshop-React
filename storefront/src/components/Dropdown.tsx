import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOptions,
  onOptionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionChange = (option: string) => {
    onOptionChange(option);
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button className="dropdown-toggle" onClick={handleToggle}>
        {label}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <label className="dropdown-item" key={option}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
