# Traffic UI

A React application built with Vite.
### Note:
Make sure you run this after traffic-backend as the backend contains init scripts for database setup
## Prerequisites

Make sure **Docker** is installed and running on your machine.

You can download Docker Desktop here:

[Docker Desktop](https://www.docker.com/products/docker-desktop/?utm_source=chatgpt.com)

You can verify the installation with:

```bash
docker --version
docker compose version
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/burningpriest/traffic-ui.git
cd traffic-ui
```

Make sure Docker Desktop is running before continuing.

### macOS / Linux

Run:

```bash
chmod +x start.sh
./start.sh
```

### Windows

On Windows, `start.sh` needs to be run from a Bash environment.

The easiest option is **Git Bash**.

1. Install Git for Windows if you don't already have it.
2. Start Docker Desktop.
3. Open Git Bash.
4. Navigate to the project directory.
5. Run:

```bash
./start.sh
```

If needed, you can also run:

```bash
bash start.sh
```

WSL can also be used instead of Git Bash.

## Application

Once the script has finished starting the services, open the application using the URL shown in the terminal.
will be http://localhost:3000, you can also get it from the terminal once the " Traffic Frontend Started" shows up

## Stopping the Application

To stop the Docker services:

```bash
docker compose down
```

## Troubleshooting

### Docker is not running

If you see an error similar to:

```text
Cannot connect to the Docker daemon
```

make sure Docker Desktop is running and try again.

### Permission denied

On macOS or Linux, run:

```bash
chmod +x start.sh
```

and then:

```bash
./start.sh
```

### Windows

`start.sh` cannot be run directly from Command Prompt. Use **Git Bash** or **WSL** instead.
