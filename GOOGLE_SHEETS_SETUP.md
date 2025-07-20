# Google Sheets Setup Guide

This guide explains how to set up the Google Sheets backend for your Eko Gallery Showcase.

## Overview

The gallery showcase fetches gallery data from a public Google Sheet, eliminating the need to update gallery lists in code. The sheet should contain information about each Eko gallery you want to display.

## Google Sheet Setup

### 1. Create a Google Sheet

Create a new Google Sheet with the following column structure:

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| PIID | Product ID | SCID | Gallery Name | Thumbnail Image |

### 2. Add Your Gallery Data

Fill in your galleries with the appropriate data:

**Example:**
```
PIID                                  | Product ID              | SCID                                  | Gallery Name        | Thumbnail Image
f9bf5b29-89fa-45cf-9940-c6962825146f | high-anxiety            | 71e2e7cb-eb18-4da9-a37b-6566557c8d1f | High Anxiety Movie  | https://example.com/thumb1.jpg
a08d9148-476b-4a21-b803-1c18525e1bca | idc_walmart_gallery_mock| 71e2e7cb-eb18-4da9-a37b-6566557c8d1f | Walmart Gallery     | https://example.com/thumb2.jpg
```

### 3. Make the Sheet Public

1. Click the **Share** button in the top-right corner
2. Click **Change to anyone with the link**
3. Set permissions to **Viewer**
4. Click **Copy link** to get the sheet URL

### 4. Get the Sheet ID

From your Google Sheet URL, extract the Sheet ID:
```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit#gid=0
```

## Environment Configuration

### Option 1: Using CSV Export (Recommended - No API Key Required)

Add this to your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id_here
```

This method uses the public CSV export feature and doesn't require any API keys.

### Option 2: Using Google Sheets API (Advanced)

If you need more control, you can use the Google Sheets API:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create an API Key credential
5. Restrict the API key to Google Sheets API only

Add both variables to your `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SHEETS_API_KEY=your_api_key_here
```

## Testing Your Setup

1. Start your development server: `npm run dev`
2. Navigate to `/galleries` to see your gallery showcase
3. Verify that your galleries are loading from the Google Sheet

## Troubleshooting

### Common Issues:

1. **"Google Sheet ID not configured"**
   - Make sure `NEXT_PUBLIC_GOOGLE_SHEET_ID` is set in your `.env.local`
   - Restart your development server after adding the environment variable

2. **"Failed to fetch CSV"**
   - Verify the Google Sheet is publicly accessible
   - Check that the Sheet ID is correct
   - Make sure the sheet contains data in the expected format

3. **Images not loading**
   - Ensure thumbnail URLs are publicly accessible
   - Check that image URLs are valid and return actual images
   - The system will show placeholders for failed images

### Sheet Format Requirements:

- Column A: PIID (required)
- Column B: Product ID (required) 
- Column C: SCID (required)
- Column D: Gallery Name (required)
- Column E: Thumbnail Image URL (optional, but recommended)

All rows with missing required fields will be filtered out automatically.

## Sample Google Sheet Template

You can copy this [sample sheet](https://docs.google.com/spreadsheets/d/1example) as a starting point, or create your own following the format above.

## Next Steps

Once your Google Sheet is configured:

1. Add your gallery data to the sheet
2. Update the environment variable with your Sheet ID  
3. The gallery showcase will automatically refresh with your latest data
4. No code deployment needed for content updates! 