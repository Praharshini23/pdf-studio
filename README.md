# pdf-studio
PDF Studio is an offline, browser-based PDF editing application that allows users to manage and modify PDF documents without uploading files to external servers. It supports merging, splitting, reordering, rotating, annotating, signing, redacting, converting, compressing, and editing PDF files while maintaining document privacy.

# PDF Studio

## Run it

Double-click **Start PDF Studio.bat**. It opens in your browser. K close it to stop PDF Studio.

The launcher needs Node.js available as `node` in PATH. No package installation or internet connection is needed. The included PDF libraries run in the browser; your selected files are read locally in memory and are never sent to a network service. The small local server only serves the app files on this computer.

Do not open `index.html` directly. The PDF.js worker needs the app to be opened from the local link that the launcher provides.

## Tools

- Organise: merge, split, reorder, rotate, delete, duplicate, extract, insert a blank page, and crop.
- Edit: add text or image, highlight, draw, outline a shape, whiteout, permanently redact, add a typed signature, and fill existing form fields.
- Stamp: watermark, page numbers, header/footer text, and date.
- Convert: images to PDF, selected PDF page to PNG, and PDF text extraction.
- Finish: compress/rewrite, edit/remove metadata, and compare rendered pages.

Redaction rasterizes the selected page with the covered area burned into the pixels, so its original text cannot be selected or searched. Keep the original file and inspect the saved copy in a separate reader.

The browser app supports files up to 80 MB. Split, extract, and reorder create a new page sequence. Password locking and OCR are optional additions from the project brief and are not included yet.
