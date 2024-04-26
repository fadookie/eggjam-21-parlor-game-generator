#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail

DATE=$(date '+%Y%m%d')
GIT_SHORT_HASH=$(git rev-parse --short HEAD)
OUT_DIR="./dist"
mkdir -p "$OUT_DIR"
zip -r "$OUT_DIR/eggjam-21-parlor-game-generator_${DATE}_${GIT_SHORT_HASH}.zip" . -x ./node_modules/**\* -x ./.git/**\* -x ./dist/**\*
