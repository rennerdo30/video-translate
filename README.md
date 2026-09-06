# Subtide

<p align="center">
  <img src="extension/icons/icon128.png" width="128" height="128" alt="Subtide Logo">
</p>

<p align="center">
  <b>AI-powered video subtitle translation for YouTube, Twitch, and any video site.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.1.2-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/python-3.9+-yellow.svg" alt="Python">
  <img src="https://img.shields.io/badge/chrome-MV3-blue.svg" alt="Chrome Extension">
  <img src="https://img.shields.io/badge/tests-262%20passing-brightgreen.svg" alt="Tests">
</p>

<p align="center">
  <a href="http://subtide.docs.renner.dev/">Documentation</a>
</p>

---

## Features

### Core Translation
- **Real-time Translation** — Translate video subtitles on the fly
- **AI Transcription** — Generate subtitles with Whisper when none exist
- **Streaming Mode** — See subtitles within seconds, not minutes (Tier 4)
- **13+ Languages** — Support for major world languages
- **Context-Aware** — Merges partial sentences for better translation quality
- **Smart Caching** — Translations cached for instant replay

### Platform Support
- **YouTube** — Full support including embedded players
- **YouTube Shorts** — Pre-translation mode for instant subtitles while swiping
- **Twitch** — Live stream translation support
- **Generic Sites** — Works on any site with `<video>` elements

### User Experience
- **Light & Dark Popup** — Teal-accented interface that follows your system colour scheme
- **Localized Interface** — Extension UI translated into 50+ languages
- **Draggable Subtitles** — Position subtitles anywhere on screen
- **Adjustable Size** — Small, Medium, Large, and XL subtitle options
- **Dual Subtitles** — Show original + translated text simultaneously
- **Keyboard Shortcuts** — Toggle subtitles (T), switch mode (D), download (S)
- **Subtitle Export** — Download as SRT, VTT, or TXT

### Technical
- **Flexible API** — Works with OpenAI, OpenRouter, or any OpenAI-compatible API
- **Local LLM Support** — Use LM Studio, Ollama, or other local models
- **Apple Silicon Optimized** — MLX Whisper backend for M1/M2/M3 Macs
- **GPU Acceleration** — CUDA support for NVIDIA GPUs

---

## Quick Start

### 1. Start the Backend

**Option A: Download Binary (Recommended)**

