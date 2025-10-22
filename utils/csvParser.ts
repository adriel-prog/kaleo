import type { BandMember } from '../types';

/**
 * Parses a simple CSV text into an array of BandMember objects.
 * Assumes the first line is the header and values are not complex (no commas within quotes).
 * @param csvText The raw CSV string content.
 * @returns An array of BandMember objects.
 */
export const parseMembersCSV = (csvText: string): BandMember[] => {
  const lines = csvText.trim().split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return []; // Return empty if no data rows

  const header = lines[0].split(',').map(h => h.trim());
  const dataRows = lines.slice(1);

  const members: BandMember[] = dataRows.map(row => {
    const values = row.split(',');
    const memberObject: { [key: string]: any } = {};

    header.forEach((key, index) => {
      const value = values[index] ? values[index].trim().replace(/"/g, '') : '';
      if (key === 'id') {
        memberObject[key] = parseInt(value, 10) || Date.now(); // Fallback to a unique ID
      } else {
        memberObject[key] = value;
      }
    });

    return memberObject as BandMember;
  });

  return members;
};