---
title: Installation
description: Install the KDC CLI on macOS, Linux, and Windows.
eyebrow: Guide
order: 1
---

Install KDC using your favorite package manager or binary download.

## macOS With Homebrew

```bash
brew install KDM-cli/tap/kdc
```

## macOS Manual Install

Apple Silicon:

```bash
curl -LO https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc-v0.1.0-aarch64-apple-darwin.tar.gz
tar -xzf kdc-v0.1.0-aarch64-apple-darwin.tar.gz
sudo mv kdc /usr/local/bin/
```

Intel Mac:

```bash
curl -LO https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc-v0.1.0-x86_64-apple-darwin.tar.gz
tar -xzf kdc-v0.1.0-x86_64-apple-darwin.tar.gz
sudo mv kdc /usr/local/bin/
```

## Linux Debian / Ubuntu

amd64:

```bash
curl -LO https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc_v0.1.0_amd64.deb
sudo dpkg -i kdc_v0.1.0_amd64.deb
```

arm64:

```bash
curl -LO https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc_v0.1.0_arm64.deb
sudo dpkg -i kdc_v0.1.0_arm64.deb
```

## Linux Fedora / RHEL / openSUSE

x86_64:

```bash
sudo rpm -i https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc-v0.1.0-1.x86_64.rpm
```

aarch64:

```bash
sudo rpm -i https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc-v0.1.0-1.aarch64.rpm
```

## Linux Tarball

x86_64:

```bash
curl -LO https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc-v0.1.0-x86_64-unknown-linux-gnu.tar.gz
tar -xzf kdc-v0.1.0-x86_64-unknown-linux-gnu.tar.gz
sudo mv kdc /usr/local/bin/
```

aarch64:

```bash
curl -LO https://github.com/KDM-cli/kdc-cli/releases/latest/download/kdc-v0.1.0-aarch64-unknown-linux-gnu.tar.gz
tar -xzf kdc-v0.1.0-aarch64-unknown-linux-gnu.tar.gz
sudo mv kdc /usr/local/bin/
```

## Windows

Download the release zip:

```text
kdc-v0.1.0-x86_64-pc-windows-msvc.zip
```

Extract `kdc.exe` and place it somewhere on your `PATH`.

## Verify The Download

Every release includes a `sha256sums.txt` file.

```bash
curl -LO https://github.com/KDM-cli/kdc-cli/releases/latest/download/sha256sums.txt
sha256sum --check --ignore-missing sha256sums.txt
```

## Build From Source

Requires the stable Rust toolchain.

```bash
git clone https://github.com/KDM-cli/kdc-cli.git
cd kdc-cli
cargo build --release
sudo mv target/release/kdc /usr/local/bin/
```
