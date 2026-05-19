# FF&E / OS&E Inspection Checklist
### Mint House by Kasa — Dallas Downtown

A Kasa-branded, browser-based inspection checklist for tracking Furniture, Fixtures & Equipment (FF&E) and Operating Supplies & Equipment (OS&E) across all units at Mint House by Kasa – Dallas Downtown. Completed reports submit directly to a master Google Sheet.

---

## What it does

- Loads the full unit roster (floors 49 and 50) with room types pre-mapped
- Filters checklist items dynamically based on kitchen type (full kitchen, kitchenette, or no kitchen)
- Lets inspectors check off items, enter quantities, mark items N/A, add per-item notes, and reset individual rows
- Tracks progress in real time with a completion counter and progress bar
- Confirms room type accuracy with a verification checkbox and free-text notes field
- On submit, sends all data as rows to a master Google Sheet and resets the form for the next unit

---

## File structure

```
kasa-checklist/
├── index.html    # App shell — markup, layout, modal
├── style.css     # Kasa brand tokens, component styles, responsive rules
├── script.js     # All app logic — data, state, render, submit
└── README.md     # This file
```

No build tools, no dependencies, no frameworks. Drop the three files in a folder and open `index.html`.

---

## Setup

### 1. Clone or download

```bash
git clone https://github.com/your-org/kasa-checklist.git
cd kasa-checklist
```

Or simply download and unzip the three files into a folder.

### 2. Open locally

```bash
open index.html
# or on Windows:
start index.html
```

Works in any modern browser (Chrome, Firefox, Safari, Edge). No server required for local use.

### 3. Deploy (optional)

Upload all three files to any static host — Netlify, Vercel, GitHub Pages, or an S3 bucket with static hosting. No server-side code needed.

---

## Google Sheets integration

Completed inspections are submitted to:

