import type { BandMember } from '../types';

/**
 * Transforms a Google Drive sharing URL into a direct, embeddable image URL
 * wrapped in a reliable image proxy for CORS compatibility.
 * @param url The original URL from the spreadsheet.
 * @returns A transformed, web-friendly image URL.
 */
const transformPhotoUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';

  // If it's already a direct image link or a proxied URL, return it as is.
  // This prevents re-processing of already valid URLs.
  if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i) || url.includes('images.weserv.nl') || url.includes('i.imgur.com')) {
    return url;
  }

  // Regex to capture the file ID from various Google Drive URL formats.
  const googleDriveRegex = /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
  const match = url.match(googleDriveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    // Construct the direct-view URL for Google content.
    const directUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
    // Use the images.weserv.nl proxy to ensure the image loads correctly on the website
    // by handling potential CORS (Cross-Origin Resource Sharing) issues.
    return `https://images.weserv.nl/?url=${encodeURIComponent(directUrl)}`;
  }
  
  // If the URL doesn't match any known patterns to transform, return it unchanged.
  return url;
};


/**
 * Parses a CSV text from the band's Google Sheet into an array of BandMember objects.
 * It skips the header and maps columns by their position.
 * @param csvText The raw CSV string content from the Google Sheet.
 * @returns An array of BandMember objects.
 */
export const parseMembersCSV = (csvText: string): BandMember[] => {
  const lines = csvText.trim().split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return []; // Return empty if no data rows

  const dataRows = lines.slice(1); // Skip header row

  const members: BandMember[] = dataRows.map((row, index) => {
    // This regex handles quoted fields that may contain commas.
    const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    
    const cleanValue = (value: string) => value ? value.trim().replace(/^"|"$/g, '') : '';

    const name = cleanValue(values[1]);
    const role = cleanValue(values[2]);
    const photoUrlRaw = cleanValue(values[3]);
    const photoUrl = transformPhotoUrl(photoUrlRaw);
    const instagram = cleanValue(values[4]);
    
    // GLOBAL FIX: To ensure consistent and correct framing for all members,
    // all photos will be aligned to the top by default. This resolves previous
    // issues with heads being cut off and overrides any setting from the spreadsheet.
    const photoPosition = 'top';

    return {
      id: index + 1, // Use row index + 1 as a stable ID
      name: name || 'Nome não informado',
      role: role || 'Função não informada',
      photoUrl: photoUrl,
      instagram: instagram,
      photoPosition: photoPosition,
    };
  }).filter(member => member.name && member.name !== 'Nome não informado' && member.name.trim() !== ''); // Filter out completely empty rows;

  return members;
};