import asyncio
from pathlib import Path
from dotenv import load_dotenv

# Load .env from the slack-bot/ directory (parent of bot/)
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from bot.app import main

asyncio.run(main())
