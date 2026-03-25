import ssl
import certifi

# Fix SSL on macOS: patch aiohttp.ClientSession so every session gets a
# TCPConnector backed by certifi certs. Must run before any other imports.
import aiohttp
_ssl_ctx = ssl.create_default_context(cafile=certifi.where())
_orig_session_init = aiohttp.ClientSession.__init__

def _patched_session_init(self, *args, **kwargs):
    if kwargs.get("connector") is None and "connector" not in kwargs:
        kwargs["connector"] = aiohttp.TCPConnector(ssl=_ssl_ctx)
    _orig_session_init(self, *args, **kwargs)

aiohttp.ClientSession.__init__ = _patched_session_init

import asyncio
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from bot.app import main

asyncio.run(main())
