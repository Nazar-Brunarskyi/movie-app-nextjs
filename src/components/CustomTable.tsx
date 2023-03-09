import { FC, memo } from 'react';

interface Props {
  tableRows: [string, string | number][];
}

export const CustomTable: FC<Props> = memo(
  ({ tableRows }) => {
    return (
      <div className="customTable">
        <table className='customTable__table'>
          <tbody>
            {tableRows.map(row => (
              <tr className="customTable__row" key={row[0]}>
                <td className="customTable__colum" style={{ fontWeight: 'bold' }}>{row[0]}</td>
                <td className="customTable__colum">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);