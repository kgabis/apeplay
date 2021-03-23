#!/bin/bash

emcc -o ape.js -O3 -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -I libape emsc_ape.c ape.c