import React from 'react';

interface TableProps {
  headers: string[];
  data: Array<string[]>;
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="py-2 px-4 bg-gray-200">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-t">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 px-4">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;