| Setting | Value |
|---|---|
| Sheet name | Mint House DTD-Kasa FF&E OS&E Master |
| Sheet ID | `1kC-UgNC3ouwhviMMTiCnxVvcs-GALR9w98K8bBhDIi4` |
| Tab | `FFE_OSE_Reports` |
| Sheet URL | [Open in Google Sheets](https://docs.google.com/spreadsheets/d/1kC-UgNC3ouwhviMMTiCnxVvcs-GALR9w98K8bBhDIi4/edit) |

Each submission appends one row per checklist item. If the `FFE_OSE_Reports` tab does not yet exist, it is created automatically with a header row styled in Kasa Midnight Blue on first submit.

### How it works

The app POSTs data to a **Google Apps Script Web App** (`Code.gs`) which writes to the sheet server-side using the Sheets API. This is a one-time setup.

---

### One-time setup — deploy the Apps Script

#### Step 1 — Open Apps Script

1. Open the master Google Sheet: [Mint House DTD-Kasa FF&E OS&E Master](https://docs.google.com/spreadsheets/d/1kC-UgNC3ouwhviMMTiCnxVvcs-GALR9w98K8bBhDIi4/edit)
2. Click **Extensions → Apps Script**
3. The Apps Script editor opens in a new tab

#### Step 2 — Paste Code.gs

1. Delete any existing code in the editor
2. Copy the entire contents of `Code.gs` from this project
3. Paste it into the editor
4. Click **Save** (Ctrl/Cmd + S) and name the project `Kasa FFE OSE Checklist`

#### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to **Type** and select **Web app**
3. Fill in the settings:
   - **Description:** `Kasa FF&E OS&E Checklist v1`
   - **Execute as:** `Me` (your Google account — must have edit access to the sheet)
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. Authorize the app when prompted (click **Review permissions → Allow**)
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

#### Step 4 — Paste the URL into script.js

Open `script.js` and replace the placeholder on line 10:

```js
// Before:
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

// After:
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```

Save the file. The Submit button will now write directly to the sheet.

#### Step 5 — Test it

Open the sheet URL in your browser — you should see the page load with "✓ Kasa FF&E OS&E — Apps Script is running". That confirms the web app is live.

Then complete a checklist entry in the app and submit. Rows will appear in the `FFE_OSE_Reports` tab within a few seconds.

---

### Redeploying after code changes

If you edit `Code.gs`, you must create a **new deployment** for changes to take effect:

1. Click **Deploy → Manage deployments**
2. Click the edit (pencil) icon on your existing deployment
3. Change **Version** to **New version**
4. Click **Deploy**

The URL stays the same — no need to update `script.js`.

---

### Column structure

| Column | Description |
|---|---|
| Date | Inspection date (MM/DD/YYYY) |
| Unit | Unit number (e.g. 4901) |
| Room Type | Room type label (e.g. 1BD K, STU-K, 2BD KK) |
| Kitchen Type | full kitchen / kitchenette / no kitchen |
| RT Confirmed | Yes / No — room type verified by inspector |
| Unit Notes | Free-text notes about the unit |
| Tab | FF&E or OS&E |
| Section | Section name (e.g. Bedroom, Bathroom, Kitchen) |
| Item | Item description |
| Status | Yes (checked) / No (unchecked) / N/A |
| Qty | Quantity entered by inspector |
| Item Notes | Per-item free-text notes |

### Troubleshooting

| Problem | Fix |
|---|---|
| "YOUR_APPS_SCRIPT_URL_HERE" error on submit | Paste your deployed Web App URL into `APPS_SCRIPT_URL` in `script.js` |
| Rows not appearing in sheet | Check that **Execute as** is set to your account and that account has edit access to the sheet |
| Authorization error | Re-deploy and re-authorize; make sure **Who has access** is set to `Anyone` |
| Changes to Code.gs not working | You must create a new version deployment — editing the script alone does not update a live deployment |

If submission fails, the form data is not lost. You can dismiss the error and retry without re-entering anything.

---

## Unit roster

The app includes all 62 units across floors 49 and 50. Room types are pre-mapped and auto-populate the Room Type field when a unit is selected.

| Room type code | Description |
|---|---|
| 1BD K | One-bedroom with full kitchen |
| 1BD K Dlx | One-bedroom deluxe with full kitchen |
| 2BD KK | Two-bedroom with two full kitchens |
| STU-K | Studio with kitchen |
| STU-K Dlx | Studio deluxe with kitchen |
| STU-K Suite | Studio suite with kitchen |
| STU-K ADA | ADA studio with kitchen |
| RM-K | Room with kitchenette |

Selecting a unit automatically sets the kitchen type dropdown to the appropriate default (RM-K units default to kitchenette; all others default to full kitchen). Inspectors can override this manually if needed.

---

## Checklist sections

### FF&E (Furniture, Fixtures & Equipment)
- Bedroom (17 items)
- Bathroom — per bedroom (9 items)
- Living / common area (11 items)
- Kitchen / kitchenette — filtered by kitchen type (12 items)

### OS&E (Operating Supplies & Equipment)
- Bedroom linens & soft goods (10 items)
- Bathroom supplies & linens (16 items)
- Kitchen — cookware & appliances — filtered by kitchen type (16 items)
- Kitchen — tableware & utensils — filtered by kitchen type (22 items)
- General room supplies (18 items)

Items tagged **Full** only appear when kitchen type is set to Full kitchen. Items tagged **Kitchenette** appear for both kitchenette and full kitchen units.

---

## Row-level controls

Each item row has the following controls:

| Control | Function |
|---|---|
| Checkbox | Mark item as inspected / present |
| Qty | Enter current quantity on hand |
| On hand | Displays the entered qty as a read-only reference |
| N/A | Mark item as not applicable — excludes it from progress count |
| Notes (📋) | Toggle a text area below the row for item-specific notes |
| Reset (↺) | Clear the checkbox, qty, N/A state, and notes for that item only |

The **Reset** button in the unit panel clears the unit selection, room type confirmation, and unit notes — but does not affect checklist item entries.

---

## Customizing

### Changing the destination sheet

Update the three constants at the top of `script.js`:

```js
const SHEET_ID   = 'your-sheet-id-here';
const SHEET_TAB  = 'FFE_OSE_Reports';
const SHEET_NAME = 'Your Sheet Name Here';
```

Also update the `href` on the `<a>` tag in the `.sheet-dest` banner in `index.html`.

### Adding or editing units

Edit the `UNITS` array in `script.js`. Each entry takes the form:

```js
{ num: '4901', type: '1BD K' }
```

### Adding checklist items

Items live in the `DATA` object in `script.js` under either `DATA.ffe` or `DATA.ose`. Each section has an `items` array:

```js
{ id: 'unique-id', text: 'Item description', tags: [] }
```

Use `tags: ['full']` to show the item only for full kitchens, `tags: ['kitchenette']` for kitchenette units, or `tags: []` to always show it.

### Branding

All Kasa brand colors are defined as CSS variables in `style.css` under `:root`. Fonts (DM Serif Text and DM Sans) load from Google Fonts and can be swapped by updating the `@import` URL and the `--font-serif` / `--font-sans` variables.

---

## Browser support

| Browser | Support |
|---|---|
| Chrome 90+ | ✓ Full |
| Firefox 88+ | ✓ Full |
| Safari 14+ | ✓ Full |
| Edge 90+ | ✓ Full |
| IE 11 | ✗ Not supported |

---

## Kasa brand references

- **Midnight Blue** `#112438` — header, primary text
- **Comfort Blue** `#195C8C` — interactive elements, active states
- **Washed Blue** `#5F738B` — labels, secondary text
- **Light Cream** `#FAF9F6` — page background
- **Fonts** — DM Serif Text (display), DM Sans (UI) — free substitutes for Tiempos Headline and TT Norms Pro

---

## Support

For questions about the checklist content, contact the Kasa Operations team.
For technical issues with the app or Google Sheets integration, contact the Kasa Tech team or open an issue in the project repository.