Download the latest backend binary from [Releases](https://github.com/rennerdo30/subtide/releases):
- `subtide-backend-linux`
- `subtide-backend-macos`
- `subtide-backend-windows.exe`

> **Prerequisite**: [FFmpeg](https://ffmpeg.org/download.html) must be installed.

```bash
# Make executable (Linux/macOS)
chmod +x subtide-backend-macos

# Run
./subtide-backend-macos
```

**Option B: Run from Source**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
./run.sh
```

**Option C: Docker**

```bash
cd backend
docker-compose up subtide-tier2
```

### 2. Install the Extension

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `extension` folder
4. Pin the extension to your toolbar

### 3. Configure

1. Click the extension icon
2. Select your operation mode (see [Operation Modes](#operation-modes))
3. Enter your API key and model (for Tier 1 & 2)
4. Choose your target language
5. Save configuration

### 4. Translate!

**YouTube Videos:**
1. Go to any YouTube video
2. Click the translate button in the player controls
3. Subtitles appear automatically

**YouTube Shorts:**
1. Navigate to any Shorts video
2. Click the floating translate button (bottom-right)
3. Enable translation — videos are pre-translated as you scroll
4. Subtitles appear instantly when swiping to the next Short

---

## Operation Modes

This project is fully open-source with no paid tiers. The "Tiers" refer to different technical configurations:

| Feature | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---------|--------|--------|--------|--------|
| YouTube Captions | ✅ | ✅ | ✅ | ✅ |
| Whisper Transcription | ❌ | ✅ | ✅ | ✅ |
| API Key Location | Browser | Browser | Server | Server |
| Force AI Generation | ❌ | ✅ | ✅ | ✅ |
| Progressive Streaming | ❌ | ❌ | ❌ | ✅ |

- **Tier 1 (Standard)** — Uses existing YouTube captions + your API key
- **Tier 2 (Enhanced)** — Whisper transcription + your API key
- **Tier 3 (Managed)** — Server handles API keys (for shared deployments)
- **Tier 4 (Stream)** — Progressive translation with instant subtitle display

---

## YouTube Shorts Mode

Shorts are consumed rapidly (swipe behavior), so on-demand translation is too slow. Shorts mode uses **pre-translation**:

1. **Detection** — Automatically detects all Shorts in your feed
2. **Pre-translation** — Translates 4+ videos ahead in the background
3. **Instant Display** — Cached subtitles appear immediately when you swipe

### Shorts Controls
- **Toggle Button** — Floating button (bottom-right) to enable/disable
- **Language Selection** — Quick language picker in dropdown
- **Size Adjustment** — S / M / L / XL subtitle sizes
- **Draggable Subtitles** — Drag to reposition, double-click to reset
- **Queue Status** — Shows translation progress in real-time

---

## Supported Languages

| Language | Code | Language | Code |
|----------|------|----------|------|
| 🇬🇧 English | `en` | 🇯🇵 Japanese | `ja` |
| 🇪🇸 Spanish | `es` | 🇰🇷 Korean | `ko` |
| 🇫🇷 French | `fr` | 🇨🇳 Chinese (Simplified) | `zh-CN` |
| 🇩🇪 German | `de` | 🇹🇼 Chinese (Traditional) | `zh-TW` |
| 🇵🇹 Portuguese | `pt` | 🇸🇦 Arabic | `ar` |
| 🇷🇺 Russian | `ru` | 🇮🇳 Hindi | `hi` |
| 🇮🇹 Italian | `it` | | |

---

## Docker Deployment

```bash
cd backend

# Tier 1: Standard (YouTube captions only)
docker-compose up subtide-tier1

# Tier 2: With Whisper transcription
docker-compose up subtide-tier2

# Tier 3/4: Managed with server-side API key
SERVER_API_KEY=sk-xxx docker-compose up subtide-tier3
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5001` |
| `GUNICORN_WORKERS` | Number of workers | `2` |
| `GUNICORN_TIMEOUT` | Request timeout (seconds) | `300` |
| `CORS_ORIGINS` | Allowed origins (`*` for all) | `*` |
| `SERVER_API_KEY` | API key for Tier 3/4 | — |
| `SERVER_API_URL` | LLM API endpoint | — |
| `SERVER_MODEL` | LLM model name | — |
| `WHISPER_MODEL` | Whisper model size | `base` |
| `WHISPER_BACKEND` | `mlx`, `faster`, or `openai` | auto-detected |

---

## Cloud Deployment (RunPod)

For GPU-accelerated transcription, deploy on [RunPod.io](https://runpod.io):

```bash
docker pull ghcr.io/rennerdo30/subtide-runpod:latest
```

Configure the extension with your RunPod endpoint:
- **Serverless**: `https://api.runpod.ai/v2/{ENDPOINT_ID}`
- **Dedicated**: `https://pod-id-5001.proxy.runpod.net`

See [backend/RUNPOD.md](backend/RUNPOD.md) for complete instructions.

---

## Local LLM Setup

Run translations completely locally using LM Studio or Ollama.

### LM Studio

1. Download [LM Studio](https://lmstudio.ai/)
2. Download a model (e.g., Llama 3.1 8B)
3. Start the local server (default: `http://localhost:1234/v1`)
4. Configure extension:
   - **Provider**: Custom Endpoint
   - **API URL**: `http://localhost:1234/v1`
   - **API Key**: `lm-studio`

### Ollama

1. Install [Ollama](https://ollama.ai/)
2. Pull a model: `ollama pull llama3.1:8b`
3. Configure extension:
   - **Provider**: Custom Endpoint
   - **API URL**: `http://localhost:11434/v1`
   - **API Key**: `ollama`

### Recommended Models

| Model | Size | Quality | Speed | Best For |
|-------|------|---------|-------|----------|
| `llama3.1:8b` | 4.7 GB | Good | Fast | Most users |
| `mistral:7b` | 4.1 GB | Good | Fast | General use |
| `qwen2.5:7b` | 4.4 GB | Excellent | Fast | Asian languages |
| `command-r:35b-q4` | 20 GB | Excellent | Medium | Multilingual |

---

## Hardware Requirements

### Apple Silicon (Unified Memory)

| Mac | Memory | Whisper | LLM | Notes |
|-----|--------|---------|-----|-------|
| M1/M2 (8GB) | 8 GB | tiny/base | ❌ | Not recommended |
| M1/M2 (16GB) | 16 GB | small | Llama 3.1 8B | Comfortable |
| M1/M2 Pro (32GB) | 32 GB | large-v3 | Llama 3.1 8B | Full quality |
| M1/M2 Max (64GB) | 64 GB | large-v3 | Llama 3.1 70B | Best local |

**Recommended**: `WHISPER_BACKEND=mlx` with `large-v3-turbo`

### NVIDIA GPUs

| GPU | VRAM | Whisper | LLM |
|-----|------|---------|-----|
| RTX 3060 | 12 GB | medium | Llama 3.1 8B |
| RTX 3090/4080 | 16-24 GB | large-v3 | Llama 3.1 8B |
| RTX 4090 | 24 GB | large-v3 | Llama 3.1 13B |

**Recommended**: `WHISPER_BACKEND=faster` with `large-v3`

---

## Architecture

```
subtide/
├── backend/                    # Python Flask server
│   ├── app.py                  # Entry point
│   ├── config.py               # Configuration
│   ├── routes/
│   │   └── translation.py      # API endpoints
│   ├── services/
│   │   ├── whisper_service.py  # Speech-to-text
│   │   ├── translation_service.py  # LLM translation
│   │   ├── youtube_service.py  # YouTube data extraction
│   │   └── process_service.py  # Pipeline orchestration
│   ├── utils/
│   │   ├── model_utils.py      # Model management
│   │   ├── partial_cache.py    # Translation caching
│   │   └── language_detection.py  # Language utilities
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── extension/                  # Chrome Extension (MV3)
│   ├── manifest.json
│   ├── _locales/               # i18n translations
│   ├── icons/                  # App icons
│   └── src/
│       ├── background/
│       │   └── service-worker.js   # Background tasks, Shorts queue
│       ├── content/
│       │   ├── youtube.js          # YouTube integration
│       │   ├── youtube-shorts.js   # Shorts pre-translation
│       │   ├── youtube-subtitles.js # Subtitle rendering
│       │   ├── youtube-ui.js       # UI controls
│       │   ├── youtube-styles.js   # CSS injection
│       │   ├── twitch.js           # Twitch integration
│       │   ├── generic.js          # Generic video support
│       │   └── shorts-interceptor.js # Shorts feed detection
│       ├── lib/
│       │   └── debug.js            # Logging utilities
│       ├── offscreen/              # Audio capture
│       └── popup/                  # Extension popup
│           ├── popup.html
│           ├── popup.css           # Design tokens, light + dark theme
│           └── popup.js
│
├── SPECIFICATION.md            # Detailed technical spec
├── CONTRIBUTING.md             # Contribution guide
└── LICENSE                     # MIT License
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Toggle subtitles on/off |
| `D` | Toggle dual subtitle mode |
| `S` | Download subtitles |

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check with feature flags |
| `/ping` | GET | Load balancer health check |
| `/api/version` | GET | Version and build info |
| `/api/subtitles` | GET | Fetch YouTube subtitles |
| `/api/translate` | POST | Translate subtitles (batch) |
| `/api/process` | POST | Full pipeline (fetch + translate) |
| `/api/transcribe` | GET | Whisper transcription |
| `/api/model-info` | GET | Model configuration (Tier 3) |

---

## Troubleshooting

### Backend Connection Issues

**"Cannot connect to backend" / "Network Error"**
- Verify the backend is running: `curl http://localhost:5001/health`
- Check if another application is using port 5001
- Ensure your firewall allows connections on port 5001
- For Docker: verify the container is running with `docker ps`

**CORS Errors in Browser Console**
- Set `CORS_ORIGINS=*` in your environment or `.env` file
- Restart the backend after changing CORS settings

### FFmpeg Issues

**"FFmpeg not found" / Audio extraction fails**
- Install FFmpeg:
  - macOS: `brew install ffmpeg`
  - Ubuntu/Debian: `sudo apt install ffmpeg`
  - Windows: `choco install ffmpeg` or download from [ffmpeg.org](https://ffmpeg.org/download.html)
- Verify installation: `ffmpeg -version`
- Ensure FFmpeg is in your system PATH

### Whisper / Transcription Issues

**Out of memory errors**
- Use a smaller model: `WHISPER_MODEL=base` or `WHISPER_MODEL=tiny`
- Model memory requirements:
  - `tiny`: ~1 GB
  - `base`: ~1 GB
  - `small`: ~2 GB
  - `medium`: ~5 GB
  - `large-v3`: ~10 GB

**Slow transcription**
- On Apple Silicon: ensure `WHISPER_BACKEND=mlx` is set
- On NVIDIA GPU: ensure `WHISPER_BACKEND=faster` and CUDA is installed
- Consider using `large-v3-turbo` for faster processing with similar quality

**"No module named 'mlx'" (Apple Silicon)**
- MLX only works on Apple Silicon Macs
- Install with: `pip install mlx-whisper`

### Extension Issues

**Extension not loading**
- Ensure Developer mode is enabled in `chrome://extensions`
- Check for errors in the extension card
- Try removing and re-adding the extension

**Subtitles not appearing**
- Click the translate button in the player controls
- Check the extension popup for error messages
- Verify the backend URL is correct in settings
- Check browser console (F12) for errors

**YouTube controls not showing translate button**
- Refresh the page
- Disable other extensions that modify YouTube's interface
- Clear browser cache and reload

### Docker Issues

**Container exits immediately**
- Check logs: `docker logs <container_id>`
- Verify port mapping: `-p 5001:5001`
- Ensure sufficient memory is allocated to Docker

**"Permission denied" errors**
- On Linux, you may need to run with `sudo` or add your user to the docker group

### API Key Issues

**"Invalid API key" / 401 errors**
- Verify your API key is correct and has not expired
- Check that you're using the correct API URL for your provider
- For local LLMs (LM Studio, Ollama), use any non-empty string as the API key

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [OpenAI Whisper](https://github.com/openai/whisper) — Speech recognition
- [MLX Whisper](https://github.com/ml-explore/mlx-examples) — Apple Silicon optimization
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) — Video data extraction
- [Flask](https://flask.palletsprojects.com/) — Backend framework
