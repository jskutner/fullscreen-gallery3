export interface GalleryData {
  piid: string;
  productId: string;
  scid: string;
  galleryName: string;
  thumbnailImage: string;
}

export interface GoogleSheetsResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

/**
 * Fetches gallery data from a public Google Sheet
 * 
 * Sheet should have columns in this order:
 * PIID | Product ID | SCID | Gallery Name | Thumbnail Image
 * 
 * @param sheetId - The Google Sheet ID from the URL
 * @param range - The range to fetch (e.g., 'Sheet1!A2:E') - excludes header row
 * @returns Array of gallery configurations
 */
export async function fetchGalleryDataFromSheet(
  sheetId: string, 
  range: string = 'Sheet1!A2:E'
): Promise<GalleryData[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${process.env.GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }
    
    const data: GoogleSheetsResponse = await response.json();
    
    if (!data.values) {
      return [];
    }
    
    // Transform rows into gallery objects
    const galleries: GalleryData[] = data.values
      .filter(row => row.length >= 5) // Ensure all required columns are present
      .map(row => ({
        piid: row[0]?.trim() || '',
        productId: row[1]?.trim() || '',
        scid: row[2]?.trim() || '',
        galleryName: row[3]?.trim() || '',
        thumbnailImage: row[4]?.trim() || ''
      }))
      .filter(gallery => 
        gallery.piid && 
        gallery.productId && 
        gallery.scid && 
        gallery.galleryName
      ); // Only include complete entries
    
    return galleries;
  } catch (error) {
    console.error('Error fetching gallery data from Google Sheets:', error);
    throw error;
  }
}

/**
 * Robust CSV line parsing that handles quoted fields and commas within fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  
  return result;
}

/**
 * Alternative method for client-side fetching without API key
 * Uses the CSV export functionality of public Google Sheets
 */
export async function fetchGalleryDataFromPublicSheet(sheetId: string): Promise<GalleryData[]> {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('CSV Response:', csvText.substring(0, 500) + '...');
    const lines = csvText.split('\n');
    
    // Skip header row and parse CSV
    const galleries: GalleryData[] = lines
      .slice(1) // Skip header
      .filter(line => line.trim()) // Remove empty lines
      .map(line => {
        // More robust CSV parsing for Google Sheets format
        const columns = parseCSVLine(line);
        
        if (columns.length >= 5) {
          // Map columns based on actual CSV structure: Gallery Name, Thumbnail Image, PIID, Product ID, SCID
          return {
            galleryName: columns[0] || '',
            thumbnailImage: columns[1] || '',
            piid: columns[2] || '',
            productId: columns[3] || '',
            scid: columns[4] || ''
          };
        }
        return null;
      })
      .filter((gallery): gallery is GalleryData => 
        gallery !== null && 
        gallery.piid !== '' && 
        gallery.productId !== '' && 
        gallery.scid !== '' && 
        gallery.galleryName !== ''
      );
    
    console.log('Parsed galleries:', galleries);
    return galleries;
  } catch (error) {
    console.error('Error fetching gallery data from public Google Sheet:', error);
    throw error;
  }
} 