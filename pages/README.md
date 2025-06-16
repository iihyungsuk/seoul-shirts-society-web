# Pages Folder

This folder exists for Next.js compatibility purposes only.

## Purpose

- **Compatibility**: Ensures Next.js App Router continues to work properly
- **Backup**: Provides fallback routing support if needed
- **Convention**: Follows FSD + Next.js integration best practices

## FSD Structure

The actual page business logic is located in `/src/pages/` following Feature-Sliced Design principles.

## Usage

- Next.js routing: `/app/` folder at project root
- Business logic: `/src/pages/` following FSD methodology
- This folder: Compatibility stub only
