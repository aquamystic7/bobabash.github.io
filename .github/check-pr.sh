#!/usr/bin/env bash
# Checks a pull request without running anything from it: only file names, sizes and types are read.
# Writes problems to $OUT/fail (break the rules) and $OUT/review (fine, but a person should look).
set -uo pipefail
OUT="${OUT:-/tmp/pr}"; mkdir -p "$OUT"; : > "$OUT/fail"; : > "$OUT/review"; : > "$OUT/folder"
fail() { echo "- $*" >> "$OUT/fail"; }
review() { echo "- $*" >> "$OUT/review"; }

[ -n "${LOCAL_TEST:-}" ] || git fetch -q origin "+refs/pull/$PR/head:pr"
files=$(git diff --name-only --no-renames "$BASE...pr")
[ -n "$files" ] || fail "This pull request doesn't change any files."

outside=$(echo "$files" | grep -Ev '^sites/[0-9]{2,}/' || true)
[ -z "$outside" ] || fail "Only files inside your card folder can change (like \`sites/07/\`). These are outside it: $(echo "$outside" | head -5 | sed 's/^/`/;s/$/`/' | paste -sd, -)"

folders=$(echo "$files" | grep -E '^sites/[0-9]{2,}/' | cut -d/ -f2 | sort -u)
n=$(echo "$folders" | grep -c . || true)
[ "$n" -le 1 ] || fail "One card folder per pull request. This one touches: $(echo $folders)"
folder=$(echo "$folders" | head -1)
if [ -n "$folder" ]; then
  echo "$folder" > "$OUT/folder"
  git cat-file -e "$BASE:sites/$folder/index.html" 2>/dev/null || fail "\`sites/$folder/\` isn't a card folder. Card grn07's folder is \`sites/07/\`."
fi

ok='\.(html?|css|m?js|json|map|txt|md|svg|png|jpe?g|gif|webp|avif|ico|bmp|mp3|m4a|ogg|wav|mp4|webm|woff2?|ttf|otf|glb|gltf|wasm|csv|xml|pdf)$'
while IFS= read -r f; do
  [ -n "$f" ] || continue
  entry=$(git ls-tree pr -- "$f")
  [ -n "$entry" ] || continue                       # a deleted file is fine
  [ "$(echo "$entry" | awk '{print $1}')" != 120000 ] || fail "No symlinks: \`$f\`"
  size=$(git cat-file -s "pr:$f")
  [ "$size" -le 5242880 ] || fail "\`$f\` is over 5 MB"
  echo "$f" | grep -Eiq "$ok" || review "\`$f\`: not a usual website file type"
done <<< "$files"
exit 0
