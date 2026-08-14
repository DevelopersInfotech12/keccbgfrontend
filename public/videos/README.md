# Hero background video

The hero looks for your file at these paths, in order, and uses the first
one that loads:

```
/cbghero.mp4          →  public/cbghero.mp4
/videos/cbghero.mp4   →  public/videos/cbghero.mp4
/video/cbghero.mp4    →  public/video/cbghero.mp4
```

So `public/cbghero.mp4` works as-is — nothing to configure.

Renaming the file? Edit the list in `src/lib/site.js`:

```js
export const HERO_VIDEO_CANDIDATES = ["/cbghero.mp4", "/videos/cbghero.mp4"];
```

## If it still doesn't play

1. Open devtools → Network, reload, filter for `cbghero`. A 404 means the
   path is wrong; a 200 means it's a playback problem.
2. Check the codec. Safari and Chrome need **H.264 in an MP4 container**.
   HEVC, ProRes, or an MP4 that's really AV1 will 200 and then stay black.
   Re-encode with the command below.
3. Restart `npm run dev`. Next serves `public/` at boot — a file added while
   the server is running sometimes isn't picked up.

## Encoding that keeps the hero fast

Background video is the heaviest thing on the page. Aim for **under 4 MB**:

```bash
ffmpeg -i cbghero.mp4 \
  -vf "scale=1920:-2,fps=25" \
  -c:v libx264 -profile:v high -crf 26 -preset slow \
  -movflags +faststart -pix_fmt yuv420p -an \
  public/cbghero.mp4
```

- `-an` strips audio — the hero is muted anyway, so audio is dead weight.
- `-movflags +faststart` lets playback begin before the file finishes downloading.
- `-pix_fmt yuv420p` is what fixes "plays in VLC, black in Safari".
- 8–12 seconds on a seamless loop reads better than a long clip.

## Poster frame

`public/images/hero-poster.jpg` is a placeholder gradient. Replace it with a
real frame so the handoff from poster to video is invisible:

```bash
ffmpeg -i public/cbghero.mp4 -vframes 1 -q:v 3 public/images/hero-poster.jpg
```

## Fallback

If every candidate path fails, the hero renders the green→pink wash plus the
poster and hides the pause button, so the page never looks broken.
