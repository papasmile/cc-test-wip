# Campground Commander Public API Test suite

## Overview

This package includes a complete test suite for public API endpoints for Campground Commander.
Main contents are:

```
/framework base framework code
/test individual tests and related test data
```

## To Run

To run, simply:

```
npm i
npm test
```

## Output

Reports are generated in HTML format under /report for each endpoint tested.

## Local Setup

An open connection to your target database is required to perform test data management.
That typically requires opening GCP networks to your IP address.

To run, use:

```
npm run test-Local
```
