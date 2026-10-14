# Installing Node.js (Windows, macOS, Linux)

- **Topic:** NodeJs

- **Instructor: RAHUL KP**

### Table of Contents

1. [Windows Installation](https://www.google.com/search?q=%23windows-installation)

- [Method A: Web Installer (GUI)](https://www.google.com/search?q=%23method-a-web-installer-gui-windows)
- [Method B: Terminal (winget / Chocolatey)](https://www.google.com/search?q=%23method-b-terminal-windows)

2. [macOS Installation](https://www.google.com/search?q=%23macos-installation)

- [Method A: Web Installer (GUI)](https://www.google.com/search?q=%23method-a-web-installer-gui-macos)
- [Method B: Terminal (Homebrew)](https://www.google.com/search?q=%23method-b-terminal-macos)

3. [Linux Installation](https://www.google.com/search?q=%23linux-installation)

- [Method A: Web / Direct Binary Download](https://www.google.com/search?q=%23method-a-web--direct-binary-download-linux)
- [Method B: Terminal (Package Manager / NVM)](https://www.google.com/search?q=%23method-b-terminal-linux)

4. [Verifying Installation](https://www.google.com/search?q=%23verifying-installation)

---

## Windows Installation

### Method A: Web Installer (GUI) - Windows

1. Visit the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** installer (`.msi` file) for Windows.
3. Double-click the downloaded `.msi` file to launch the installation wizard.
4. Accept the license agreement and click **Next**.
5. Choose the default installation path or specify your own, then click **Next**.
6. On the **Custom Setup** screen, ensure **npm package manager** and **Add to PATH** are selected. Click **Next**.
7. _(Optional)_ Check the box to install automatically the necessary tools (Python and C++ Build Tools) if you plan to compile native C/C++ modules.
8. Click **Install**. Once finished, click **Finish**.

### Method B: Terminal - Windows

#### Option 1: Using Windows Package Manager (`winget`)

Open **Command Prompt** or **PowerShell** as Administrator and run:

```bash
winget install OpenJS.NodeJS.LTS

```

#### Option 2: Using Chocolatey

Open **Command Prompt** or **PowerShell** as Administrator and run:

```bash
choco install nodejs-lts

```

---

## macOS Installation

### Method A: Web Installer (GUI) - macOS

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS** package (`.pkg` file) for macOS.
3. Double-click the downloaded `.pkg` file to start the installer.
4. Follow the step-by-step instructions: accept the software license and choose your disk installation target.
5. Click **Install** and enter your administrator password when prompted.
6. Click **Close** when the wizard confirms successful installation.

### Method B: Terminal - macOS

#### Option 1: Using Homebrew (Recommended)

Open **Terminal** and run:

```bash
# Update Homebrew formulae
brew update

# Install Node.js LTS
brew install node

```

#### Option 2: Using Node Version Manager (NVM)

Open **Terminal** and execute:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload terminal profile
source ~/.zshrc   # or ~/.bash_profile depending on your shell

# Install latest LTS Node.js
nvm install --lts

# Set default Node version
nvm use --lts

```

---

## Linux Installation

### Method A: Web / Direct Binary Download - Linux

1. Go to [https://nodejs.org/en/download](https://www.google.com/search?q=https://nodejs.org/en/download) and download the **Linux Binaries (.tar.xz)** for your architecture (x64, ARMv7, ARM64).
2. Extract the archive into a global directory (e.g., `/usr/local/lib/nodejs`):

```bash
sudo mkdir -p /usr/local/lib/nodejs
sudo tar -xJvf node-v*-linux-x64.tar.xz -C /usr/local/lib/nodejs

```

3. Open your profile file (`~/.profile` or `~/.bashrc`) and append the environment variables:

```bash
export PATH=/usr/local/lib/nodejs/node-v*-linux-x64/bin:$PATH

```

4. Refresh your environment:

```bash
source ~/.profile

```

### Method B: Terminal - Linux

#### Option 1: Ubuntu / Debian (Using NodeSource Repository)

```bash
# Download and setup NodeSource repository for latest LTS (e.g., Node.js v20.x)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Install Node.js and npm
sudo apt-get install -y nodejs

```

#### Option 2: Fedora / RHEL / CentOS

```bash
# Add NodeSource LTS repository
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -

# Install Node.js
sudo dnf install -y nodejs

```

#### Option 3: Arch Linux

```bash
sudo pacman -S nodejs npm

```

#### Option 4: Using NVM (Recommended for Linux)

```bash
# Install NVM script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install Node.js LTS
nvm install --lts

```

---

## Verifying Installation

After finishing the installation through any of the above methods, open your terminal (**Command Prompt** / **PowerShell** on Windows, or **Terminal** on macOS / Linux) and run the following commands:

1. Verify Node.js:

```bash
node -v

```

_(Expected output: `v20.x.x` or similar version number)_ 2. Verify NPM (Node Package Manager):

```bash
npm -v

```

## _(Expected output: `10.x.x` or similar version number)_
