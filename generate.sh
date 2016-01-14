#!/bin/sh

sudo npm install markdown-to-slides -g

markdown-to-slides PATRON_CONCEPTION.md -o patron-conception.html
markdown-to-slides MEDITATION.md -o meditation.html
