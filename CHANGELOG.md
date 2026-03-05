# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-10
### Added
- Initial release

## [1.0.1] - 2025-10-10
### Changed
- README.md with CDN links

## [1.0.2] - 2025-10-10
### Changed
- more JS examples in README.md 

## [1.0.3] - 2025-11-02
### Fixed
- Support comma-separated selectors with relative combinators (`>`, `~`, `+`)  

### Changed
- link to InDom GitHub Discussions in README.md Contribute section 

## [1.0.4] - 2026-03-05
### Added
- `getOffsetBox` method that returns a `DOMRect` with page-relative coordinates (viewport rect plus window scroll, root borders excluded).

### Changed
- Geometry methods (`getBox`, `getOuterBox`, `getRelativeBox`, `getOffsetBox`) now require the underlying element to be connected to the DOM, they throw Error otherwise.

