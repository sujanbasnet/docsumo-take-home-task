## Task list

### 1. Right Sidebar
- [x] Fields from `section.json`
- [x] Each data should display title and value
- [x] Badge on the left based on the field title's initial letters with a random background
- [x] Checkbox feature to select the fields for the confirm action
- [x] More menu icon will have a remove option where the field can be removed ( no api calls required just to manage at the store/state level)
- [x] ?? The section.json is a dynamic list so when a new field is added to the list the component should be created in such a way that it can render it dynamically. /State is set to handle this, but no implementation to add a section/

### 2. Document Previewer
- [x] Create an image/document previewer to display field highlights.
- [x] Ensure the image fits the screen on initial page load.
- [x] Implement zoom in/out options with internal scroll (fit, 75%, 100%) from a dropdown field above the document viewer. (Button for zoom implemented, as found in the attached screenshot in the document)

### 3. Field Highlighting
- [x] On checkbox selection or hovering over a section field, highlight specific areas in the document with random or a single color.
- [ ] When the cursor is positioned near the areas in the document where fields are present, both the field in the document and the field in the sidebar should be highlighted for better interaction.
    - [x] Hovering over the field should highlight it in the sidebar and document.
    - [x] Incomplete. At this stage or repo, there's a bug where the highlight does not work when document is zoomed.

### 4. Review Actions
- [x] The bottom of the review section has confirm and select all buttons.
- [x] Add a 'Select All' button for users to select all fields in one click.
- [x] Enable the confirm button at the bottom of the sidebar when more than one field is selected.
- [x] Upon clicking confirm, display a confirmation popup.
- [x] On confirmation, show an approved modal with a relevant message.
- [x] On cancel, just close the modal.

### 5. Non functioan requirements (optional)
- [x] Toggle for dark and light modes
- [ ] Keyboard shortcuts
- [x] Typescript support
- [x] Lighthouse report attached added in Readme


## Running locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
