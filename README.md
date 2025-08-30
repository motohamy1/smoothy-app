# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Video transcoding and FFmpeg usage

If you see this in Git Bash (MINGW64):

    bash: ffmpeg: command not found

…it means Git Bash cannot find your Windows FFmpeg binary on its PATH. Even if FFmpeg works in PowerShell or CMD, Git Bash uses its own PATH and needs the POSIX path.

Ways to fix it:

- Quick one‑off in Git Bash:
  - Run FFmpeg with its POSIX path directly: `/c/ffmpeg/bin/ffmpeg.exe -version`
- Permanently add to Git Bash PATH:
  - Append to `~/.bashrc`:
    
        echo 'export PATH="/c/ffmpeg/bin:$PATH"' >> ~/.bashrc
        source ~/.bashrc

- Or use PowerShell/CMD instead of Git Bash:
  - PowerShell example:
    
        & "C:\ffmpeg\bin\ffmpeg.exe" -version

For consistent, cross‑platform video processing without relying on the local FFmpeg installation, this repo includes a Node script that uses ffmpeg-static + fluent-ffmpeg.

### Built-in transcoding script

The script reproduces:

    ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4

Steps:

1) Install deps (once):

    npm install

2) Place your source video at:

    public/videos/input.mp4

3) Run the transcoder:

    npm run transcode:hero

This will create:

    public/videos/output.mp4

You can also supply custom paths:

    node scripts/transcode.js public/videos/input.mp4 public/videos/my-output.mp4

Notes:
- The script bundles its own FFmpeg via ffmpeg-static, so it works even if `ffmpeg` isn’t on PATH.
- Windows and POSIX path styles are both accepted; Node will resolve them.
- Verify success by checking the console logs and the output file size and playback.
